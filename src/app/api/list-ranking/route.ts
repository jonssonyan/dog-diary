import { respData, respErr } from "@/utils/resp";
import { listRanking } from "@/services/message";
import logger from "@/lib/logger";

export const revalidate = 0;

export const GET = async () => {
  try {
    const result = await listRanking();
    return respData(result);
  } catch (e) {
    logger.error(`get ranking failed: ${e}`);
    return respErr("get ranking failed");
  }
};