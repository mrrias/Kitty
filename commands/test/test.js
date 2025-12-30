const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');


// Get gif
async function getRandomGif() {
    try {
        // Find the file in the same directory as this script
        const filePath = path.join(__dirname, 'test-gif.txt');
        
        const data = await fs.readFile(filePath, 'utf-8');

        // Split into array and remove empty lines/whitespace
        const lines = data.split(/\r?\n/).filter(line => line.trim() !== "");

        if (lines.length === 0) {
            return "The GIF list is empty!";
        }

        // Pick and return a random line
        const randomValue = lines[Math.floor(Math.random() * lines.length)];
        return randomValue;

    } catch (err) {
        // Log the actual error to your terminal so you can debug pathing issues
        console.error("Error reading test-gif.txt:", err.message);
        return "Failed to load a random GIF. Check if the file exists.";
    }
}

// cmd
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Replies with a random GIF from a text file'),

    async execute(interaction) {
        // 1. Acknowledge the command immediately to prevent the 3-second timeout
        await interaction.deferReply();

        // 2. Perform the file reading logic
        const randomGif = await getRandomGif();

        // 3. Send the final string as the reply
        await interaction.editReply(randomGif);
    }
};
