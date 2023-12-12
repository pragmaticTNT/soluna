import { nSymbols, nTokens } from "./soluna.js";

class Move {
    constructor(s1, h1, s2, h2) {
        this.s1 = s1; // symbol of first stack
        this.h1 = h1; // height of first stack
        this.s2 = s2; // symbol of second stack
        this.h2 = h2; // height of second stack
    }
}

export class Board {
    constructor(piles) {
        this.piles = piles;
    }

    encode() {
        let output = '';
        for (let p of this.piles) {
            output += p.toString();
            output += '\n';
        }
        return output;
    }

    validMoves() {
        let moves = [];
        // same height different top symbol
        for (let h = 1; h <= nTokens; h++) {
            for (let i = 0; i < nSymbols; i++) {
                for (let j = i+1; j < nSymbols; j++) {
                    if (this.piles[i][h] > 0 && this.piles[j][h] > 0) {
                        let move1 = new Move(i, h, j, h);
                        let move2 = new Move(j, h, i, h);
                        moves.push(move1);
                        moves.push(move2);
                    }
                }
            }
        }
        console.log(this.encode());
        // same top symbol
        for (let s = 0; s < nSymbols; s++) {
            for (let i = 1; i <= nTokens; i++) {
                if (this.piles[s][i] >= 2) {
                    let move = new Move(s, i, s, i);
                    moves.push(move);
                }
                for (let j = i+1; j <= nTokens; j++) {
                    if (this.piles[s][i] > 0 && this.piles[s][j] > 0){
                        let move = new Move(s, i, s, j);
                        moves.push(move);
                    }
                }
            }
        }
        return moves;
    }

    makeMove(move) {
        this.piles[move.s1][move.h1+move.h2]++;
        this.piles[move.s1][move.h1]--;
        this.piles[move.s2][move.h2]--;
        console.assert(
            this.piles[move.s1][move.h1] >= 0 &&
            this.piles[move.s2][move.h2] >= 0,
            `${move.s2}: ${move.h2} to ${move.s1}: ${move.h1} result in ${this.piles[move.s1][move.h1]}, ${this.piles[move.s2][move.h2]}, and ${this.piles[move.s1][move.h1+move.h2]}.`);
    }
}