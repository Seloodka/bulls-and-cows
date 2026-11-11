import { NumberLengthRange, NumeralSystems } from '../types/game-constants';

type randomCallback = () => number;

function checkArgumentsForError(
  length: number,
  base: NumeralSystems,
  random: randomCallback = Math.random,
  lengthRange = NumberLengthRange,
): void {
  if (length < lengthRange.MIN_LENGTH || length > lengthRange.MAX_LENGTH) {
    throw new RangeError(
      `Длинна числа не должна быть меньше ${lengthRange.MIN_LENGTH} и больше ${lengthRange.MAX_LENGTH}`,
    );
  }
  if (!Object.hasOwn(NumeralSystems, base)) {
    throw new Error(`Введена недопустимая система счисления: ${base}`);
  }
  if (random() < 0 || random() > 1) {
    throw new RangeError('Выходные значения функции random находятся не в диапазоне от 0 до 1');
  }
}

function generateSecret(length: number, base: NumeralSystems, random: randomCallback = Math.random): string[] {
  checkArgumentsForError(length, base, random);

  const allAvailableChars: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  const possibleChards = allAvailableChars.slice(0, base);
  const generateRandomCharIndex = (): number => Math.floor(random() * base);

  const secret: string[] = Array.from({ length }, () => {
    const char = possibleChards[generateRandomCharIndex()];
    if (char) {
      return char;
    }

    throw new RangeError('Random сгенерировал индекс больше, чем существует возможных значений');
  });

  return secret;
}

export { generateSecret };
