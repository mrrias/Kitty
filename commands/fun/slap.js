const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../variables/vars.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Slap a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    await interaction.reply(`-# *Loading...*`);

    const slapEmbed = new EmbedBuilder()
      .setDescription(`<@${interaction.user.id}> slaps ${user}`)
      .setColor(embedColor);

    await interaction.editReply(`-# Loaded!`);
    await interaction.editReply({
      embeds: [slapEmbed],
    });
  },
};
