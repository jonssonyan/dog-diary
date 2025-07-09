import { NextRequest } from "next/server";
import { respErr, respOk } from "@/utils/resp";
import { z } from "zod";
import { handleZodError } from "@/utils/zod";
import { getIP } from "@/utils/req";
import { countMessage, saveMessage } from "@/services/message";

const schema = z.object({
  dateWeek: z
    .string()
    .trim()
    .min(8, { message: "日期字段长度必须在 8 到 32 之间" })
    .max(32, { message: "日期字段长度必须在 8 到 32 之间" }),
  text: z
    .string()
    .trim()
    .min(2, { message: "日记内容长度必须在 2 到 512 之间，请输入有效日记内容。" })
    .max(512, { message: "日记内容长度必须在 2 到 512 之间，请输入有效日记内容。" })
    .trim(),
  username: z
    .string()
    .trim()
    .min(2, { message: "称呼长度必须在 2 到 32 之间" })
    .max(32, { message: "称呼长度必须在 2 到 32 之间" }),
});

export const POST = async (req: NextRequest) => {
  try {
    const ip = getIP(req);

    if (!ip || ip === "unknown") {
      return respErr("IP not found");
    }

    const { dateWeek, text, username } = schema.parse(await req.json());

    const count = await countMessage(ip);

    if (count < 3) {
      await saveMessage(dateWeek, text, username, ip);
      return respOk();
    }

    return respErr("今天你已经写日记次数已达上限了，明天再来吧");
  } catch (e) {
    if (e instanceof z.ZodError) {
      return handleZodError(e);
    }
    return respErr("submit diary failed");
  }
};
