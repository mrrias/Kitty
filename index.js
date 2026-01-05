// Core modules
const fs = require("node:fs");
const path = require("node:path");

// Discord.js
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
} = require("discord.js");

// Config
const { token } = require("./config.json");
const prefix = "-";

// Create client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// READY EVENT
client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ ${readyClient.user.tag} is online`);
});

// SLASH COMMANDS LOADER
client.commands = new Collection();
const slashFoldersPath = path.join(__dirname, "slash_commands");

if (fs.existsSync(slashFoldersPath)) {
  const slashCommandFolders = fs.readdirSync(slashFoldersPath);

  for (const folder of slashCommandFolders) {
    const commandsPath = path.join(slashFoldersPath, folder);

    // Check if it's a folder (like 'actions', 'fun', 'love')
    if (!fs.lstatSync(commandsPath).isDirectory()) continue;

    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      try {
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
        }
      } catch (error) {
        console.error(
          `❌ Error loading slash command at ${filePath}:`,
          error.message
        );
      }
    }
  }
}

// PREFIX COMMANDS LOADER
client.prefixCommands = new Collection();
const prefixFoldersPath = path.join(__dirname, "prefix_commands");

if (fs.existsSync(prefixFoldersPath)) {
  const prefixCommandFolders = fs.readdirSync(prefixFoldersPath);

  for (const folder of prefixCommandFolders) {
    const commandsPath = path.join(prefixFoldersPath, folder);

    if (!fs.lstatSync(commandsPath).isDirectory()) continue;

    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      try {
        const command = require(filePath);
        if ("name" in command && "execute" in command) {
          client.prefixCommands.set(command.name, command);
        }
      } catch (error) {
        console.error(
          `❌ Error loading prefix command at ${filePath}:`,
          error.message
        );
      }
    }
  }
}

// SLASH COMMAND HANDLER
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const replyOptions = {
      content: "There was an error while executing this command!",
      flags: MessageFlags.Ephemeral,
    };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(replyOptions);
    } else {
      await interaction.reply(replyOptions);
    }
  }
});

// PREFIX COMMAND HANDLER
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.prefixCommands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.");
  }
});

client.login(token);
