/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => { });

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
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect(game.turnInProgress).toEqual(false);
    });
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
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
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
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
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    // test("currentGame should be empty", () => {
    //     expect(game.currentGame.length).toEqual(0);
    // });
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for(let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
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
        lightsOn(game.currentGame[0]);
        let button = document.getElementById(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("showTurns should updates game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    // test("should call alert if move is wrong", () => {
    //     game.playerMoves.push("wrong");
    //     playerTurn();
    //     expect(window.alert).tobeCalledWith("Wrong move!");
    // });
    test("click during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});
