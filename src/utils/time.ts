export const formatDateToChinese = (date: Date): string => {
  const daysOfWeek = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${year}年${month}月${day}日 ${dayOfWeek}`;
};
