const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "이 명령을 사용하려면 먼저 음성 채널에 가입해야 합니다!"
    );
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: 제공된 노래 번호가 없습니다.")
        .setColor("RED")
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **args는 숫자여야 합니다. [Example: -remove 2]**")
        .setColor("RED")
    );
  let queue = message.client.queue.get(message.guild.id);
  if (args[0] == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **현재 재생 중인 노래를 제거할 수 없습니다. 명령 건너뛰기를 사용하십시오.**"
        )
        .setColor("RED")
    );
  if (queue.queue.length == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **한 곡만 재생 중일 때는 제거할 수 없습니다. 명령 중지 사용**"
        )
        .setColor("RED")
    );
  if (args[0] > queue.queue.length)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **대기열에 노래가 별로 없어요.**")
        .setColor("RED")
    );
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **이 서버에서 재생되는 노래가 없습니다.**")
        .setColor("RED")
    );
  var name = queue.queue[args[0] - 1].name;
  queue.queue.splice(args[0] - 1);
  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**제거된" + " " + name + " " + "대기열 :white_check_mark: **"
      )
      .setTimestamp()
      .setColor("BLUE")
  );
};
