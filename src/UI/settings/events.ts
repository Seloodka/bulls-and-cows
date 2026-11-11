import { startNewGame } from '../../game/gameState';

function enableLengthInputs(): void {
  const lengthInputs = document.querySelectorAll<HTMLInputElement>('input[name="length"]');

  lengthInputs.forEach((input) => input.removeAttribute('disabled'));
}

function disableInvalidLengthInputs(): void {
  const lengthInputs = document.querySelectorAll<HTMLInputElement>('input[name="length"]');

  lengthInputs.forEach((input, index) => {
    if (index === 0) {
      input.checked = true;
      return;
    }

    input.setAttribute('disabled', '');
  });
}

function handleNumeralSystemInputChange(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  if (input === null) {
    throw new Error();
  }

  if (input.value === '2') {
    disableInvalidLengthInputs();
  } else {
    enableLengthInputs();
  }
}

function handleFormSubmit(event: SubmitEvent): void {
  const form = event.target;
  if (form === null) {
    throw new Error();
  }
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const length = formData.get('length');
  const numeralSystem = formData.get('numeralSystem');

  if (length !== null && numeralSystem !== null) {
    startNewGame({ secretLength: Number(length), secretNumeralSystem: Number(numeralSystem) });
  }
}

function bindSettingsEvents(settingsSection: HTMLElement): void {
  const settingsForm = settingsSection.querySelector('.settings-form') as HTMLFormElement;
  const numeralSystemInputs = settingsSection.querySelectorAll<HTMLInputElement>('input[name="numeralSystem"]');

  if (settingsForm) {
    settingsForm.addEventListener('submit', handleFormSubmit);
  }

  numeralSystemInputs.forEach((input) => input.addEventListener('change', handleNumeralSystemInputChange));
}

export { bindSettingsEvents };
