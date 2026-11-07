import type { NumeralSystems } from '../types/game-constants';

function isValidGuess(guess: string, length: number, base: NumeralSystems): boolean {
  throw new Error(`not implemented, no used: ${guess}, ${length},  ${base}}`);
}

export { isValidGuess };
