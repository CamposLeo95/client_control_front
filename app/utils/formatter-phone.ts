export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, ''); 


  if (cleaned.length === 10) {
      const ddd = cleaned.slice(0, 2);
      const firstPart = cleaned.slice(2, 6);
      const secondPart = cleaned.slice(6, 10);

  return `(${ddd}) ${firstPart}-${secondPart}`;
  } else if (cleaned.length === 11) {
      const ddd = cleaned.slice(0, 2);
      const firstPart = cleaned.slice(2, 7);
      const secondPart = cleaned.slice(7, 11);
    return `(${ddd}) ${firstPart}-${secondPart}`;
  } else {
    return value;
  }
}