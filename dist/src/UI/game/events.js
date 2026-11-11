import { checkGuessValidity, finishRound } from '../../game/gameState';
function handleInputChange(event) {
    const input = event.target;
    if (input === null) {
        return;
    }
    const submitButton = document.querySelector('.game-form__submit-button');
    const isValid = checkGuessValidity(input.value);
    if (isValid) {
        input.classList.remove('invalid-input');
        submitButton?.removeAttribute('disabled');
    }
    else {
        input.classList.add('invalid-input');
        submitButton?.setAttribute('disabled', '');
        if ('key' in event && event.key === 'Enter') {
            event.preventDefault();
        }
    }
}
function handleFormSubmit(event) {
    const form = event.target;
    if (form === null) {
        throw new Error();
    }
    event.preventDefault();
    const formData = new FormData(event.target);
    const guess = formData.get('guess');
    finishRound(guess);
}
function bindGameEvents(gameSection) {
    const gameForm = gameSection.querySelector('.game-form');
    const input = gameSection.querySelector('input[type="text"]');
    if (gameForm !== null) {
        gameForm.addEventListener('submit', handleFormSubmit);
    }
    if (input !== null) {
        input.addEventListener('input', handleInputChange);
        input.addEventListener('keydown', handleInputChange);
    }
}
export { bindGameEvents };
