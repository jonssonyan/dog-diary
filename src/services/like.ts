import prisma from "@/lib/prisma";

export const countLike = async (ip: string): Promise<number> => {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  return prisma.like.count({
    where: {
      ip,
      createTime: {
        gte: startOfToday,
        lt: endOfToday,
      },
    },
  });
};

export const saveLike = async (messageId: bigint, ip: string) => {
  await prisma.$transaction(async (tx) => {
    await tx.message.update({
      where: {
        id: messageId,
      },
      data: {
        likeNum: {
          increment: 1,
        },
      },
    });

    await tx.like.create({
      data: {
        messageId,
        ip,
      },
    });
  });
};
