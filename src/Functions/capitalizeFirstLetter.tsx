export const capitalizeFirstLetter = (word: string): string => {
  const firstLetter = word ? word[0].toUpperCase() : '';
  return firstLetter;
};
