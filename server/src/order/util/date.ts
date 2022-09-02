export function getRangeByToday(dateInterval: number) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const today = new Date(year, month, day);
  const targetDay = new Date(year, month, day + dateInterval);
  return [today, targetDay];
}
