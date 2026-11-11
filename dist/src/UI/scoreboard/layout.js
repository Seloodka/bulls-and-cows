import { createScoresElementsFromData } from './renderScores';
function createScoreBoardLayout() {
    const scoreboardLayout = new DocumentFragment();
    const gameSection = document.createElement('section');
    const gameSectionTitle = document.createElement('h2');
    const scoresContainer = document.createElement('div');
    const scoresElements = createScoresElementsFromData();
    gameSection.classList.add('scoreboard-wrapper');
    gameSectionTitle.classList.add('section-title');
    scoresContainer.classList.add('scores-wrapper');
    gameSectionTitle.innerText = 'Scoreboard';
    scoresContainer.append(scoresElements);
    gameSection.append(gameSectionTitle, scoresContainer);
    scoreboardLayout.append(gameSection);
    return scoreboardLayout;
}
export { createScoreBoardLayout };
