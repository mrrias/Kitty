const { ContainerBuilder, MessageFlags } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");

module.exports = {
  name: "bean",

  async execute(message, args, client) {
    let user = message.mentions.users.first();

    if (!user && args[0]) {
      user = await client.users.fetch(args[0]).catch(() => null);
    }

    if (!user) {
      const errorEmbed = new ContainerBuilder()
        .addTextDisplayComponents((textDisplay) =>
          textDisplay.setContent(
            `**You must provide a mention or a valid user ID.**`
          )
        )
        .addSeparatorComponents((divider) => divider)
        .addTextDisplayComponents((textDisplay) =>
          textDisplay.setContent(
            `**Required** \n-bean {@user} \n\n**Optional** \n-bean {@user} {reason}`
          )
        )
        .addSeparatorComponents((divider) => divider)
        .setAccentColor(embedColor);

      await message.reply({
        components: [errorEmbed],
        flags: MessageFlags.IsComponentsV2,
      });
    } else {
      let reason = args.slice(1).join(" ") || "No reason provided";

      const beanEmbed = new ContainerBuilder()
        .addTextDisplayComponents((textDisplay) =>
          textDisplay.setContent(`**User Banned** \n${user}`)
        )
        .addSeparatorComponents((divider) => divider)
        .addTextDisplayComponents((textDisplay) =>
          textDisplay.setContent(`**Reason** \n${reason}`)
        )
        .addSeparatorComponents((divider) => divider)
        .addTextDisplayComponents((textDisplay) =>
          textDisplay.setContent(
            "-# *This command is a joke... no one was banned*"
          )
        )
        .setAccentColor(embedColor);

      await message.reply({
        components: [beanEmbed],
        flags: MessageFlags.IsComponentsV2,
      });
    }
  },
};
