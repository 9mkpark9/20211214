const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

exports.run = async (client, message, args) => {
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel
      .send("노는 곳이 없습니다.")
      .catch(console.error);

  let lyrics = null;

  try {
    lyrics = await lyricsFinder(queue.queue[0].name, "");
    if (!lyrics) lyrics = `다음에 대한 가사를 찾을 수 없습니다. ${queue.queue[0].name} :x:`;
  } catch (error) {
    lyrics = `다음에 대한 가사를 찾을 수 없습니다. ${queue.queue[0].name} :x:`;
  }

  let lyricsEmbed = new MessageEmbed()
    .setAuthor(
      `Lyrics For ${queue.queue[0].name}`,
      "https://img.icons8.com/color/2x/task--v2.gif"
    )
    .setDescription(lyrics)
    .setColor("BLUE")
    .setTimestamp();

  if (lyricsEmbed.description.length >= 2048)
    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
  return message.channel.send(lyricsEmbed).catch(console.error);
};
