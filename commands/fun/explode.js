const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");
const { get } = require("mongoose");

// get gif
async function getExplodeGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "explode-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find explode gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading explode-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// cmd
module.exports = {
  data: new SlashCommandBuilder()
    .setName("explode")
    .setDescription("Explode a user!")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const explodeGif = await getExplodeGif();

    await interaction.reply(`-# *Exploding...*`);

    if (user) {
      const explodeEmbed = new EmbedBuilder()
        .setDescription(`<@${interaction.user.id}> explodes ${user}`)
        .setImage(explodeGif)
        .setColor(embedColor);

      await interaction.editReply(`-# Exploded`);
      await interaction.editReply({
        embeds: [explodeEmbed],
      });
    } else {
      const explodeEmbed = new EmbedBuilder()
        .setDescription(`<@${interaction.user.id}> explodes!`)
        .setImage(explodeGif)
        .setColor(embedColor);

      await interaction.editReply(`-# Exploded`);
      await interaction.editReply({
        embeds: [explodeEmbed],
      });
    }
  },
};
