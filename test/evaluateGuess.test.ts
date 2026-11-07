import { describe, expect, test } from '@jest/globals';
import { evaluateGuess } from '../src/core/evaluateGuess';

describe('evaluateGuess', () => {
  test('Длины секретного и введённого чисел НЕ равны', () => {
    const secret = ['0', '1', '0'];
    const guess = '15115';

    expect(() => evaluateGuess(secret, guess)).toThrow(RangeError);
  });

  test('Секретное число не массив', () => {
    const secret = '5,5,5,5' as never;
    const guess = '544';

    expect(() => evaluateGuess(secret, guess)).toThrow(TypeError);
  });

  test('Для шестнадцатеричной системы регистр не имеет значения', () => {
    const secret = ['A', 'C', 'D'];
    const guess = 'ad5';

    expect(evaluateGuess(secret, guess)).toEqual({
      bulls: 1,
      cows: 1,
    });
  });

  test('Количество быков и коров соответствует', () => {
    const secret = ['0', '1', '0'];
    const guess = '100';

    expect(evaluateGuess(secret, guess)).toEqual({
      bulls: 1,
      cows: 2,
    });
  });

  test('Количество быков и коров соответствует', () => {
    const secret = ['6', '4', '2'];
    const guess = '735';

    expect(evaluateGuess(secret, guess)).toEqual({
      bulls: 0,
      cows: 0,
    });
  });

  test('Количество быков и коров соответствует', () => {
    const secret = ['F', 'A', '9'];
    const guess = 'FA9';

    expect(evaluateGuess(secret, guess)).toEqual({
      bulls: 3,
      cows: 0,
    });
  });
});
