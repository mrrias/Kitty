
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('math')
    .setDescription('Do simple math!')
    .addStringOption((option) =>
        option
            .setName('operator')
            .setDescription('Operator')
            .setRequired(true)
            .addChoices(
                { name: 'add', value: 'add'},
                { name: 'sub', value: 'sub'},
                { name: 'div', value: 'div'},
                { name: 'multi', value: 'multi'},
            ),
    )
    .addNumberOption((option) =>
        option.setName('first-number')
        .setDescription('First Number')
        .setRequired(true)
    )
    .addNumberOption((option) =>
        option.setName('second-number')
        .setDescription('Second Number')
        .setRequired(true)
    ),

    async execute(interaction) {
        const op = interaction.options.getString('operator');
        const num1 = interaction.options.getNumber('first-number');
        const num2 = interaction.options.getNumber('second-number');

        try {
            if (op === 'add') {
                interaction.reply(
                    `${num1 + num2}`
                );
            } else if (op === 'sub') {
                interaction.reply(`
                    ${num1 - num2}`
                );
            } else if (op === 'div') {
                interaction.reply(
                    `${num1 / num2}`
                );
            } else if (op === 'multi') {
                interaction.reply(
                    `${num1 * num2}`
                );
            }
        } catch (error) {
            await interaction.reply(
                'Error!'
            );
        }
    }
};
