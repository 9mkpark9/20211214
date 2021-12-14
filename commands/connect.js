const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "이 명령을 사용하려면 먼저 음성 채널에 가입해야 합니다!"
    );

  if (!channel.permissionsFor(message.client.user).has("연결"))
    return error("음성 채널에 가입할 수 있는 권한이 없습니다.");

  if (!channel.permissionsFor(message.client.user).has("마이크"))
    return error("음성 채널에서 말할 수 있는 권한이 없습니다.");

  await channel.join();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**음성 채널에 가입했습니다. :white_check_mark: **")
      .setColor("BLUE")
  );
};
