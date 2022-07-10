const STAR = 's'
const MOON = 'm'
const SUN = 'o'
const COMET = 'c'

const board = document.getElementById('board')
const cellElements = document.querySelectorAll('[data-cell]')

startGame()

function startGame() {
    cellElements.forEach(cell => {
        const setSymbol = Math.floor(Math.random()*4)
        if (setSymbol < 1) {
            cell.classList.add(STAR)
        } else if (setSymbol < 2) {
            cell.classList.add(MOON)
        } else if (setSymbol < 3) {
            cell.classList.add(SUN)
        } else {
            cell.classList.add(COMET)
        }
        cell.addEventListener(click, handleClick, {once: true})
    })
    setBoardHoverClass()
}

function handleClick(e) {
    const cell = e.target
    const symbol = STAR
    placeMark(cell, symbol)
}

function placeMark(cell, symbol) {
    cell.classList.add(symbol)
}

function setBoardHoverClass() {
    board.classList.add(symbol)
}