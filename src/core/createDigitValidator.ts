import { NumeralSystems } from '../types/game-constants';

type validatorFunction = (char: string) => boolean;

function createDigitValidator(base: NumeralSystems): validatorFunction {
  return (char: string): boolean => {
    throw new Error(`not implemented, not used: ${base}, ${char}`);
  };
}

export { createDigitValidator };
