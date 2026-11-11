function renderGuesses(guesses: Map<string, string>): void {
  const guessesContainer = document.querySelector('.game-guesses');
  if (!guessesContainer) throw new Error();

  guessesContainer.innerHTML = '';

  guesses.forEach((bullsAndCows, guess) => {
    const guessContainer = document.createElement('div');
    const currentGuess = document.createElement('span');
    const guessBullsAndCows = document.createElement('span');

    guessContainer.classList.add('game-guesses__guess');
    currentGuess.innerText = guess;
    guessBullsAndCows.innerText = bullsAndCows;

    guessContainer.append(currentGuess, guessBullsAndCows);
    guessesContainer.prepend(guessContainer);
  });
}

export { renderGuesses };
