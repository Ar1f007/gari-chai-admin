export function getCurrentYear() {
  const date = new Date();
  return date.getFullYear().toString();
}

export function xCharacterLong(fieldName: string, length: number) {
  return `${fieldName} should be at least ${length} character long`;
}
