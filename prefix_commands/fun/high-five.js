const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get high fiv gif
async function getHighFiveGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "high-five-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find high-five gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading high-five-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// get hmpf gif
async function getTsundereGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "tsundere-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find tsundere-five gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading tsundere-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

module.exports = {
  name: "highfive",

  async execute(message) {
    const user = message.mentions.users.first();
    const highfiveGif = await getHighFiveGif();
    const tsundereGif = await getTsundereGif();

    if (user) {
      const highfiveEmbed = new EmbedBuilder()
        .setDescription(`${message.author} high fives ${user}`)
        .setImage(highfiveGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [highfiveEmbed],
      });
    } else {
      const tsundereEmbed = new EmbedBuilder()
        .setDescription(
          `${message.author} you can't high five yourself *silly*`
        )
        .setImage(tsundereGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [tsundereEmbed],
      });
    }
  },
};
