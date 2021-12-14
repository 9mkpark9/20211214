const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const queue = message.client.queue.get(message.guild.id);

  if (!queue)
    return message.channel.send(
      ":x: 이 서버에서 재생되는 노래가 없습니다."
    );

  queue.loop = !queue.loop;
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Master Loop Contrller",
        "https://img.icons8.com/color/2x/refresh--v2.gif"
      )
      .setColor("BLUE")
      .setTimestamp()
      .setDescription(
        "**Loop is" +
          (queue.loop == true ? " Enabled " : " Disabled ") +
        "for current song :white_check_mark: **"
      )
  );
};
