
const { SlashCommandBuilder } = require('discord.js');


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
        const user = interaction.options.getUser('user');

        if (user) {
            await interaction.reply(
                `<@${interaction.user.id}> gibs ${user} a lil kiss`
            );

        } else {
            await interaction.reply(
                'Important to love yourself too :3'
            );
        }
    }
};
