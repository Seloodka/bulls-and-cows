import { NumberLengthRange, NumeralSystems } from '../types/game-constants';
import { createDigitValidator } from './createDigitValidator';
function checkAttributesForError(guess, length, base, lengthRange = NumberLengthRange, possibleNumeralSystems = NumeralSystems) {
    if (typeof guess !== 'string') {
        throw new TypeError(`Guess variable - ${guess} must be a string!`);
    }
    if (length < lengthRange.MIN_LENGTH || length > lengthRange.MAX_LENGTH) {
        throw new RangeError(`Длинна числа не должна быть меньше ${lengthRange.MIN_LENGTH} и больше ${lengthRange.MAX_LENGTH}`);
    }
    if (!Object.hasOwn(possibleNumeralSystems, base)) {
        throw new Error(`Введена недопустимая система счисления: ${base}`);
    }
}
function isValidGuess(guess, length, base) {
    checkAttributesForError(guess, length, base);
    if (guess.length !== length) {
        return false;
    }
    const validateCharByBase = createDigitValidator(base);
    return guess.split('').every((char) => validateCharByBase(char));
}
export { isValidGuess };
