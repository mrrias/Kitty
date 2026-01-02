console.log("DEPLOY SCRIPT STARTED");

const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const foldersPath = path.join(__dirname, "commands");

if (!fs.existsSync(foldersPath)) {
  throw new Error("commands folder not found");
}

const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (!command.data || !command.execute) {
      console.warn(`Skipping invalid command file: ${filePath}`);
      continue;
    }

    commands.push(command.data.toJSON());
    console.log(`Loaded command: ${command.data.name}`);
  }
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log(`Deploying ${commands.length} commands...`);

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(`✅ Successfully deployed ${data.length} commands.`);
  } catch (error) {
    console.error("❌ Deploy failed:");
    console.error(error);
  }
})();
