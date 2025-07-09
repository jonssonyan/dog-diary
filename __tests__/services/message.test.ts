import { countMessage, getMessageRand, listRanking, saveMessage } from "@/services/message";
import { WEATHER_OPTIONS } from "@/configs/weather";
import { MOOD_OPTIONS } from "@/configs/mood";
import prisma from "@/lib/prisma";

describe("message", () => {
  test("getMessageRand", async () => {
    const message = await getMessageRand();
    console.log(message);
  });

  test("listRanking", async () => {
    const messages = await listRanking();
    console.log(messages);
  });

  test("countMessage", async () => {
    const count = await countMessage("::1");
    console.log(count);
  });

  test("saveMessage", async () => {
    await saveMessage("2022年10月5日 星期三", "测试", "张三", "::1");
  });

  test("updateMessage", async () => {
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ mood: "" }, { weather: "" }],
      },
    });
    for (const message of messages) {
      const weatherValues = Object.values(WEATHER_OPTIONS);
      const weatherRandomIndex = Math.floor(Math.random() * weatherValues.length);
      const weather = weatherValues[weatherRandomIndex].value;
      const moodValues = Object.values(MOOD_OPTIONS);
      const moodRandomIndex = Math.floor(Math.random() * moodValues.length);
      const mood = moodValues[moodRandomIndex].value;
      await prisma.message.update({
        where: { id: message.id },
        data: {
          weather,
          mood,
        },
      });
    }
  });
});
