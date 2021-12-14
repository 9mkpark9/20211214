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
        .setDescription(":x: 이 서버에서 재생되는 노래가 없습니다.")
        .setColor("RED")
    );
  queue.connection.dispatcher.end('건너뛰기');
  return message.channel.send(
    new MessageEmbed()
      .setDescription("**음악을 건너뛰기 :white_check_mark: **")
      .setColor("BLUE")
  );
};
