type BullsAndCowsCount = {
  bulls: number;
  cows: number;
};

function evaluateGuess(secret: string[], guess: string): BullsAndCowsCount {
  throw new Error(`not implemented, no used: ${secret}, ${guess}}`);
}

export { evaluateGuess };
