import type { NumeralSystems } from '../types/game-constants';

type randomCallback = () => number;

function generateSecret(length: number, base: NumeralSystems, random: randomCallback = Math.random): string[] {
  throw new Error(`not implemented, no used: ${length}, ${base}, ${random}`);
}

export { generateSecret };
