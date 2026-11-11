import { NumeralSystems } from '../types/game-constants';

type validatorFunction = (char: string) => boolean;

function CheckBaseForError(base: NumeralSystems, possibleNumerals = NumeralSystems): void {
  if (!Object.hasOwn(possibleNumerals, base)) {
    throw new Error(`Введена недопустимая система счисления: ${base}`);
  }
}

function createDigitValidator(base: NumeralSystems): validatorFunction {
  CheckBaseForError(base);

  const allAvailableChars: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  const possibleChars = new Set(allAvailableChars.slice(0, base));

  return (char: string): boolean => {
    return possibleChars.has(char.toLowerCase());
  };
}

export { createDigitValidator };
