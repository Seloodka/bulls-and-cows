import { describe, expect, test } from '@jest/globals';
import { isValidGuess } from '../src/core/isValidGuess';
import { NumberLengthRange, NumeralSystems } from '../src/types/game-constants';

describe('generateSecret', () => {
  test('Длина не соответствует диапазону', (range = NumberLengthRange) => {
    const maxLength = range.MAX_LENGTH;
    const minLength = range.MIN_LENGTH;

    expect(() => isValidGuess('15268', maxLength + 1, NumeralSystems.DEC)).toThrow(RangeError);
    expect(() => isValidGuess('15268', minLength - 1, NumeralSystems.DEC)).toThrow(RangeError);
  });

  test('Длина guess числа больше длины загаданного', () => {
    const guess = '5789';
    const length = 3;

    expect(isValidGuess(guess, length, NumeralSystems.DEC)).toBe(false);
  });

  test('Длина guess числа меньше длины загаданного', () => {
    const guess = '358';
    const length = 6;

    expect(isValidGuess(guess, length, NumeralSystems.DEC)).toBe(false);
  });

  test('Разные системы счисления DEC => BIN', () => {
    const guess = '95132';
    const length = 5;

    expect(isValidGuess(guess, length, NumeralSystems.BIN)).toBe(false);
  });

  test('Разные системы счисления DEC => OCT', () => {
    const guess = '9898';
    const length = 4;

    expect(isValidGuess(guess, length, NumeralSystems.OCT)).toBe(false);
  });

  test('Разные системы счисления HEX => DEC', () => {
    const guess = 'AF15';
    const length = 4;

    expect(isValidGuess(guess, length, NumeralSystems.DEC)).toBe(false);
  });

  test('Несуществующие значения для HEX', () => {
    const guess = 'ZXCGH';
    const length = 5;

    expect(isValidGuess(guess, length, NumeralSystems.HEX)).toBe(false);
  });

  test('Подходящее значение для HEX', () => {
    const guess = '01FA';
    const length = 4;

    expect(isValidGuess(guess, length, NumeralSystems.HEX)).toBe(true);
  });

  test('Подходящее значение для DEC', () => {
    const guess = '099';
    const length = 3;

    expect(isValidGuess(guess, length, NumeralSystems.DEC)).toBe(true);
  });

  test('Подходящее значение для OCT', () => {
    const guess = '07054';
    const length = 5;

    expect(isValidGuess(guess, length, NumeralSystems.OCT)).toBe(true);
  });

  test('Подходящее значение для BIN', () => {
    const guess = '0110';
    const length = 4;

    expect(isValidGuess(guess, length, NumeralSystems.BIN)).toBe(true);
  });
});
