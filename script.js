let timerVar;
let currentScore = 0;
let standardInterval = 500;
let columnStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let startTime = new Date().getTime();
let isGameActive = false;

document.getElementById("game-load-modal-opener").click();

// Initially keep the stop button disabled since game is not active
$("#stop").prop("disabled", true);

function startGame() {
    // Lets Clear The Intervals (if any are active) - This prevents the speed up bug on start button multiple click.
    clearInterval(timerVar);
    currentScore = 0;
    // Set the isGameActive flag to true
    isGameActive = true;
    standardInterval = 500;
    startTime = new Date().getTime();
    timerVar = setInterval(selectRandomCol, standardInterval);
    // Disable the start button so that user can't click on it again and again
    $("#start").prop("disabled", true);
    // Now enable the reset button
    $("#stop").prop("disabled", false);
}

function stopGame() {
    resetColumnStatus();
    resetColumnImages();
    clearInterval(timerVar);
    // Enable the start button again
    $("#start").prop("disabled", false);
    // Disable the reset button
    $("#stop").prop("disabled", true);
}

function selectRandomColumnNumber() {
    // Random number from 0 - 8 => for index of columnStatus
    const randomNumber = Math.floor(Math.random() * 9);          
    // Get all column index into an array that are still not handsigns
    const remainingCols = columnStatus.map((status, index) => {
        if (status === 0) {
            return index;
        }
    }).filter(value => typeof value === 'number');
    // Setep to randomize selection of column based on random number
    const randomRemainingCol = remainingCols[randomNumber % remainingCols.length];
    // Add 1 to convert 0-8 => 1-9 (columns names in HTML are from 1 to 9)
    return randomRemainingCol + 1;
}

function selectRandomCol() {
    let colNumber = selectRandomColumnNumber().toString();
    document.getElementById("img" + colNumber).src = "images/reaperDeathSeal" + colNumber + ".jpg";
    columnStatus[colNumber - 1] = 1;
    if (!columnStatus.filter((status) => status === 0).length) {
        setUserLost();
    }
}

function clickOnHighlightedColumn(colNumber) {
    if (columnStatus[colNumber - 1] === 0) {
        setUserLost();
        return;
    }
    currentScore = currentScore + 1;
    if (currentScore === 10) {
        standardInterval = 400;
        clearInterval(timerVar);
        timerVar = setInterval(selectRandomCol, standardInterval);
    } else if (currentScore === 30) {
        standardInterval = 300;
        clearInterval(timerVar);
        timerVar = setInterval(selectRandomCol, standardInterval);
    } else if (currentScore === 60) {
        standardInterval = 250;
        clearInterval(timerVar);
        timerVar = setInterval(selectRandomCol, standardInterval);
    }
    const timeNow = new Date();
    const totalTimeInSeconds = timeNow.getTime() / 1000 - startTime / 1000;

    document.getElementById("score").innerHTML = currentScore;
    document.getElementById("currentSpeed").innerHTML = (currentScore / totalTimeInSeconds).toFixed(3);
    document.getElementById("time").innerHTML = (totalTimeInSeconds).toFixed(3);
    document.getElementById("img" + colNumber).src = "images/itachiHandSign.jpg";
    columnStatus[colNumber - 1] = 0;
}

function resetColumnStatus() {
    columnStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function setUserLost() {
    clearInterval(timerVar);
    const isNewHighScore = isHighScore();    
    if (isNewHighScore) {
        document.getElementById("high-score").innerHTML = currentScore;
        document.getElementById("high-score-modal-opener").click();
        resetScoreFields();
        isGameActive = false;
        // Stop the game too, in order to reset it
        stopGame();
        return;
    }
    const totalTimeInSeconds = new Date().getTime() / 1000 - startTime / 1000;
    document.getElementById("lost-modal-score").innerHTML = currentScore;
    document.getElementById("lost-modal-clicks").innerHTML = (currentScore / totalTimeInSeconds).toFixed(3);
    document.getElementById("lost-modal-time").innerHTML =  (totalTimeInSeconds).toFixed(3);
    // If game is active then only show the score card / this was a bug that when game wasn't even active the user lost pop up was showing up
    if (isGameActive) {
        document.getElementById("lost-modal-opener").click();
    }
    resetScoreFields();
    isGameActive = false;
    // Stop the game too, in order to reset it
    stopGame();
}


function resetColumnImages() {
    for (let i = 1; i < 10; i = i + 1) {
        document.getElementById("img" + i).src = "images/itachiHandSign.jpg";
    }
}

function isHighScore() {
    const previousHighScore = window.localStorage.getItem('naruto-score');
    if  (currentScore > Number(previousHighScore)) {
        window.localStorage.setItem('naruto-score', currentScore);
        return true;
    } 
    return false;
}

function resetScoreFields() {
    document.getElementById("score").innerHTML = 0;
    document.getElementById("currentSpeed").innerHTML = 0;
    document.getElementById("time").innerHTML = 0;
}