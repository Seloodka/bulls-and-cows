function sortScoreboardGameData(gameData) {
    return gameData.toSorted((game1, game2) => game1.turns - game2.turns);
}
function addWinDataToLocalStorage(gameDataToSave) {
    const scoreboard = localStorage.getItem('scoreboard');
    if (scoreboard === null) {
        localStorage.setItem('scoreboard', JSON.stringify([gameDataToSave]));
        return;
    }
    const newScoreboard = JSON.parse(scoreboard);
    newScoreboard.push(gameDataToSave);
    const sortedScoreboard = sortScoreboardGameData(newScoreboard);
    localStorage.setItem('scoreboard', JSON.stringify(sortedScoreboard));
}
function getScoresData() {
    const scoresData = localStorage.getItem('scoreboard');
    if (scoresData === null)
        return [];
    return JSON.parse(scoresData);
}
export { addWinDataToLocalStorage, getScoresData };
