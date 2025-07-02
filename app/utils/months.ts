
export const getArrayMonths = (totalMonths: number = 12) => {
  const months = [];
  for (let i = 1; i <= totalMonths; i++) {
    months.push({ id: i, label: `${i}x` });
  }
  return months;
}