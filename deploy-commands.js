const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

console.log("DEPLOY SCRIPT STARTED");

const commands = [];
const foldersPath = path.join(__dirname, "slash_commands");

if (!fs.existsSync(foldersPath)) {
  console.error("❌ Error: slash_commands folder not found");
  process.exit(1);
}

const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);

  if (!fs.lstatSync(commandsPath).isDirectory()) continue;

  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);

    try {
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
        console.log(`Loaded slash command: ${command.data.name}`);
      }
    } catch (err) {
      // This will catch the 'bean.js' error but allow the script to finish
      console.error(`❌ Failed to require ${filePath}:`, err.message);
    }
  }
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log(`🚀 Deploying ${commands.length} slash commands...`);

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(`✅ Successfully deployed ${data.length} slash commands.`);
  } catch (error) {
    console.error("❌ Deploy failed:");
    console.error(error);
  }
})();
