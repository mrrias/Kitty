const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../variables/vars.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("high-five")
    .setDescription("High five a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    await interaction.reply(`-# *Loading...*`);

    const highFiveEmbed = new EmbedBuilder()
      .setDescription(`<@${interaction.user.id}> gives ${user} a high five`)
      .setColor(embedColor);

    await interaction.editReply(`-# Loaded!`);
    await interaction.editReply({
      embeds: [highFiveEmbed],
    });
  },
};
