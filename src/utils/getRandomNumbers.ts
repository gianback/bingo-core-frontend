export const getRandomNumbers = (): number[] => {
  let numbers = new Set<number>();

  while (numbers.size < 24) {
    numbers.add(Math.round(Math.random() * 99));
  }

  return [...numbers];
};
