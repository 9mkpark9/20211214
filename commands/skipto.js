const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
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
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**건너뛸 숫자를 지정해야 합니다.** :x:")
        .setColor("RED")
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**값은 숫자여야 합니다.** :x:")
        .setColor("RED")
    );
  queue.playing = !false;

  if (queue.loop) {
    for (let i = 0; i < parseInt(args[0]) - (1 + 1); i++) {
      var delta = queue.queue.shift();
      queue.queue.push(delta);
    }
  } else {
    queue.queue = queue.queue.slice(parseInt(args[0]) - (1 + 1));
  }

  try {
    queue.connection.dispatcher.end();
  } catch (e) {
    console.log(e);
    message.client.queue.delete(message.guild.id);
    queue.vc.leave();
  }

  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**음악을 건너뛸 위치" +
          " `" +
          args[0] +
          "` " +
          ":white_check_mark:**"
      )
      .setColor("BLUE")
  );
};
