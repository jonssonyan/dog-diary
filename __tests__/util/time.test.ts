import { formatDateToChinese } from "@/utils/time";

describe("time", () => {
  test("formatDateToChinese", () => {
    const result = formatDateToChinese(new Date());
    console.log(result);
  });
});
