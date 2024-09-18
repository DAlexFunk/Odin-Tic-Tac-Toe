const Gameboard = (function() {
    let gameState = [[" ", " ", " "],
                     [" ", " ", " "],
                     [" ", " ", " "]];


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

    function resetState() {
        gameState = [[" ", " ", " "],
                     [" ", " ", " "],
                     [" ", " ", " "]];
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

    return {updateBoard, checkWin, checkTie, checkContinue, resetState};
})();


const Formatter = (function() {
    function setSymbol(target, symbol) {
        target.textContent = symbol;
        target.setAttribute("class", "cell");
    }

    function resetBoard() {
        cells.forEach((cell) => {
            cell.setAttribute("class", "cell empty");
            cell.textContent = "";
        })
    }

    return {setSymbol, resetBoard};
})();


const Player = function(symbol, name) {    
    return {symbol, name};
}


function playRound(evt) {
    const currentDiv = document.elementFromPoint(evt.clientX, evt.clientY);
    let classList = currentDiv.className;


    if (!classList.includes("cell")) {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    } else if (!Gameboard.updateBoard(currentPlayer.symbol, parseInt(currentDiv.getAttribute("pos1")), parseInt(currentDiv.getAttribute("pos2")))) {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    } else {
        Formatter.setSymbol(currentDiv, currentPlayer.symbol);
        currentDiv.setAttribute("class", "cell");
    }


    if (!Gameboard.checkContinue()) {
        document.removeEventListener("click", playRound);
        document.removeEventListener("mouseover", displayGhostOnHover);

        if (Gameboard.checkWin()) {
            dialogBoxP.textContent = `${currentPlayer.name} Won`;
        } else {
            dialogBoxP.textContent = "It was a tie";
        }
        gameOverBox.showModal();
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;
}


function displayGhostOnHover(evt) {
    const currentDiv = document.elementFromPoint(evt.clientX, evt.clientY);
    let classText = currentDiv.className;
    function onMouseLeave() {
        let classText = currentDiv.className;
        if (classText.includes("empty")) {
            currentDiv.textContent = "";
        }

        currentDiv.removeEventListener("mouseover", displayGhostOnHover);
        currentDiv.removeEventListener("mouseout", onMouseLeave);
    }

    if (classText.includes("empty")) {
        currentDiv.textContent = currentPlayer.symbol;
        currentDiv.addEventListener("mouseout", onMouseLeave);
    }
}

function resetGame() {
    Gameboard.resetState();
    Formatter.resetBoard();

    player1.name = prompt("Enter player one's(x) name");
    player2.name = prompt("Enter player two's(o) name")

    document.addEventListener("click", playRound);
    document.addEventListener("mouseover", displayGhostOnHover);

    currentPlayer = player1;
}

const player1 = Player("X", prompt("Enter player one's(x) name"));
const player2 = Player("O", prompt("Enter player two'2(x) name"));

const gameOverBox = document.querySelector("dialog");
const dialogBoxP = document.querySelector("dialog div#playerWinText");
const dialogBoxClose = document.querySelector("dialog button");

const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector("header button");

let currentPlayer = player1;


dialogBoxClose.addEventListener("click", () => gameOverBox.close());

document.addEventListener("click", playRound);
document.addEventListener("mouseover", displayGhostOnHover);
resetButton.addEventListener("click", resetGame);