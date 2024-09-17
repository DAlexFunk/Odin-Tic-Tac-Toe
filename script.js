const Gameboard = (function() {
    const gameState = [[" ", " ", " "],
                       [" ", " ", " "],
                       [" ", " ", " "]];


    function displayBoard() {
        console.log(`${gameState[0][0]} | ${gameState[0][1]} | ${gameState[0][2]}\n---------\n${gameState[1][0]} | ${gameState[1][1]} | ${gameState[1][2]}\n---------\n${gameState[2][0]} | ${gameState[2][1]} | ${gameState[2][2]}`);
    }


    function updateBoard(symbol, pos1, pos2) {
        if ((0 > pos1 || pos1 > 2) || (0 > pos2 || pos2 > 2)) {
            // Spot out of range
            return false;
        } else if (gameState[pos1][pos2] !== " ") {
            // Already a symbol there
            return false;
        }

        gameState[pos1][pos2] = symbol;
        return true;
    }


    function checkWin() {
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

    function checkTie() {
        if (checkWin()) {
            return false;
        }

        for (let row = 0; row < gameState.length; row++) {
            for (let column = 0; column < gameState.length; column++) {
                if (gameState[row][column] === " ") {
                    return false;
                }
            }
        }

        return true;
    }


    function checkContinue() {
        return !checkTie() && !checkWin();
    }

    return {displayBoard, updateBoard, checkWin, checkTie, checkContinue};
})();

const Formatter = (function() {
    function setSymbol(target, symbol) {
        target.textContent = symbol;
        target.setAttribute("class", "cell");
    }

    return {setSymbol};
})();

const Player = function(symbol, name) {
    return {symbol, name};
}

const player1 = Player("x", "Alex");
const player2 = Player("o", "Christian");

const dialogBox = document.querySelector("dialog");
const dialogBoxP = document.querySelector("dialog div#playerWinText");
const dialogBoxClose = document.querySelector("dialog button");

let currentPlayer = player2;

function playRound(evt) {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    const currentDiv = document.elementFromPoint(evt.clientX, evt.clientY);
    let classList = currentDiv.className;

    if (classList.includes("cell")) {
        Formatter.setSymbol(currentDiv, currentPlayer.symbol);
        Gameboard.updateBoard(currentPlayer.symbol, parseInt(currentDiv.getAttribute("pos1")), parseInt(currentDiv.getAttribute("pos2")));
    } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    if (!Gameboard.checkContinue()) {
        document.removeEventListener("click", playRound);

        if (Gameboard.checkWin()) {
            dialogBoxP.textContent = `${currentPlayer.name} Won`;
        } else {
            dialogBoxP.textContent = "It was a tie";
        }
        dialogBox.showModal();
    }
}

document.addEventListener("click", playRound);
dialogBoxClose.addEventListener("click", () => dialogBox.close());