const Gameboard = (function() {
    const gameState = [[" ", " ", " "],
                       [" ", " ", " "],
                       [" ", " ", " "]];


    function displayBoard() {
        console.log(`${gameState[0][0]} | ${gameState[0][1]} | ${gameState[0][2]}\n---------\n${gameState[1][0]} | ${gameState[1][1]} | ${gameState[1][2]}\n---------\n${gameState[2][0]} | ${gameState[2][1]} | ${gameState[2][2]}`);
    }


    function updateBoard(symbol, pos1, pos2) {
        if ((0 <= pos1 && pos1 <= 2) && (0 <= pos1 && pos1 <= 2)) {
            gameState[pos1][pos2] = symbol;
            return true;
        }
        console.log("ERROR");
        return false;
    }


    function checkBoard() {
        // check rows
        for (let row = 0; row < gameState.length; row++) {
            if ((gameState[row][0] !== " ") && (gameState[row][0] === gameState[row][1] && gameState[row][1] === gameState[row][2])) {
                return true;
            }
        }

        // check columns
        for (let column = 0; column < gameState.length; column++) {
            if ((gameState[0][column] !== " ") && (gameState[0][column] === gameState[1][column] && gameState[1][column] === gameState[2][column])) {
                return true;
            }
        }

        // check diagonals
        if ((gameState[0][0] !== " ") && (gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2])) {
            return true;
        } else if ((gameState[0][2] !== " ") && (gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0])) {
            return true;
        }

        return false;
    }

    return {displayBoard, updateBoard, checkBoard};
})();

const Player = (function(symbol) {
    return {symbol};
})

const player1 = Player("x");
const player2 = Player("o");