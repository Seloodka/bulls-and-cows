import { getScoresData } from '../../game/localStorage';

function createScoresElementsFromData(): DocumentFragment {
  const scoreElements = new DocumentFragment();
  const scoresData = getScoresData();

  if (scoresData.length === 0) {
    const noScoresDataElement = document.createElement('span');
    noScoresDataElement.innerText = 'No scores for now';

    scoreElements.append(noScoresDataElement);
    return scoreElements;
  }

  scoresData.forEach((gameData) => {
    const scoreWrapper = document.createElement('div');
    const turnsElement = document.createElement('span');
    const secretElement = document.createElement('span');
    const numeralSystemElement = document.createElement('span');
    const lengthElement = document.createElement('span');
    const dateElement = document.createElement('span');

    turnsElement.innerText = `Turns: ${gameData.turns}`;
    secretElement.innerText = `Secret: ${gameData.secret}`;
    numeralSystemElement.innerText = `Num System: ${gameData.numeralSystem}`;
    lengthElement.innerText = `Length: ${gameData.secretLength}`;
    dateElement.innerText = `Date: ${gameData.date}`;

    scoreWrapper.classList.add('scores-wrapper__score');
    scoreWrapper.append(turnsElement, numeralSystemElement, lengthElement, dateElement);
    scoreElements.append(scoreWrapper);
  });

  return scoreElements;
}

export { createScoresElementsFromData };
