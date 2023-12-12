from dataclasses import dataclass
import itertools as it
import matplotlib.pyplot as plt
import numpy as np

@dataclass
class Move:
    pile1: int
    pos1: int
    pile2: int
    pos2: int

class Board():
    def __init__(self, A):
        self.n = len(A)
        assert type(A) == list
        if all(isinstance(a, list) for a in A):
            self.piles = A
        else:
            assert all(isinstance(a,int) and a >= 0 for a in A)
            total = sum(A)
            self.piles = [[0 for _ in range(total+1)] for a in A]
            for i in range(self.n):
                self.piles[i][1] = A[i]
    def encode(self):
        temp = [tuple(self.piles[i]) for i in range(self.n)]
        return tuple(temp)
    def valid_moves(self):
        moves = []
        m = len(self.piles[0])
        ## SAME HEIGHT: different top symbol
        for i in range(m):
            pairs = it.combinations([j for j in range(self.n)],2)
            for p in pairs:
                j, k = p
                if self.piles[j][i] > 0 and self.piles[k][i] > 0:
                    move1 = Move(j, i, k, i)
                    move2 = Move(j, i, k, i)
                    moves.append(move1)
                    moves.append(move2)
        ## SAME TOP SYMBOL
        for i in range(self.n):
            for j in range(m):
                if self.piles[i][j] >= 2:
                    move = Move(i, j, i, j)
                    moves.append(move)
                for k in range(j+1, m):
                    if self.piles[i][j] > 0 and self.piles[i][k] > 0:
                        move = Move(i, j, i, k)
                        moves.append(move)
        return moves
    def make_move(self, m: type):
        assert self.piles[m.pile1][m.pos1] >= 1
        assert self.piles[m.pile2][m.pos2] >= 1
        self.piles[m.pile1][m.pos1 + m.pos2] += 1
        self.piles[m.pile1][m.pos1] -= 1
        self.piles[m.pile2][m.pos2] -= 1
        return
    def __str__(self):
        return "\n".join([f"{i}: {self.piles[i]}" for i in range(self.n)])

def soluna(board: type, memo: dict):
    enc_move = board.encode()
    if enc_move in memo:
        return memo[enc_move]
    moves = board.valid_moves()
    if len(moves) == 0:
        return False
    recover = [tuple(row) for row in board.piles]
    for move in moves:
        board.make_move(move)
        store_board = board.encode()
        if store_board in memo and not memo[store_board]:
            return True
        else:
            result = soluna(board, memo)
            memo[store_board] = result
            if not result:
                return True
        restore = [list(row) for row in recover]
        board = Board(restore)
    return False

def plot(file_name: str):
    m, n = 0, 0
    Z = np.zeros((0,0))
    with open(file_name) as f:
        line = f.readline()
        line = line.strip('\n')
        m, n = [int(w) for w in line.split()]
        Z = np.zeros((m,n))
        for i in range(m):
            line = f.readline()
            line = line.strip('\n')
            Z[i,:] = [int(w) for w in line.split()]
    x = np.arange(m)
    y = np.arange(n)
    _, ax = plt.subplots()
    ax.pcolormesh(x, y, Z, shading='auto')
    plt.show()
    return

def solve3(file_name: str, x_fixed: int, y: int, z: int):
    print("Computing results...")
    results = {}
    for i in range(z):
        for j in range(z):
            board = Board([x_fixed, i, j])
            memo = dict()
            result = soluna(board, memo)
            results[i,j] = 1 if result else 0
            results[j,i] = 1 if result else 0
    print("Done. Now generating file...")
    with open(file_name, 'w') as f:
        f.write(f"{y} {z}\n")
        for i in range(y):
            row = [results[i,j] for j in range(z)]
            row = ' '.join(str(w) for w in row)
            f.write(row + '\n')
    print("Done.")
    return

def solveStdSoluna():
    config = []
    for i in range(4):
        for j in range(i, 5):
            for k in range(j, 7):
                m = 12-i-j-k
                if m >= k:
                    config.append((i,j,k,m))
    for c in config:
        board = Board(list(c))
        memo = dict()
        print(f"{c}: {soluna(board, memo)}")

def solve(dim: int):
    board = Board(dim)
    memo = dict()
    result = soluna(board, memo)
    print(f"Board ({dim}): First player wins? {result}")

def main():
    assert solve([4,1]) == True
    #file_name = "soluna_output.txt"
    #m, n = (12, 12)
    #solve3(file_name, 4, m, n)
    #plot(file_name)
    #solveStdSoluna()

if __name__ == "__main__":
    main()