const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");

// cmd
module.exports = {
  name: "truck",

  async execute(message) {
    const user = message.mentions.users.first();

    if (user) {
      const truckEmbed = new EmbedBuilder()
        .setDescription(
          `-# ${message.author} *summons Truck-kun* \n\n${user} **was hit!**`
        )
        .setImage(
          "https://media.tenor.com/0LwdKsukSe4AAAAM/truck-kun-truck.gif"
        )
        .setColor(embedColor);

      await message.reply({
        embeds: [truckEmbed],
      });
    } else {
      const errorEmbed = new EmbedBuilder()
        .setDescription(`**Please use valid syntax!** \n-truck {user}`)
        .setColor(embedColor);

      await message.reply({
        embeds: [errorEmbed],
      });
    }
  },
};
