class GridTile {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
    }

    getY() {
        return this.y;
    }

}

export { GridTile }