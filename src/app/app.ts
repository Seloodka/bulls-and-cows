import { createScoresElementsFromData } from '../UI/scoreboard/renderScores';
import { createScoreBoardLayout } from '../UI/scoreboard/layout';
import { createSettingsLayout } from '../UI/settings/layout';

function initApp(): void {
  const pageMain = document.querySelector('main') as HTMLElement;
  const pageFooter = document.querySelector('.page-footer') as HTMLElement;

  const renderSettingsInElement = renderLayoutInsideElement(createSettingsLayout());
  const renderScoreBoardInElement = renderLayoutInsideElement(createScoreBoardLayout());

  if (pageMain !== null) renderSettingsInElement(pageMain);
  if (pageFooter !== null) renderScoreBoardInElement(pageFooter);
}

function prepareNewGame(): void {
  const pageMain = document.querySelector('main') as HTMLElement;
  const scoresWrapper = document.querySelector('.scores-wrapper') as HTMLElement;
  const gameSection = document.querySelector('.game-wrapper') as HTMLDivElement;

  if (pageMain === null) throw new Error();
  if (scoresWrapper === null) throw new Error();
  if (gameSection === null) throw new Error();

  const renderSettingsInElement = renderLayoutInsideElement(createSettingsLayout());
  gameSection.remove();
  renderSettingsInElement(pageMain);

  scoresWrapper.innerHTML = '';
  scoresWrapper.append(createScoresElementsFromData());
}

function renderLayoutInsideElement(layout: DocumentFragment): (renderElement: HTMLElement) => void {
  return (renderElement: HTMLElement): void => {
    renderElement.append(layout);
  };
}

export { initApp, prepareNewGame };
