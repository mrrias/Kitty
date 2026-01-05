const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");

module.exports = {
  name: "bean",

  async execute(message, args, client) {
    let user = message.mentions.users.first();

    if (!user && args[0]) {
      user = await client.users.fetch(args[0]).catch(() => null);
    }

    if (!user) {
      const errorEmbed = new EmbedBuilder()
        .setTitle("You must provide a mention or a valid user ID.")
        .addFields(
          { name: "Required:", value: "-bean {@user}" },
          { name: "Optional:", value: "-bean {@user} {reason}" }
        )
        .setTimestamp()
        .setColor(embedColor);

      await message.reply({
        embeds: [errorEmbed],
      });
    } else {
      let reason = args.slice(1).join(" ") || "No reason provided";

      const beanEmbed = new EmbedBuilder()
        .setTitle("User Banned!")
        .setDescription(`${user} was banned by <@${message.author.id}>`)
        .addFields(
          { name: "", value: " " },
          { name: "Reason", value: reason },
          { name: "", value: " " }
        )
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(embedColor);

      await message.reply({
        embeds: [beanEmbed],
      });
    }
  },
};
