const PRIZE_LINES = {
  0: 0,
  1: 2,
  2: 4,
  3: 49,
  4: 249,
  5: 999,
  6: 9999,
};
type PrizeLineKey = keyof typeof PRIZE_LINES;

/* 
@params card: number[][]
@params winNumbers: number[]
@returns { points: number, binaryMatriz: number[][] }


*/

export const calculatePrize = (card: number[][], winNumbers: number[]) => {
  let lines = 0;
  /* Obtiene la matriz en binario */
  const binaryMatriz = card.map((array) =>
    array.map((number) => {
      if (number === null) {
        return 1;
      }
      return winNumbers.includes(number) ? 1 : 0;
    })
  );

  /* Calcula los puntos */
  //1er si todos son 1 horizontalmente
  binaryMatriz.forEach((item) => {
    const isOk = item.every((number) => number === 1);
    if (isOk) {
      lines++;
    }
  });

  //leer si todos son 1 verticalmente
  binaryMatriz.forEach((item, index, array) => {
    const isOk = item.every((_number, indexNumber) => {
      return array[index][indexNumber] === 1;
    });
    if (isOk) {
      lines++;
    }
  });

  const limits = [0, 4];

  for (let i = 0; i < 2; i++) {
    const matchersNumber: number[] = [];
    binaryMatriz.forEach((_item, index, array) => {
      matchersNumber.push(array[index][Math.abs(index - limits[i])]);
    });
    if (matchersNumber.every((number) => number === 1)) {
      lines++;
    }
  }
  const result = lines as PrizeLineKey;
  return { points: PRIZE_LINES[result], binaryMatriz };
};
