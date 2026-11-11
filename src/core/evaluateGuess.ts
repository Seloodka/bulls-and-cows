type BullsAndCowsCount = {
  bulls: number;
  cows: number;
};

type CharsCountMap = {
  [key: string]: number;
};

function evaluateGuess(secret: string[], guess: string): BullsAndCowsCount {
  if (!Array.isArray(secret)) {
    throw new TypeError('Секретное число не является массивом символов');
  }
  if (secret.length !== guess.length) {
    throw new RangeError(
      `Длина: ${guess} - ${guess.length} не соответствуют длине загаданного числа - ${secret.length}`,
    );
  }

  const lowerCaseSecret = secret.map((char) => char.toLowerCase());
  const guessWithoutBulls = guess.split('').filter((elem, ind) => elem.toLowerCase() !== lowerCaseSecret[ind]);
  const secretCharsCountWithoutBulls = lowerCaseSecret
    .filter((elem, ind) => elem !== guess[ind]?.toLowerCase())
    .reduce((acc, elem) => {
      if (!acc[elem]) acc[elem] = 1;
      else acc[elem] += 1;

      return acc;
    }, {} as CharsCountMap);

  const bulls = lowerCaseSecret.filter((elem, ind) => elem === guess[ind]?.toLowerCase()).length;
  const cows = guessWithoutBulls.reduce((acc, guessChar) => {
    const guessCharCountInSecret = secretCharsCountWithoutBulls[guessChar.toLowerCase()] || 0;

    return guessCharCountInSecret > 0 ? acc + 1 : acc;
  }, 0);

  return { bulls, cows } as BullsAndCowsCount;
}

export { evaluateGuess };
