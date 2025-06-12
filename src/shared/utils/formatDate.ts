export function formatDateToDotNotation(date: string): string {
  const [year, month, day] = date.split("-");
  return `${year}.${month}.${day}`;
}

export function formatDateToKorean(date: string): string {
  const [year, month, day] = date.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}
