import { NextRequest } from "next/server";
import { z } from "zod";
import { getIP } from "@/utils/req";
import { respErr, respOk } from "@/utils/resp";
import { handleZodError } from "@/utils/zod";
import { countLike, saveLike } from "@/services/like";

const schema = z.object({
  messageId: z.string().min(1, { message: "必须大于 0" }),
});

export const POST = async (req: NextRequest) => {
  try {
    const ip = getIP(req);

    if (!ip || ip === "unknown") {
      return respErr("IP not found");
    }

    const { messageId } = schema.parse(await req.json());

    const count = await countLike(ip);

    if (count < 3) {
      await saveLike(BigInt(messageId), ip);
      return respOk();
    }

    return respErr("今天你的点赞次数已达上限了，明天再来吧");
  } catch (e) {
    if (e instanceof z.ZodError) {
      return handleZodError(e);
    }
    return respErr("save like failed");
  }
};
