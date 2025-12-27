
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
    console.log(`✅ : ${c.user.tag} is online.`);
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

    // Math cmd
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

        else {
            interaction.reply("Sorry I don't understand")
        }
    }

    // Hug cmd
    if (interaction.commandName === 'hug') {
        const user = interaction.options.get('user')?.value;

        if (user !== undefined){
            interaction.reply(`<@${interaction.user.id}> hugs ${user}`)
        }

        else {
            interaction.reply(`<@${interaction.user.id}> hugs themselves`)
        }
    }
});


// Login
client.login(process.env.TOKEN);
