# Soluna

In a standard game of Soluna, two players Alice and Bob --- the first and second players respectively --- take turns combining stacks of tokens. The game begins by randomly choosing one of four symbol for each token and setting the tokens out each in their own stack. The *label* of each stack is the symbol on its top-most token. The *height* of a stack is its number of tokens. Players take turn combining two stacks of the same label or height. When combining two stacks with the same height, the player can choose the top-most token of the new stack to be the top-most token of either constituent stack. A player loses if they have no valid moves. Define the generalized game as *Soluna(k,n)* which has *n* tokens each showing one of *k* possible symbols *s_1, ..., s_k*. Standard Soluna is equivalent to *Soluna(4,12)*. For a fixed initial configuration with *n_i* tokens of symbol *s_i* for *i* in {1,2,...,k} we also define *Soluna(k, n_1, ..., n_k)*. Play standard Soluna on [Boardgame Arena](https://boardgamearena.com/gamepanel?game=soluna)!

We would like to answer the following questions about standard Soluna and *Soluna(n,k)*:
1. Given the initial board configuration, who is the winner?
2. Suppose we can determine the above, how should the winning player play so as to obtain their desired result?
3. Given that the initial distribution of the symbols is uniformly random over the four symbols, what is the probability that the first player wins any given game 
