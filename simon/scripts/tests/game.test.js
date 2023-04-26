// const { beforeAll } = require("@jest/globals");
const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game");

/**
 * @jest-environment jsdom
 */
beforeAll(() => {
    let fs=require("fs");
    let fileContents=fs.readFileSync("simon/index.html", "UTF-8");
    document.open();
    document.write(fileContents);
    document.close();
})


describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame array exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves array exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices array exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains the correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
})

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score=42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button3", "button4"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to 0", () => {
        expect(game.score).toEqual(0);
    });
    test("playerMoves should be empty", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    // test("currentGame should be empty", () => {
    //     expect(game.currentGame.length).toEqual(0);
    // });
    test("currentGame should have 1 move", () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test("element 'score' should display 0", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score=0;
        game.playerMoves = [];
        game.currentGame = [];
        addTurn();
    });
    afterEach(() => {
        game.score=0;
        game.playerMoves = [];
        game.currentGame = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toEqual(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain(game.currentGame[0] + "light");
    });
    test("showTurns should updates game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
});
