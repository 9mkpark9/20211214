const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "이 명령을 사용하려면 먼저 음성 채널에 가입해야 합니다!"
    );
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Master Shuffle Controller Error",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("** :x: 대기열에 순서 섞을 노래가 없습니다.**")
        .setColor("RED")
    );
  let songs = queue.queue;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.queue = songs;
  message.client.queue.set(message.guild.id, queue);
  message.channel
    .send(
      new MessageEmbed()
        .setAuthor(
          "Master Shuffle Controller",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("** :white_check_mark: 대기줄을 뒤섞었다.**")
        .setColor("BLUE")
    )
    .catch(console.error);
};
