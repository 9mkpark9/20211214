const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const commands = `connect\`\` - 당신이 있는 음성 채널에 들어가다
   disconnect\`\` - 당신이 있는 음성 채널을 떠나다
   play <노래 제목 or url>\`\` - 유튜브에서 노래를 틀다
   pause\`\` - 서버에서 현재 재생 중인 노래 일시 중지
   resume\`\` - 서버에서 일시 중지된 노래 재생
   queue\`\` - 서버의 노래 대기열을 보여줍니다
   skip\`\` - 다음 노래로 건너뛰다
   skipto <대상번호>\`\` - 대상까지 여러 번 건너뜁니다
   stop\`\` - 노래를 멈추고 대기열을 지웁니다
   volume <볼륨 개수 또는 없음>\`\` - 노래 볼륨 보기 또는 조절
   np\`\` - 지금 재생 중인 노래
   lyrics\`\` - 가사보기
   shuffle\`\` - 줄을 섞어서 무작위로 설정
   invite\`\` - 봇 초대 링크
   loop\`\` - 가능 / 현재 재생 중인 노래에 대한 루프 비활성화
   remove <대상번호>\`\` - 노래를 줄에서 빼다
   help\`\` - 명령어`;

  const revised = commands
    .split("\n")
    .map((x) => "• " + "``" + client.config.prefix + x.trim())
    .join("\n");

  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "노래봇 커맨드 명령어",
        "https://img.icons8.com/color/2x/services--v2.gif"
      )
      .setColor("FFFBFB")
      .setTimestamp()
      .setDescription(revised)
  );
};
