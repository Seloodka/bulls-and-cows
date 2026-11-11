import { NumeralSystems } from '../types/game-constants';
function CheckBaseForError(base, possibleNumerals = NumeralSystems) {
    if (!Object.hasOwn(possibleNumerals, base)) {
        throw new Error(`Введена недопустимая система счисления: ${base}`);
    }
}
function createDigitValidator(base) {
    CheckBaseForError(base);
    const allAvailableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    const possibleChars = new Set(allAvailableChars.slice(0, base));
    return (char) => {
        return possibleChars.has(char.toLowerCase());
    };
}
export { createDigitValidator };
