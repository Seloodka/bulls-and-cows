import { startNewGame } from '../../game/gameState.js';
function enableLengthInputs() {
    const lengthInputs = document.querySelectorAll('input[name="length"]');
    lengthInputs.forEach((input) => input.removeAttribute('disabled'));
}
function disableInvalidLengthInputs() {
    const lengthInputs = document.querySelectorAll('input[name="length"]');
    lengthInputs.forEach((input, index) => {
        if (index === 0) {
            input.checked = true;
            return;
        }
        input.setAttribute('disabled', '');
    });
}
function handleNumeralSystemInputChange(event) {
    const input = event.currentTarget;
    if (input === null) {
        throw new Error();
    }
    if (input.value === '2') {
        disableInvalidLengthInputs();
    }
    else {
        enableLengthInputs();
    }
}
function handleFormSubmit(event) {
    const form = event.target;
    if (form === null) {
        throw new Error();
    }
    event.preventDefault();
    const formData = new FormData(event.target);
    const length = formData.get('length');
    const numeralSystem = formData.get('numeralSystem');
    if (length !== null && numeralSystem !== null) {
        startNewGame({ secretLength: Number(length), secretNumeralSystem: Number(numeralSystem) });
    }
}
function bindSettingsEvents(settingsSection) {
    const settingsForm = settingsSection.querySelector('.settings-form');
    const numeralSystemInputs = settingsSection.querySelectorAll('input[name="numeralSystem"]');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleFormSubmit);
    }
    numeralSystemInputs.forEach((input) => input.addEventListener('change', handleNumeralSystemInputChange));
}
export { bindSettingsEvents };
