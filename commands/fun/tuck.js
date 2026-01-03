const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getTuckGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "tuck-gif.txt");

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
    console.error("Error reading tuck-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// cmd
module.exports = {
  data: new SlashCommandBuilder()
    .setName("tuck")
    .setDescription("Tuck in a user for sleeps")
    .addUserOption((option) => option.setName("user").setDescription("user")),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const tuckGif = await getTuckGif();

    await interaction.reply("-# *Tucking*");

    if (user) {
      const tuckEmbed = new EmbedBuilder()
        .setDescription(
          `<@${interaction.user.id}> tucks ${user} into bed... sleep well`
        )
        .setImage(tuckGif)
        .setColor(embedColor);

      await interaction.editReply(`-# Night night`);
      await interaction.editReply({
        embeds: [tuckEmbed],
      });
    } else {
      const tuckEmbed = new EmbedBuilder()
        .setDescription(`<@${interaction.user.id}> tucks themselves into bed`)
        .setImage(tuckGif)
        .setColor(embedColor);

      await interaction.editReply(`-# Goodnight`);
      await interaction.editReply({
        embeds: [tuckEmbed],
      });
    }
  },
};
