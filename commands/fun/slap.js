const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getSlapGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "slap-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find tuck gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading slap-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Slap a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const slapGif = await getSlapGif();

    await interaction.reply(`-# *Loading...*`);

    const slapEmbed = new EmbedBuilder()
      .setDescription(`<@${interaction.user.id}> slaps ${user}`)
      .setImage(slapGif)
      .setColor(embedColor);

    await interaction.editReply(`-# Loaded!`);
    await interaction.editReply({
      embeds: [slapEmbed],
    });
  },
};
