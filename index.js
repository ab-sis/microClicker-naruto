let timerVar;
let currentScore = 0;
let standardInterval = 500;
let columnStatus = [0, 0, 0, 0 ,0 ,0 ,0 ,0, 0]

function startGame() {
    currentScore = 0;
    timerVar = setInterval(selectRandomCol, standardInterval)
}

function stopGame() {
    clearInterval(timerVar);
}

function selectRandomColumnNumber() {
    return Math.floor(Math.random() * 10);
}

function selectRandomCol() {
    let colNumber = selectRandomColumnNumber().toString();
    document.getElementById("col" + colNumber).style.backgroundColor = "blue";
    document.getElementById("img" + colNumber).src = "images/reaperDeathSeal" + colNumber + ".jpg";
    columnStatus[colNumber - 1] = 1;
    if (!columnStatus.filter(status => status === 0).length) {
        
    }
}

function clickOnHighlightedColumn(colNumber) {
    if (document.getElementById("col" + colNumber).style.backgroundColor !== 'blue') {
        document.getElementById("col" + colNumber ).style.backgroundColor = "red";
        alert('you lost')
        alert("your score was" + "    " + currentScore)
        clearInterval(timerVar);
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

    document.getElementById("score").innerHTML = currentScore;
    document.getElementById("currentSpeed").innerHTML = standardInterval;
    document.getElementById("col" + colNumber).style.removeProperty('background-color');
    document.getElementById("img" + colNumber).src = "images/reaperDeathSeal.jpg";
    
}

function resetColumnStatus() {
    columnStatus = [0, 0, 0, 0 ,0 ,0 ,0 ,0, 0];
}

function setUserLost() {
    alert('you lost')
    alert("your score was" + "    " + currentScore)
    clearInterval(timerVar);
}