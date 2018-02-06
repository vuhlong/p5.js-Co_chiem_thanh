class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.hasPiece = false;
        this.pieceColor = false;
        this.bg = false;
        this.possibleDestination = false;
        this.plane = false;
        this.castle = false;
    }
    show() {
        stroke(0);
        if (this.bg) {
            fill(255, 0, 0);
        } else if (this.possibleDestination) {
            fill(100, 255, 100);
        } else if ((this.i + this.j) % 2 == 0) {
            fill(200);
        } else {
            noFill();
        }
        rect(this.x, this.y, this.w, this.w);
        if (this.castle) {
            textAlign(CENTER);
            fill(0);
            textSize(40);
            text("T", this.x+this.w*0.5, this.y-15+this.w);
        }
        if (this.plane) {
            textAlign(CENTER);
            fill(0);
            textSize(30);
            text("MB", this.x+this.w*0.5, this.y-15+this.w);
        }
        if (this.hasPiece) {
            if (this.pieceColor) {
                stroke(0);
                fill(255);
                ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            } else {
                stroke(0);
                fill(127);
                ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            }
        }
    }

    possibleMoves(grid) {
        let moves = new Array();
        if (this.hasPiece) {
            let posX = [this.i + 1, this.i + 2, this.i + 2, this.i + 1, this.i - 1, this.i - 2, this.i - 2, this.i - 1];
            let posY = [this.j - 2, this.j - 1, this.j + 1, this.j + 2, this.j + 2, this.j + 1, this.j - 1, this.j - 2];
            let defX = [this.i, this.i + 1, this.i + 1, this.i, this.i, this.i - 1, this.i - 1, this.i];
            let defY = [this.j - 1, this.j, this.j, this.j + 1, this.j + 1, this.j, this.j, this.j - 1];
            for (let k = 0; k < 8; k++) {
                if (posX[k] >= 0 && posX[k] < 8 && posY[k] >= 0 && posY[k] < 8) {
                    if (!grid[posX[k]][posY[k]].hasPiece || (grid[posX[k]][posY[k]].hasPiece && (grid[posX[k]][posY[k]].pieceColor != this.pieceColor))) {
                        if (!grid[defX[k]][defY[k]].hasPiece) {
                            moves.push(grid[posX[k]][posY[k]]);
                        }
                    }
                }
            }
        }
        return moves;
    }

    isPossibleMove(des) {
        let moves = this.possibleMoves(grid);
        for (let i = 0; i < moves.length; i++) {
            if (des == moves[i]) return true;
        }
        return false;
    }

    clicked() {
        if (this.hasPiece) {
            let moves = this.possibleMoves(grid);
            if (this.bg) {
                this.bg = false;
                for (let i = 0; i < moves.length; i++) {
                    moves[i].possibleDestination = false;
                }
            } else {
                this.bg = true;
                for (let i = 0; i < moves.length; i++) {
                    moves[i].possibleDestination = true;
                }
            }
        }
    }

    playerMove(des) {
        des.hasPiece = true;
        if (this.pieceColor) {
            des.pieceColor = true;
        } else des.pieceColor = false;
        this.hasPiece = false;
        des.clicked();
    }

    contains(x, y) {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }
}