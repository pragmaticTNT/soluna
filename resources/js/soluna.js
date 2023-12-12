import {Board} from './board.js';

export const STAR = 'star';
export const MOON = 'moon';
export const SUN = 'sun';
export const COMET = 'comet';
export const symbolIndex = ['star', 'moon', 'sun', 'comet'];

export const nSymbols = 4;
export const nTokens = 12;

export function solveGame(symbols) {
    let memo = new Map();
    let board = getBoard(symbols);
    let solution = soluna(board, memo);
    console.log(`First player wins: ${solution}.`);
    return solution;
}

function getBoard(symbols){
    let piles = [];
    for (let i = 0; i < nSymbols; i++) {
        let row = new Array(nTokens+1).fill(0);
        piles.push(row);
    }
    for (let s of symbols){
        piles[symbolIndex.indexOf(s)][1]++;
    }
    //console.log(piles.toString());

    let board = new Board(piles);
    return board;
}

function soluna(board, memo){
    let enc_move = board.encode();
    // if (memo.has(enc_move)) {
    //     console.log(`move encoded.`)
    //     return memo.get(enc_move);
    // }
    let moves = board.validMoves();
    for (let move of moves){
        console.log(`${move.s2}: ${move.h2} to ${move.s1}: ${move.h1}`);
    }
    if (moves.length === 0) {
        return false;
    }
    let recover = new Array(nSymbols);
    for (let i = 0; i < nSymbols; i++){
        recover[i] = [...board.piles[i]];
    }
    // console.log(`memo size: ${memo.size}`);
    // for (let key of memo.keys()){
    //     console.log(`key:\n${key}\nvalue: ${memo.get(key)}`);
    // }

    for (let move of moves) {
        console.log(`Board inside:\n${enc_move}`);
        board.makeMove(move);
        let storeBoard = board.encode();
        if (!memo.has(storeBoard)){
            let result = soluna(board, memo);
            memo.set(storeBoard, result);
            if (!result) {
                return true;
            }
        } else if (!memo.get(storeBoard)) {
            return true;
        }
        board = new Board(recover);
        console.log(`Board outside:\n${enc_move}`);
    }
    return false;
}

export function checkWin(symbols, stackSize) {
    // Symbols are [star, moon, sun, comet]
    const foundSymbol = new Array(nSymbols).fill(0);
    const foundHeight = new Array(nTokens).fill(0);
    for (let c of symbols) {
        if (c !== null) {
            foundSymbol[symbolIndex.indexOf(c)]++;
        }
    }

    for (let h of stackSize) {
        if (h > 0) {
            foundHeight[h]++;
        }
    }

    function canStack(count){
        return count > 1 ? true : false;
    }
    return !(foundSymbol.some(canStack) || foundHeight.some(canStack));
}