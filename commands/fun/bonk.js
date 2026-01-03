const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getBonkGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "bonk-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find bonk gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading bonk-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// cmd
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bonk")
    .setDescription("Bonk users")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const bonkGif = await getBonkGif();

    await interaction.reply(`-# *Bonking...*`);

    const bonkEmbed = new EmbedBuilder()
      .setDescription(`<@${interaction.user.id}> bonks ${user}`)
      .setImage(bonkGif)
      .setColor(embedColor);

    await interaction.editReply(`-# Bonked`);
    await interaction.editReply({
      embeds: [bonkEmbed],
    });
  },
};
