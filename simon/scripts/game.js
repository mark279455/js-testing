let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    choices: ["button1", "button2", "button3", "button4"]
};

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore();
    addTurn();
}

function showScore() {
    document.getElementById("score").innerText=game.score;
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() *4))]);
    showTurns();
}

function lightsOn(circ) {
    console.log("lightsOn circ = ", circ);
    console.log("document.getElementById(circ) = ", document.getElementById(circ));

    document.getElementById(circ).classList.add("light");
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns() {
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if(game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };
