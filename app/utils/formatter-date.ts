export const formatterDateBR = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });


export function formmatDateToFilter(date: Date | undefined): string {
  if (!date) return "";
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
}


export function formatterDateAPI (date: number[])  {
const [year, month, day, hour, minute, second, nanosecond] = date;
const formmatedDate = `${String(day).padStart(2,'0')}/${String(month).padStart(2,'0')}/${year}`
return formmatedDate
}

export function checkDateExpired(date: number[]) {
  const [year, month, day] = date;
  const today = new Date();
  const expirationDate = new Date(year, month - 1, day); 
  return expirationDate <= today;
}
