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

function setup() {
	createCanvas(windowWidth, windowHeight);
	createCanvas(600, 401);
	grid = make2DArray(cols, rows);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}
}

function draw() {

}

function setupGame() {
	
}