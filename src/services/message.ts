import prisma from "@/lib/prisma";

export const getMessageRand = async (): Promise<Message | undefined> => {
  const rows: {
    id: bigint;
    date_week: string;
    text: string;
    username: string;
    like_num: number;
    weather: string;
    mood: string;
  }[] =
    await prisma.$queryRaw`select id,date_week,text,username,like_num,weather,mood from message where approved = 1 order by RAND() limit 1;`;
  if (rows) {
    return {
      id: rows[0].id.toString(),
      dateWeek: rows[0].date_week,
      text: rows[0].text,
      username: rows[0].username,
      likeNum: rows[0].like_num,
      weather: rows[0].weather,
      mood: rows[0].mood,
    } as Message;
  }
};

export const listRanking = async (): Promise<RankingItem[]> => {
  const rows: {
    username: string;
    submissions: bigint;
  }[] =
    await prisma.$queryRaw`select username,count(1) submissions from message where approved = 1 and username != '' group by username order by count(1) desc limit 10;`;
  return rows.map((row, index) => {
    return {
      username: row.username,
      submissions: row.submissions.toString(),
      rank: index + 1,
    } as RankingItem;
  });
};

export const countMessage = async (ip: string): Promise<number> => {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  return prisma.message.count({
    where: {
      ip,
      createTime: {
        gte: startOfToday,
        lt: endOfToday,
      },
    },
  });
};

export const saveMessage = async (dateWeek: string, text: string, username: string, ip: string) => {
  await prisma.message.create({
    data: {
      dateWeek,
      text,
      approved: 0,
      username,
      ip,
    },
  });
};
