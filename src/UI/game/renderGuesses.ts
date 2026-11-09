function renderGuesses(): void {
  const guessContainer = document.createElement('div');
  const currentGuess = document.createElement('span');
  const guessBullsAndCows = document.createElement('span');

  guessContainer.classList.add('game-guesses__guess');
  currentGuess.innerText = 'guess';
  guessBullsAndCows.innerText = 'Bulls: 0, Cows: 0';
}

export { renderGuesses };
