function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

const cols = 8;
const rows = 8;
const w = 50;
let previous;

function setup() {
	createCanvas(windowWidth, windowHeight);
	createCanvas(401, 401);
	grid = make2DArray(cols, rows);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}
	setupGame();
}

function draw() {
	background(255);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
}

function mousePressed() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				if (previous == undefined) {
					previous = grid[i][j];
				} else {
					if (previous == grid[i][j]) {
						previous = undefined;
					} else if (previous.isPossibleMove(grid[i][j])) {
						previous.clicked();
						previous.playerMove(grid[i][j]);
						//console.log('bpoint: ' + bpoint + ' wpoint: ' + wpoint);
						previous = undefined;
					} else {
						previous.clicked();
						previous = grid[i][j];
					}
				}
				grid[i][j].clicked();
			}
		}
	}
}

function setupGame() {
	grid[0][0].hasPiece = true;
	grid[4][0].hasPiece = true;
	grid[7][0].hasPiece = true;
	grid[0][7].hasPiece = true;
	grid[3][7].hasPiece = true;
	grid[7][7].hasPiece = true;
	grid[0][7].pieceColor = true;
	grid[3][7].pieceColor = true;
	grid[7][7].pieceColor = true;
	grid[4][0].castle = true;
	grid[3][7].castle = true;
	grid[3][0].plane = true;
	grid[4][7].plane = true;
}