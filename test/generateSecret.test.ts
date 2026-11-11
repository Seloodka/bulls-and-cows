import { describe, expect, test } from '@jest/globals';
import { generateSecret } from '../src/core/generateSecret';
import { NumberLengthRange, NumeralSystems } from '../src/types/game-constants';

const HEX_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

describe('generateSecret', () => {
  test('Длина числа не в указанном диапазоне', (range = NumberLengthRange) => {
    const maxLength = range.MAX_LENGTH;
    const minLength = range.MIN_LENGTH;

    expect(() => generateSecret(maxLength + 1, NumeralSystems.DEC)).toThrow(RangeError);
    expect(() => generateSecret(minLength - 1, NumeralSystems.DEC)).toThrow(RangeError);
  });

  test('Указанна недопустимая система счисления', () => {
    expect(() => generateSecret(5, 5 as never)).toThrow(Error);
  });

  test('Число не в диапазоне верхней границы random', () => {
    const random = () => 2;
    expect(() => generateSecret(1, NumeralSystems.DEC, random)).toThrow(RangeError);
  });

  test('Число не в диапазоне нижней границы random', () => {
    const random = () => -1;
    expect(() => generateSecret(1, NumeralSystems.DEC, random)).toThrow(RangeError);
  });

  test('Длина выходного значения равна длине аргумента функции', () => {
    const targetLength = 5;
    expect(generateSecret(targetLength, NumeralSystems.DEC).length).toBe(targetLength);
  });

  test('Все символы соответствуют бинарной системе счисления', (hexChars = HEX_CHARS) => {
    const targetNumeralSystem = NumeralSystems.BIN;
    const possibleChars = hexChars.slice(0, targetNumeralSystem);
    const result = generateSecret(4, targetNumeralSystem);

    expect(result.every((elem) => possibleChars.includes(elem))).toBe(true);
  });

  test('Все символы соответствуют восьмеричной системе счисления', (hexChars = HEX_CHARS) => {
    const targetNumeralSystem = NumeralSystems.OCT;
    const possibleChars = hexChars.slice(0, targetNumeralSystem);
    const result = generateSecret(4, targetNumeralSystem);

    expect(result.every((elem) => possibleChars.includes(elem))).toBe(true);
  });

  test('Все символы соответствуют десятичной системе счисления', (hexChars = HEX_CHARS) => {
    const targetNumeralSystem = NumeralSystems.DEC;
    const possibleChars = hexChars.slice(0, targetNumeralSystem);
    const result = generateSecret(4, targetNumeralSystem);

    expect(result.every((elem) => possibleChars.includes(elem))).toBe(true);
  });

  test('Все символы соответствуют шестнадцатеричной системе счисления', (hexChars = HEX_CHARS) => {
    const targetNumeralSystem = NumeralSystems.HEX;
    const possibleChars = hexChars.slice();
    const result = generateSecret(4, targetNumeralSystem);

    expect(result.every((elem) => possibleChars.includes(elem.toUpperCase()))).toBe(true);
  });

  test('Детерминированный random выдаёт одинаковый результат в двоичной системе', () => {
    const random = () => 0.5;
    const targetResult = ['1', '1', '1', '1'];

    expect(generateSecret(4, NumeralSystems.BIN, random)).toEqual(targetResult);
  });

  test('Детерминированный random выдаёт одинаковый результат в восьмеричной системе', () => {
    const random = () => 0.5;
    const targetResult = ['4', '4', '4', '4'];

    expect(generateSecret(4, NumeralSystems.OCT, random)).toEqual(targetResult);
  });

  test('Детерминированный random выдаёт одинаковый результат в десятичной системе', () => {
    const random = () => 0.5;
    const targetResult = ['5', '5', '5', '5'];

    expect(generateSecret(4, NumeralSystems.DEC, random)).toEqual(targetResult);
  });

  test('Детерминированный random выдаёт одинаковый результат в шестнадцатеричной системе', () => {
    const random = () => 0.5;
    const targetResult = ['8', '8', '8', '8'];

    expect(generateSecret(4, NumeralSystems.HEX, random)).toEqual(targetResult);
  });
});
