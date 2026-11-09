function createGameForm(): HTMLFormElement {
  const gameForm = document.createElement('form');
  const inputLabel = document.createElement('label');
  const guessInput = document.createElement('input');
  const submitButton = document.createElement('button');

  gameForm.classList.add('game-form');
  inputLabel.innerText = 'Enter your guess';

  guessInput.setAttribute('type', 'text');
  guessInput.setAttribute('name', 'guess');
  guessInput.setAttribute('required', '');

  submitButton.classList.add('game-form__submit-button');
  submitButton.setAttribute('type', 'submit');
  submitButton.innerText = 'Submit guess';

  inputLabel.append(guessInput);
  gameForm.append(inputLabel, submitButton);
  return gameForm;
}

function createGameLayout(): DocumentFragment {
  const gameLayout = new DocumentFragment();
  const gameSection = document.createElement('section');
  const gameSectionTitle = document.createElement('h2');
  const gameForm = createGameForm();
  const guessesContainer = document.createElement('div');

  gameSection.classList.add('game-wrapper');
  gameSectionTitle.classList.add('section-title');
  gameSectionTitle.innerText = 'Game';

  guessesContainer.classList.add('game-guesses');

  gameSection.append(gameSectionTitle, gameForm, guessesContainer);
  gameLayout.append(gameSection);
  return gameLayout;
}

export { createGameLayout };
