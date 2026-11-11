import { describe, expect, test } from '@jest/globals';
import { countPossibleSecrets } from '../src/core/countPossibleSecrets';
import { NumberLengthRange, NumeralSystems } from '../src/types/game-constants';

describe('countPossibleSecrets', () => {
  test('Недопустимая длина числа для системы счисления вызывает ошибку', () => {
    expect(() => countPossibleSecrets(5, NumeralSystems.BIN)).toThrow(Error);
  });

  test('Длина выше допустимой должна вызвать ошибку', (lengthRange = NumberLengthRange) => {
    expect(() => countPossibleSecrets(lengthRange.MAX_LENGTH + 1, NumeralSystems.BIN)).toThrow(RangeError);
  });

  test('Отрицательная длина должна вызвать ошибку', () => {
    expect(() => countPossibleSecrets(-1, NumeralSystems.BIN)).toThrow(RangeError);
  });

  test('Неверные входные данные должны вызвать ошибку', () => {
    expect(() => countPossibleSecrets(5, null as never)).toThrow(TypeError);
    expect(() => countPossibleSecrets('2' as never, NumeralSystems.DEC)).toThrow(TypeError);
    expect(() => countPossibleSecrets(undefined as never, NumeralSystems.DEC)).toThrow(TypeError);
  });

  test('Функция должна возвращать корректные значения', () => {
    expect(countPossibleSecrets(2, NumeralSystems.BIN)).toBe(2);
    expect(countPossibleSecrets(6, NumeralSystems.OCT)).toBe(20160);
    expect(countPossibleSecrets(6, NumeralSystems.DEC)).toBe(151200);
    expect(countPossibleSecrets(6, NumeralSystems.HEX)).toBe(5765760);
  });
});
