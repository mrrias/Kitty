require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'math',
        description: 'Add two numbers!',
        options: [
            {
                name: 'operator',
                description: 'Pick and operator.',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'add',
                        value: '+'
                    },
                    {
                        name: 'minus',
                        value: '-'
                    },
                    {
                        name: 'div',
                        value: '/'
                    },
                    {
                        name: 'multi',
                        value: '*'
                    },
                ],
                required: true
            },
            {
                name: 'first-number',
                description: 'Frist number.',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: 'second-number',
                description: 'Second number.',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    },
    {
        name: 'hug',
        description: 'Spread love',
        options: [
            {
                name: 'user',
                description: 'username',
                type: ApplicationCommandOptionType.String,
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log('Regestrating slash commands...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Slash commands were regesterred!');
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();
