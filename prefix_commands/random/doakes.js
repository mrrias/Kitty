const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getDoakesGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "doakes-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find Doakes gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading doakes-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

//cmd
module.exports = {
  name: "doakes",

  async execute(message) {
    const doakesGif = await getDoakesGif();
    let user = message.mentions.users.first();

    if (!user) {
      const doaksEmbed = new EmbedBuilder()
        .setTitle("You must provide a mention or a valid user ID.")
        .addFields({ name: "Required:", value: "-doakes {@user}" })
        .setTimestamp()
        .setColor(embedColor);

      await message.reply({
        embeds: [doaksEmbed],
      });
    } else {
      const doaksEmbed = new EmbedBuilder()
        .setTitle("I'm watching you!")
        .setDescription(`I am always watching ${user}`)
        .setImage(doakesGif)
        .setTimestamp()
        .setColor(embedColor);

      await message.reply({
        embeds: [doaksEmbed],
      });
    }
  },
};
