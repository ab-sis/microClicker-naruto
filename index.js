let timerVar;
let currentScore = 0;
let standardInterval = 500;
let columnStatus = [0, 0, 0, 0 ,0 ,0 ,0 ,0, 0];
let startTime = new Date().getTime();

document.getElementById("game-load-modal-opener").click();

function startGame() {
    currentScore = 0;
    standardInterval = 500;
    startTime = new Date().getTime();
    timerVar = setInterval(selectRandomCol, standardInterval)
}

function stopGame() {
    resetColumnStatus();
    resetColumnImages();
    clearInterval(timerVar);
}

function selectRandomColumnNumber() {
    const randomNumber = Math.floor(Math.random() * 10);
    if (columnStatus[randomNumber - 1] === 1) {
        return selectRandomColumnNumber()
    }
    return randomNumber;
}

function selectRandomCol() {
    let colNumber = selectRandomColumnNumber().toString();
    document.getElementById("img" + colNumber).src = "images/reaperDeathSeal" + colNumber + ".jpg";
    columnStatus[colNumber - 1] = 1;
    if (!columnStatus.filter(status => status === 0).length) {
        setUserLost()
    }
}

function clickOnHighlightedColumn(colNumber) {
    if (columnStatus[colNumber - 1] === 0) {
        setUserLost()
        return;
    }
    currentScore = currentScore + 1;
    if (currentScore === 10) {
        standardInterval = 400;
        clearInterval(timerVar);
        timerVar = setInterval(selectRandomCol, standardInterval)
    } else if (currentScore === 30) {
        standardInterval = 300;
        clearInterval(timerVar);
        timerVar = setInterval(selectRandomCol, standardInterval)
    } else if (currentScore === 60) {
        standardInterval = 250;
        clearInterval(timerVar);
        timerVar = setInterval(selectRandomCol, standardInterval)
    }
    const timeNow = new Date();
    const totalTimeInSeconds = (timeNow.getTime() / 1000) - (startTime / 1000);

    document.getElementById("score").innerHTML = currentScore;
    document.getElementById("currentSpeed").innerHTML = (currentScore/ totalTimeInSeconds);
    document.getElementById("time").innerHTML = (totalTimeInSeconds);
    document.getElementById("img" + colNumber).src = "images/itachiHandSign.jpg";
    columnStatus[colNumber - 1] = 0;
}

function resetColumnStatus() {
    columnStatus = [0, 0, 0, 0 ,0 ,0 ,0 ,0, 0];
}

function setUserLost() {
    clearInterval(timerVar);
    document.getElementById("lost-modal-score").innerHTML = currentScore;
    document.getElementById("lost-modal-opener").click();
}

function resetColumnImages() {
    for (let i = 1; i< 10; i = i + 1) {
        document.getElementById("img" + i).src = "images/itachiHandSign.jpg";
    }
}