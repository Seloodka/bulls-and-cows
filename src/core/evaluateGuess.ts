type BullsAndCowsCount = {
  bulls: number;
  cows: number;
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
  const secretCharSet = new Set(lowerCaseSecret);
  const bullsAndCows = lowerCaseSecret.reduce(
    (acc, secretChar, index) => {
      if (!guess[index]) {
        throw new Error(
          `Длина: ${guess} - ${guess.length} не соответствуют длине загаданного числа - ${secret.length}`,
        );
      }

      const guessChar = guess[index].toLowerCase();
      if (guessChar === secretChar) {
        acc.bulls++;
      } else if (secretCharSet.has(guessChar)) {
        acc.cows++;
      }

      return acc;
    },
    { bulls: 0, cows: 0 } as BullsAndCowsCount,
  );

  return bullsAndCows;
}

export { evaluateGuess };
