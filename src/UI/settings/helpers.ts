type RadioButtonOptions = {
  nameAttributeValue: string;
  valueAttributeValue: string;
  isRequired: boolean;
};

function createRadioButtonWithOptions({
  nameAttributeValue,
  valueAttributeValue,
  isRequired,
}: RadioButtonOptions): HTMLInputElement {
  const radioInput = document.createElement('input');

  radioInput.setAttribute('type', 'radio');
  radioInput.setAttribute('name', `${nameAttributeValue}`);
  radioInput.setAttribute('value', `${valueAttributeValue}`);
  if (isRequired) radioInput.setAttribute('required', '');

  return radioInput;
}

export { createRadioButtonWithOptions };
