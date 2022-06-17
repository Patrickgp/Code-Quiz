const startingTime = 10;
const start = document.getElementById("start-button")
let time = startingTime * 60;


const count = document.getElementById("countdown");
setInterval(updateTimer, 1000)

// Updates the timer to achieve countdown. Will stop at zero.
function updateTimer() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    count.innerHTML = `${minutes}:${seconds}`
    time--

    if (minutes <= 0 && seconds <= 00) {
        clearInterval(time = 0);
    }
}

