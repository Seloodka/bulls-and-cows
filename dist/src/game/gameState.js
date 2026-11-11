import { renderGuesses } from '../UI/game/renderGuesses';
import { evaluateGuess } from '../core/evaluateGuess';
import { generateSecret } from '../core/generateSecret';
import { isValidGuess } from '../core/isValidGuess';
import { NumeralSystems } from '../types/game-constants';
import { createGameLayout } from '../UI/game/layout';
import { addWinDataToLocalStorage } from './localStorage';
import { prepareNewGame } from '../app/app';
const gameStatus = {
    turns: 0,
    guesses: new Map(),
    secretLength: 0,
    secretNumeralSystem: 0,
    secret: [],
};
function updateGameStatus(updates) {
    Object.assign(gameStatus, updates);
}
function startNewGame({ secretLength, secretNumeralSystem }) {
    const pageMainElement = document.querySelector('main');
    const settingsLayout = document.querySelector('.settings-wrapper');
    const secretNumber = generateSecret(secretLength, secretNumeralSystem);
    if (pageMainElement) {
        pageMainElement.append(createGameLayout());
    }
    if (settingsLayout) {
        settingsLayout.remove();
    }
    updateGameStatus({
        secretLength,
        secretNumeralSystem,
        secret: secretNumber,
    });
    console.log(gameStatus);
}
function checkGuessValidity(guess, { secretLength, secretNumeralSystem } = gameStatus) {
    return isValidGuess(guess, secretLength, secretNumeralSystem);
}
function finishRound(guess, { turns, guesses, secret, secretLength } = gameStatus) {
    const guessesCopy = new Map(guesses);
    const lowerCaseGuess = guess.toLowerCase();
    const bullsAndCows = evaluateGuess(secret, guess);
    if (!guessesCopy.has(lowerCaseGuess)) {
        guessesCopy.set(lowerCaseGuess, `Bulls: ${bullsAndCows.bulls}, Cows: ${bullsAndCows.cows}`);
    }
    renderGuesses(guessesCopy);
    updateGameStatus({
        turns: turns + 1,
        guesses: guessesCopy,
    });
    if (bullsAndCows.bulls === secretLength) {
        endGameWithWin();
    }
}
function getNumeralSystemFromNumber(base, possibleNumeralSystems = NumeralSystems) {
    const numeralSystem = possibleNumeralSystems[base];
    if (numeralSystem === undefined)
        throw new Error(`Система счисления - ${base} является недопустимой`);
    return numeralSystem;
}
function endGameWithWin({ turns, secret, secretNumeralSystem, secretLength } = gameStatus) {
    const numeralSystem = getNumeralSystemFromNumber(secretNumeralSystem);
    addWinDataToLocalStorage({
        turns,
        secret: secret.join(''),
        secretLength,
        numeralSystem,
        date: new Date().toLocaleDateString(),
    });
    prepareNewGame();
}
export { startNewGame, checkGuessValidity, finishRound };
