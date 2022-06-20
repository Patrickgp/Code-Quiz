const highScoresList = document.getElementById('highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// this function will store the high scores within an empty array.
highScoresList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");