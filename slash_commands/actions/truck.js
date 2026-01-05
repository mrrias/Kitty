const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");

// cmd
module.exports = {
  data: new SlashCommandBuilder()
    .setName("truck")
    .setDescription("Run over members")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    await interaction.reply(`-# *Summoning Truck-kun...*`);

    const truckEmbed = new EmbedBuilder()
      .setDescription(`Truck-kun runs over ${user}`)
      .setImage("https://media.tenor.com/0LwdKsukSe4AAAAM/truck-kun-truck.gif")
      .setColor(embedColor);

    await interaction.editReply(`-# Truck-kun is here... **RUN**`);
    await interaction.editReply({
      embeds: [truckEmbed],
    });
  },
};
