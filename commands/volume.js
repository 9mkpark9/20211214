const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "이 명령을 사용하려면 먼저 음성 채널에 가입해야 합니다!"
    );

  let queue = message.client.queue.get(message.guild.id);

  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Master Volume Controller",
          "https://img.icons8.com/color/2x/high-volume--v2.gif"
        )
        .setColor("BLUE")
        .setDescription("**Current volume is " + queue.volume + " **")
    );

  if (args[0] > 100)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Master Volume Error",
          "https://img.icons8.com/color/2x/high-volume--v2.gif"
        )
        .setColor("RED")
        .setDescription("**Volume cannot exceed 100 :x: **")
    );

  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  queue.volume = args[0];
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Master Volume Controller",
        "https://img.icons8.com/color/2x/high-volume--v2.gif"
      )
      .setColor("BLUE")
      .setDescription("**볼륨 세트 " + args[0] + " :white_check_mark: **")
  );
};
