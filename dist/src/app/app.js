import { createScoresElementsFromData } from '../UI/scoreboard/renderScores';
import { createScoreBoardLayout } from '../UI/scoreboard/layout';
import { createSettingsLayout } from '../UI/settings/layout';
function initApp() {
    const pageMain = document.querySelector('main');
    const pageFooter = document.querySelector('.page-footer');
    const renderSettingsInElement = renderLayoutInsideElement(createSettingsLayout());
    const renderScoreBoardInElement = renderLayoutInsideElement(createScoreBoardLayout());
    if (pageMain !== null)
        renderSettingsInElement(pageMain);
    if (pageFooter !== null)
        renderScoreBoardInElement(pageFooter);
}
function prepareNewGame() {
    const pageMain = document.querySelector('main');
    const scoresWrapper = document.querySelector('.scores-wrapper');
    const gameSection = document.querySelector('.game-wrapper');
    if (pageMain === null)
        throw new Error();
    if (scoresWrapper === null)
        throw new Error();
    if (gameSection === null)
        throw new Error();
    const renderSettingsInElement = renderLayoutInsideElement(createSettingsLayout());
    gameSection.remove();
    renderSettingsInElement(pageMain);
    scoresWrapper.innerHTML = '';
    scoresWrapper.append(createScoresElementsFromData());
}
function renderLayoutInsideElement(layout) {
    return (renderElement) => {
        renderElement.append(layout);
    };
}
export { initApp, prepareNewGame };
