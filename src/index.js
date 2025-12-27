
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');


// Perms
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


// Ready
client.on('clientReady', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
});


// Message reply
const greetings = ['hello', 'hey', 'hi']
client.on('messageCreate', (msg) => {
    if (msg.author.bot) {
        return;
    }

    if (greetings.includes(msg.content.toLowerCase())) {
        msg.reply("Hiya, Your cute :3");
    }
});


//
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'math') {
        const op = interaction.options.get('operator').value;
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        if (op === '+') {
            interaction.reply(`${num1 + num2}`);
        }

        else if (op === '-') {
            interaction.reply(`${num1 - num2}`);
        }

        else if (op === '/') {
            interaction.reply(`${num1 / num2}`);
        }

        else if (op === '*') {
            interaction.reply(`${num1 * num2}`);
        }
    }
});


// Login
client.login(process.env.TOKEN);
