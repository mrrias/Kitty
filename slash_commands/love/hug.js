const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getHugGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "hug-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find hug gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading hug-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// cmd
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("Spread love through the power of hugs")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(false)
    ),

  async execute(message) {
    const user = message.options.getUser("user");
    const hugGif = await getHugGif();

    if (user) {
      const hugEmbed = new EmbedBuilder()
        .setDescription(`<@${message.user.id}> hugs ${user}`)
        .setImage(hugGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [hugEmbed],
      });
    } else {
      const hugEmbed = new EmbedBuilder()
        .setDescription(`<@${message.user.id}> hugs themselves!`)
        .setImage(hugGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [hugEmbed],
      });
    }
  },
};
