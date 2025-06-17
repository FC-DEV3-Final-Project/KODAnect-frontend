export function formatDateToYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateToKorean(date: string): string {
  const [year, month, day] = date.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

export function formatDateToDotNotation(date: string): string {
  const [year, month, day] = date.split("-");
  return `${year}.${month}.${day}`;
}
