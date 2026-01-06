const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
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
  name: "tuck",

  async execute(message) {
    const tuckGif = await getTuckGif();
    let user = message.mentions.users.first();

    if (user) {
      const tuckEmbed = new EmbedBuilder()
        .setDescription(`${message.author} tucks ${user} into bed`)
        .setImage(tuckGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [tuckEmbed],
      });
    } else {
      const tuckEmbed = new EmbedBuilder()
        .setDescription(`${message.author} tucks themselves into bed`)
        .setImage(tuckGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [tuckEmbed],
      });
    }
  },
};
