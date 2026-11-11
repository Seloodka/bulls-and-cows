import { NumberLengthRange, NumeralSystems } from '../../types/game-constants';
import { bindSettingsEvents } from './events';
import { createRadioButtonWithOptions } from './helpers';
function createNumericSystemsInputs(possibleNumeralSystems = NumeralSystems) {
    const numeralSystemEntries = Object.entries(possibleNumeralSystems).filter(([key]) => isNaN(Number(key)));
    const inputsFieldset = document.createElement('fieldset');
    const inputsFieldsetLegend = document.createElement('legend');
    const numeralSystemsInputs = numeralSystemEntries.map(([systemName, systemLength], index) => {
        const inputLabel = document.createElement('label');
        const lengthInput = createRadioButtonWithOptions({
            nameAttributeValue: 'numeralSystem',
            valueAttributeValue: `${systemLength}`,
            isRequired: true,
        });
        inputLabel.innerText = `${systemName}`;
        if (index === 0)
            lengthInput.setAttribute('checked', '');
        inputLabel.append(lengthInput);
        return inputLabel;
    });
    inputsFieldset.classList.add('settings-form__numeral-field');
    inputsFieldsetLegend.innerText = 'Numeral system';
    inputsFieldset.append(inputsFieldsetLegend, ...numeralSystemsInputs);
    return inputsFieldset;
}
function createLengthInputs(lengthRange = NumberLengthRange) {
    const inputsCount = lengthRange.MAX_LENGTH - lengthRange.MIN_LENGTH + 1;
    const inputsFieldset = document.createElement('fieldset');
    const inputsFieldsetLegend = document.createElement('legend');
    const lengthInputs = Array.from({ length: inputsCount }, (_, index) => {
        const currentLengthInput = lengthRange.MIN_LENGTH + index;
        const inputLabel = document.createElement('label');
        const lengthInput = createRadioButtonWithOptions({
            nameAttributeValue: 'length',
            valueAttributeValue: `${currentLengthInput}`,
            isRequired: true,
        });
        inputLabel.innerText = `${currentLengthInput}`;
        if (index === 0)
            lengthInput.setAttribute('checked', '');
        else
            lengthInput.setAttribute('disabled', '');
        inputLabel.append(lengthInput);
        return inputLabel;
    });
    inputsFieldset.classList.add('settings-form__length-field');
    inputsFieldsetLegend.innerText = 'Length';
    inputsFieldset.append(inputsFieldsetLegend, ...lengthInputs);
    return inputsFieldset;
}
function createSettingsForm() {
    const settingsForm = document.createElement('form');
    const lengthInputsFieldset = createLengthInputs();
    const numeralSystemsInputs = createNumericSystemsInputs();
    const startGameButton = document.createElement('button');
    startGameButton.innerText = 'Start Game';
    startGameButton.classList.add('settings-form__submit-button');
    startGameButton.setAttribute('type', 'submit');
    settingsForm.classList.add('settings-form');
    settingsForm.append(lengthInputsFieldset, numeralSystemsInputs, startGameButton);
    return settingsForm;
}
function createSettingsLayout() {
    const settingLayout = new DocumentFragment();
    const settingsSection = document.createElement('section');
    const sectionTitle = document.createElement('h2');
    const sectionForm = createSettingsForm();
    settingsSection.classList.add('settings-wrapper');
    sectionTitle.classList.add('section-title');
    sectionTitle.innerText = 'Settings';
    settingsSection.append(sectionTitle, sectionForm);
    settingLayout.append(settingsSection);
    bindSettingsEvents(settingsSection);
    return settingLayout;
}
export { createSettingsLayout };
