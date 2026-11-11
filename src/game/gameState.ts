import { renderGuesses } from '../UI/game/renderGuesses';
import { evaluateGuess } from '../core/evaluateGuess';
import { generateSecret } from '../core/generateSecret';
import { isValidGuess } from '../core/isValidGuess';
import { NumeralSystems } from '../types/game-constants';
import { createGameLayout } from '../UI/game/layout';
import { addWinDataToLocalStorage } from './localStorage';
import { prepareNewGame } from '../app/app';

interface GameSettings {
  secretLength: number;
  secretNumeralSystem: NumeralSystems;
}

interface GameStatus {
  turns: number;
  guesses: Map<string, string>;
  secretLength: number;
  secretNumeralSystem: number;
  secret: string[];
}

const gameStatus: GameStatus = {
  turns: 0,
  guesses: new Map<string, string>(),
  secretLength: 0,
  secretNumeralSystem: 0,
  secret: [],
};

function updateGameStatus(updates: Partial<GameStatus>): void {
  Object.assign(gameStatus, updates);
}

function startNewGame({ secretLength, secretNumeralSystem }: GameSettings): void {
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
}

function checkGuessValidity(guess: string, { secretLength, secretNumeralSystem } = gameStatus) {
  return isValidGuess(guess, secretLength, secretNumeralSystem);
}

function finishRound(guess: string, { turns, guesses, secret, secretLength } = gameStatus): void {
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

function getNumeralSystemFromNumber(base: number, possibleNumeralSystems = NumeralSystems): string {
  const numeralSystem = possibleNumeralSystems[base];
  if (numeralSystem === undefined) throw new Error(`Система счисления - ${base} является недопустимой`);

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
