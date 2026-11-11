import { NumberLengthRange, type NumeralSystems } from '../types/game-constants';

type countSecretsFunction = (length: number, base: NumeralSystems) => number;

function checkArgumentsForError(length: number, base: NumeralSystems, lengthRange = NumberLengthRange): void {
  if (typeof length !== 'number' || typeof base !== 'number') {
    throw new TypeError('Длина и система счисления должны быть с типом number');
  }
  if (length > base) {
    throw new RangeError('Длина не может быть больше чем количество цифр в системе счисления');
  }
  if (length > lengthRange.MAX_LENGTH) {
    throw new RangeError(`Длина не может быть больше ${lengthRange.MAX_LENGTH}`);
  }
  if (length < 0) {
    throw new RangeError('Длина не может быть меньше 0');
  }
}

function memoizedCountPossibleSecrets(): countSecretsFunction {
  const cache = new Map<string, number>();

  return function countPossibleSecrets(length: number, base: NumeralSystems): number {
    checkArgumentsForError(length, base);

    const cacheKey = `${base}/${length}`;
    const cachedResult = cache.get(cacheKey);

    if (cachedResult !== undefined) {
      return cachedResult;
    }

    if (length === 0) {
      return 1;
    }

    const possibleSecrets = base * countPossibleSecrets(length - 1, base - 1);
    cache.set(cacheKey, possibleSecrets);

    return possibleSecrets;
  };
}

const countPossibleSecrets = memoizedCountPossibleSecrets();

export { countPossibleSecrets };
