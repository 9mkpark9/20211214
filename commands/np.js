const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "이 명령을 사용하려면 먼저 음성 채널에 가입해야 합니다!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setDescription(":x: 이 서버에서 재생되는 노래가 없습니다.")
    );
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "지금 재생 중",
        "https://img.icons8.com/color/2x/audio-wave--v2.gif"
      )
      .setColor("BLUE")
      .setDescription(
        queue.queue[0].name +
          " 요청 By: " +
          "<@" +
          queue.queue[0].requested +
          ">"
      )
      .setThumbnail(queue.queue[0].thumbnail)
      .setFooter("대기중인 노래들 " + queue.queue.length + " 있다.")
  );
};
