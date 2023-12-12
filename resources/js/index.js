import * as soluna from './soluna.js';

const endMessageElement = document.getElementById('endMessage');
const endMessageText = document.querySelector('[data-end-message-text]');
const restartButton = document.getElementById('restartButton');
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-index]');
let stackSize, symbols;

let hasClicked = false;
let clickedCell = null;

startGame();
restartButton.addEventListener('click', startGame);
board.addEventListener('click', clickHandler);

function startGame() {
    stackSize = [];
    symbols = [];
    cells.forEach(cell => {
        let setSymbol = Math.floor(Math.random()*4);
        let symbol;
        if (setSymbol < 1) {
            symbol = soluna.STAR;
        } else if (setSymbol < 2) {
            symbol = soluna.MOON;
        } else if (setSymbol < 3) {
            symbol = soluna.SUN;
        } else {
            symbol = soluna.COMET;
        }
        cell.classList.add(symbol);
        symbols.push(symbol);
        stackSize.push(1);
        cell.innerHTML = "1";
    })
    endMessageElement.classList.remove('show');
    testSoluna();
    //let secondPlayerWins = soluna.solveGame(symbols);
    //if (secondPlayerWins) {
    //    aiMoves();
    //}
}

function clickHandler(e) {
    let cell = e.target;
    let currIndex = cell.dataset.index;
    if (stackSize[currIndex] === 0){
        return;
    }
    if (!hasClicked) {
        hasClicked = true;
        clickedCell = cell;
        //console.log(clickedCell.dataset.index);
    } else {
        let prevIndex = clickedCell.dataset.index;
        let sameHeight = stackSize[currIndex] === stackSize[prevIndex];
        let sameSymbol = symbols[currIndex] === symbols[prevIndex];
        if (currIndex !== prevIndex && (sameHeight || sameSymbol)) {
            stackSize[currIndex] += stackSize[prevIndex];
            stackSize[prevIndex] = 0;
            cell.innerHTML = stackSize[currIndex];
            cell.classList.remove(symbols[currIndex]);
            cell.classList.add(symbols[prevIndex]);
            clickedCell.classList.remove(symbols[prevIndex]);
            clickedCell.innerHTML = "";
            symbols[currIndex] = symbols[prevIndex];
            symbols[prevIndex] = null;
        }
        clickedCell = null;
        hasClicked = false;
        aiMoves();
    }
}

function aiMoves() {
    if (soluna.checkWin(symbols, stackSize)){
        endGame(true);
    }

    if (soluna.checkWin(symbols, stackSize)){
        endGame(false);
    }
}

function endGame(win) {
    endMessageText.innerHTML = win ? 'You Win!': 'You Lose.';
    endMessageElement.classList.add('show');
}

function setBoardHoverClass() {

}

function testSoluna(){
    let symbols = [];
    //console.log(`0 x A, 0 x B: second player win.`);
    //console.assert(soluna.solveGame(symbols) === false);

    // symbols = [soluna.MOON, soluna.MOON, soluna.MOON, soluna.MOON, soluna.MOON];
    // console.log("0 x A, 5 x B: first player win.");
    // console.assert(soluna.solveGame(symbols) === false);

    // symbols = [soluna.COMET, soluna.MOON, soluna.MOON, soluna.MOON, soluna.MOON];
    // console.log("1 x A, 4 x B: second player win.");
    // console.assert(soluna.solveGame(symbols) === true);

    // symbols = [soluna.COMET, soluna.COMET, soluna.COMET, soluna.COMET, soluna.MOON, soluna.MOON, soluna.MOON, soluna.MOON];
    // console.log("4 x A, 4 x B: second player win");
    // console.assert(soluna.solveGame(symbols) === false);

    console.log("3 x A, 4 x B: first player win");
    symbols = [soluna.COMET, soluna.COMET, soluna.COMET, soluna.MOON, soluna.MOON, soluna.MOON, soluna.MOON];
    console.assert(soluna.solveGame(symbols) === true);
}