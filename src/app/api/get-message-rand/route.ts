import { respData, respErr } from "@/utils/resp";
import { getMessageRand } from "@/services/message";
import logger from "@/lib/logger";

export const revalidate = 0;

export const GET = async () => {
  try {
    const result = await getMessageRand();
    return respData(result);
  } catch (e) {
    logger.error(`get random quote failed: ${e}`);
    return respErr("get random quote failed");
  }
};