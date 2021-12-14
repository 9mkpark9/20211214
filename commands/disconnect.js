const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "이 명령을 사용하려면 먼저 음성 채널에 가입해야 합니다!"
    );

  await channel.leave();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**음성 채널 종료 :white_check_mark: **")
      .setColor("BLUE")
  );
};
