import { NumberLengthRange, NumeralSystems } from '../types/game-constants';
function checkArgumentsForError(length, base, random = Math.random, lengthRange = NumberLengthRange) {
    if (length < lengthRange.MIN_LENGTH || length > lengthRange.MAX_LENGTH) {
        throw new RangeError(`Длинна числа не должна быть меньше ${lengthRange.MIN_LENGTH} и больше ${lengthRange.MAX_LENGTH}`);
    }
    if (!Object.hasOwn(NumeralSystems, base)) {
        throw new Error(`Введена недопустимая система счисления: ${base}`);
    }
    if (random() < 0 || random() > 1) {
        throw new RangeError('Выходные значения функции random находятся не в диапазоне от 0 до 1');
    }
}
function generateSecret(length, base, random = Math.random) {
    checkArgumentsForError(length, base, random);
    const allAvailableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    const possibleChards = allAvailableChars.slice(0, base);
    const generateRandomCharIndex = () => Math.floor(random() * base);
    const secret = Array.from({ length }, () => {
        const char = possibleChards[generateRandomCharIndex()];
        if (char) {
            return char;
        }
        throw new RangeError('Random сгенерировал индекс больше, чем существует возможных значений');
    });
    return secret;
}
export { generateSecret };
