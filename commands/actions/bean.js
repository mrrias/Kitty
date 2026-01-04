const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../variables/vars.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bean")
    .setDescription("Ban members")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("why do you want to bean this user?")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");

    await interaction.reply(`-# *Banning...*`);

    if (reason) {
      const beanEmbed = new EmbedBuilder()
        .setDescription(
          `${user} was banned by <@${interaction.user.id}> \n\n**Reason:** ${reason}`
        )
        .setColor(embedColor);

      await interaction.editReply(`-# User banned!`);
      await interaction.editReply({
        embeds: [beanEmbed],
      });
    } else {
      const beanEmbed = new EmbedBuilder()
        .setDescription(`${user} was banned by <@${interaction.user.id}>`)
        .setColor(embedColor);

      await interaction.editReply(`-# User banned!`);
      await interaction.editReply({
        embeds: [beanEmbed],
      });
    }
  },
};
