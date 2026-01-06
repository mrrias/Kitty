const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getThumbsupGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "thumbsup-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find thumbsup gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading thumbsup-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// cmd
module.exports = {
  name: "thumbsup",

  async execute(message) {
    const thumbsupGif = await getThumbsupGif();
    const user = message.mentions.users.first();

    if (user) {
      const thumbsupEmbed = new EmbedBuilder()
        .setDescription(`${message.author} agrees with ${user}`)
        .setImage(thumbsupGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [thumbsupEmbed],
      });
    } else {
      const thumbsupEmbed = new EmbedBuilder()
        .setDescription(
          `${message.author} agrees with themeselves \n-# *how sad...*`
        )
        .setImage(thumbsupGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [thumbsupEmbed],
      });
    }
  },
};
