### Langton's Ant

This is my implementation of Langton's Ant in in Javascript using the P5.js library. Langton's ant is a two dimensional cellular automata system that dictates the rules of an ants movement on a grid. The ant is moved iteratively, with the grid being initialized as all 0's (white) and the first ants direction as up. on each iteration the ant turns left or right depending on the color of its current square, flips the color of the square, then moves forward one square. The simple rules of Langton's ant gives rise to complex behavior in which the ant progresses through three modes of behavior. 
- Simplicity: During the first few hundred moves the ants motion forms simple symmetric patterns
- Chaos: After a few hundred moves the ant traces a pseudo-random path forming a black a white blob until around 10,000 steps.
- Emergent order: After ~10,000 iterations (or ~2500 with 2 ants or immediately with 4) the ant begins to build an infinite repeating highway in a diagonal direction.

The ant loops back to the other end of the screen when an edge is reached. Speed and number of ants can be changed with sliders. When the number of ants is changed the grid is reset and the ants are restarted in the center.

To view simply download the project and open index.html

Author: Michael Gunn

Langton's Ant: https://en.wikipedia.org/wiki/Langton%27s_ant
