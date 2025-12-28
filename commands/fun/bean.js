
// To do
// Add embed

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bean')
    .setDescription('Ban members')
    .addStringOption((option) =>
        option
            .setName('user')
            .setDescription('user')
            .setRequired(true)
    )
    .addStringOption((option) => 
        option
            .setName('reason')
            .setDescription('why do you want to bean this user?')
            .setRequired(false)
    ),

    async execute(interaction) {
        const user = interaction.options.getString('user');
        const reason = interaction.options.getString('reason');

        if (reason) {
            await interaction.reply (
                `**${user} has been banned** \n-# by <@${interaction.user.id}> \n\n**Reason:** \n> ${reason} \n\n-# *This is a joke ofc*`
            )
        } else {
            await interaction.reply (
                `**${user} has been banned** \n-# by <@${interaction.user.id}> \n\n-# *This is a joke ofc*`
            )
        }
    }
};
