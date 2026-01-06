const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get slap gif
async function getSlapGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "slap-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find slap gif";
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

// get hug gif
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

module.exports = {
  name: "slap",

  async execute(message) {
    const user = message.mentions.users.first();
    const slapGif = await getSlapGif();
    const hugGif = await getHugGif();

    if (user) {
      const slapEmbed = new EmbedBuilder()
        .setDescription(`${message.author} slaps ${user}`)
        .setImage(slapGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [slapEmbed],
      });
    } else {
      const slapEmbed = new EmbedBuilder()
        .setDescription(
          `${message.author} why are you trying to slap yourself?`
        )
        .setImage(hugGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [slapEmbed],
      });
    }
  },
};
