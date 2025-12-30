const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');


// Get gif
async function getBoopgif() {
    try {
        // Find the file in the same directory as this script
        const filePath = path.join(__dirname, 'boop-gif.txt');
        
        const data = await fs.readFile(filePath, 'utf-8');

        // Split into array and remove empty lines/whitespace
        const lines = data.split(/\r?\n/).filter(line => line.trim() !== "");

        if (lines.length === 0) {
            return "Couldn't find boop gif";
        }

        // Pick and return a random line
        const randomValue = lines[Math.floor(Math.random() * lines.length)];
        return randomValue;

    } catch (err) {
        // Log the actual error to your terminal so you can debug pathing issues
        console.error("Error reading boop-gif.txt:", err.message);
        return "Failed to load a random GIF. Check if the file exists.";
    }
}

// cmd
module.exports = {
    data: new SlashCommandBuilder()
        .setName('boop')
        .setDescription('Boops')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user you want to boop')
                .setRequired(false)
        ),

    async execute(interaction) {
        await interaction.reply('-# *Booping...*');

        const boopGif = await getBoopgif();
        const user = interaction.options.getUser('user');

        if (user) {
            const boopEmbed = new EmbedBuilder()
                .setDescription(`<@${interaction.user.id}> boops ${user}`) 
                .setImage(boopGif)                    
                .setColor(0xFFC0CB);                   

            await interaction.editReply({
                embeds: [boopEmbed]
            });
        } else {
            const boopEmbed = new EmbedBuilder()
                .setDescription(`<@${interaction.user.id}> boops themselves!`) 
                .setImage(boopGif)                    
                .setColor(0xFFC0CB);                   

            await interaction.editReply({
                embeds: [boopEmbed]
            });
        }
    }
};

