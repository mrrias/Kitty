
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');


// get gif
async function getKissGif() {
    try {
        // Find the file in the same directory as this script
        const filePath = path.join(__dirname, 'kiss-gif.txt');
        
        const data = await fs.readFile(filePath, 'utf-8');

        // Split into array and remove empty lines/whitespace
        const lines = data.split(/\r?\n/).filter(line => line.trim() !== "");

        if (lines.length === 0) {
            return "Couldn't find kiss gif";
        }

        // Pick and return a random line
        const randomValue = lines[Math.floor(Math.random() * lines.length)];
        return randomValue;

    } catch (err) {
        // Log the actual error to your terminal so you can debug pathing issues
        console.error("Error reading kiss-gif.txt:", err.message);
        return "Failed to load a random GIF. Check if the file exists.";
    }
}

// cmd
module.exports = {
    data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Kiss user')
    .addUserOption((option) => 
        option
            .setName('user')
            .setDescription('user')
    ),

    async execute(interaction) {
        await interaction.reply('-# *Kisses loading...*')

        const user = interaction.options.getUser('user');
        const kissGif = await getKissGif();

        if (user) {
            const kissEmbed = new EmbedBuilder()
                .setDescription(`<@${interaction.user.id}> gives ${user} a little kiss`)
                .setImage(kissGif)
                .setColor(0xFFC0CB);
            
            await interaction.editReply({
                embeds: [kissEmbed]
            });

        } else {
            const kissEmbed = new EmbedBuilder()
                .setDescription(`Can't kiss yourself silly *boops*`)
                .setColor(0xFFC0CB);
            
            await interaction.editReply({
                embeds: [kissEmbed]
            });
        }
    }
};
