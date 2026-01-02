const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../variables/vars.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tuck")
    .setDescription("Tuck in a user for sleeps")
    .addUserOption((option) => option.setName("user").setDescription("user")),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    await interaction.reply("-# *Tucking*");

    if (user) {
      const tuckEmbed = new EmbedBuilder()
        .setDescription(`<@${interaction.user.id}> tucks ${user}`)
        .setColor(embedColor);

      await interaction.editReply(`-# Goodnight`);
      await interaction.editReply({
        embeds: [tuckEmbed],
      });
    } else {
      const tuckEmbed = new EmbedBuilder()
        .setDescription(`<@${interaction.user.id}> tucks themselves`)
        .setColor(embedColor);

      await interaction.editReply(`-# Goodnight`);
      await interaction.editReply({
        embeds: [tuckEmbed],
      });
    }
  },
};
