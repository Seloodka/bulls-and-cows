import { describe, expect, test } from '@jest/globals';
import { createDigitValidator } from '../src/core/createDigitValidator';
import { NumeralSystems } from '../src/types/game-constants';
describe('createDigitValidator', () => {
    test('Возвращает функцию', () => {
        expect(typeof createDigitValidator(NumeralSystems.DEC)).toBe('function');
    });
    test('Возвращает корректные значения для BIN системы', () => {
        const binaryValidator = createDigitValidator(NumeralSystems.BIN);
        expect(binaryValidator('0')).toBe(true);
        expect(binaryValidator('1')).toBe(true);
        expect(binaryValidator('2')).toBe(false);
        expect(binaryValidator('-1')).toBe(false);
        expect(binaryValidator('A')).toBe(false);
    });
    test('Возвращает корректные значения для OCT системы', () => {
        const octalValidator = createDigitValidator(NumeralSystems.OCT);
        expect(octalValidator('0')).toBe(true);
        expect(octalValidator('7')).toBe(true);
        expect(octalValidator('8')).toBe(false);
        expect(octalValidator('-1')).toBe(false);
        expect(octalValidator('A')).toBe(false);
    });
    test('Возвращает корректные значения для DEC системы', () => {
        const decimalValidator = createDigitValidator(NumeralSystems.DEC);
        expect(decimalValidator('0')).toBe(true);
        expect(decimalValidator('9')).toBe(true);
        expect(decimalValidator('10')).toBe(false);
        expect(decimalValidator('-1')).toBe(false);
        expect(decimalValidator('A')).toBe(false);
    });
    test('Возвращает корректные значения для HEX системы', () => {
        const hexadecimalValidator = createDigitValidator(NumeralSystems.HEX);
        expect(hexadecimalValidator('0')).toBe(true);
        expect(hexadecimalValidator('9')).toBe(true);
        expect(hexadecimalValidator('F')).toBe(true);
        expect(hexadecimalValidator('G')).toBe(false);
        expect(hexadecimalValidator('10')).toBe(false);
        expect(hexadecimalValidator('-1')).toBe(false);
    });
    test('Значения для HEX системы не зависят от регистра', () => {
        const hexadecimalValidator = createDigitValidator(NumeralSystems.HEX);
        expect(hexadecimalValidator('A')).toBe(true);
        expect(hexadecimalValidator('a')).toBe(true);
        expect(hexadecimalValidator('F')).toBe(true);
        expect(hexadecimalValidator('f')).toBe(true);
    });
});
