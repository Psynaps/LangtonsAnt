// Langton's Ant
// @Michael Gunn


let resolution = 10;
const ANTUP = 0;
const ANTRIGHT = 1;
const ANTDOWN = 2;
const ANTLEFT = 3;

let grid;
let ants;

let speedSlider, numAntsSlider;
let speedLabel, numAntsLabel;
let iterations;
let iterLabel;

// 2 Ants creates infinite behavior ~ 2500 iterations

function setup() {
    createCanvas(800, 600);
    cols = floor(width / resolution);
    rows = floor((height - 40) / resolution);
    grid = make2DArray(cols, rows);

    speedSlider = createSlider(5, 500, 500, 5);
    speedSlider.position(55, height + 15);
    speedLabel = createP('Speed:');
    speedLabel.position(5, height);

    numAntsSlider = createSlider(1, 4, 1, 1);
    numAntsSlider.position(55, height + 50);
    numAntsSlider.changed(restart)
    numAntsLabel = createP('Ants:');
    numAntsLabel.position(5, height + 35);

    numAnts = numAntsSlider.value();
    ants = [numAnts];
    iterations = 0;

    for (let i = 0; i < numAnts; i++) {
        ants[i] = new Ant(floor(cols / 2), floor(rows / 2), i * 2 % 4);
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }

}

function draw() {
    frameRate(speedSlider.value());
    background(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            stroke(0);
            noFill();
            if (grid[i][j] == 0) {
                fill(255);
            } else if (grid[i][j] == 1) {
                fill(0);
            } else {
                console.log('invalid grid value');
            }
            rect(x, y, resolution, resolution);
        }
    }
    for (let i = 0; i < ants.length; i++) {
        ants[i].show();
        ants[i].update();
    }
    iterations++;
    // stroke(0, 0, 255);
    fill(0);
    textSize(20);
    text('Iterations: ' + iterations, 5, height - 10);
}

// Grid is reset and ants are reinitialized whenever number of ants slider value is changed
function restart() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // grid[i][j] = floor(random(2));
            grid[i][j] = 0;
        }
    }
    for (let i = 0; i < numAntsSlider.value(); i++) {
        ants[i] = new Ant(floor(cols / 2), floor(rows / 2), i * 2 % 4);
    }
}

class Ant {
    constructor(x, y, dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
    }
    update() {
        if (grid[this.x][this.y] == 0) {
            this.dir = (this.dir + 1) % 4; // Turn 90* clockwise
        } else { // If ant is on a black square turn 90* left, flip the color of the square, and move forward one unit
            this.dir = (this.dir + 3) % 4; // Turn 90* ccw
        }
        grid[this.x][this.y] = (grid[this.x][this.y] == 0) ? 1 : 0; // Flip the color of the square
        switch (this.dir) { //Move forward one in the direction that the ant is traveling
            case ANTUP: // Up
                this.y++;
                break;
            case ANTRIGHT: // Right
                this.x++;
                break;
            case ANTDOWN: // Down
                this.y--;
                break;
            case ANTLEFT: // Left
                this.x--;
                break;
        }
        // Make ant wrap around the edges if it goes off
        if (this.x >= cols) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = cols - 1;
        }
        if (this.y >= rows) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = rows - 1;
        }
    }
    show() {
        let x = this.x * resolution;
        let y = this.y * resolution;
        // stroke(255, 0, 0);
        fill(255, 0, 0);
        noStroke();
        ellipseMode(CENTER);
        ellipse(x + resolution / 2, y + resolution / 2, resolution, resolution);


    }
}






// Creates a 2D array with the specified number of columns and rows, unitialized entries
// Grid indices will be (x, y) 
function make2DArray(cols, rows) {
    let arr = Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Array(rows);
    }
    return arr;
}