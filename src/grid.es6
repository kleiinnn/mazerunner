'use strict';

function Cell(row, column) {
    this.row = row;
    this.column = column;

    this.links = [];

    this.north = null;
    this.east = null;
    this.south = null;
    this.west = null;
}

Cell.prototype.isLinked = function(cell) {
    return this.links.indexOf(cell) !== -1;
};

Cell.prototype.link = function(cell, bidi) {
    this.links.push(cell);

    if(bidi === true || bidi === undefined)
        cell.link(this, false);
};

Cell.prototype.unlink = function(cell, bidi) {
    cell.splice(cell.indexOf(cell), 1);

    if(bidi === true || bidi === undefined)
        cell.unlink(this, false);
};

Cell.prototype.neighbors = function() {
    var neighbors = [];

    if(this.north !== null)
        neighbors.push(this.north);
    if(this.east !== null)
        neighbors.push(this.east);
    if(this.south !== null)
        neighbors.push(this.south);
    if(this.west !== null)
        neighbors.push(this.west);

    return neighbors;
};


function Grid(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this._grid = this._init_grid();
    this._config_grid();
}

Grid.prototype[Symbol.iterator] = function*() {
    for(let row of this._grid) {
        for(let cell of row) {
            yield cell;
        }
    }
};

Grid.prototype.get = function(row, col) {
    if(row < 0 || row >= this.rows || col < 0 || col >= this.columns)
        return null;

    return this._grid[row][col];
};

Grid.prototype._init_grid = function() {
    var row, column;
    var grid = [];

    for(row = 0; row < this.rows; row++) {
        let cells = [];

        for(column = 0; column < this.columns; column++) {
            cells.push(new Cell(row, column));
        }

        grid.push(cells);
    }

    return grid;
};

Grid.prototype.eachRow = function*() {
    for(let row of this._grid) {
        yield row;
    }
};

Grid.prototype._config_grid = function() {
    for(let cell of this) {
        var row = cell.row;
        var col = cell.column;

        cell.north = this.get(row - 1, col);
        cell.east  = this.get(row, col + 1);
        cell.south = this.get(row + 1, col);
        cell.west  = this.get(row, col - 1);
    }
};

Grid.prototype.toString = function() {
    var output = '+' + ('---+'.repeat(this.columns)) + '\n';

    for(let row of this.eachRow()) {
        let top = '|';
        let bottom = '+';

        for(let cell of row) {
            if(cell === null)
                cell = new Cell(-1, -1);

            top += '   ' + (cell.isLinked(cell.east) ? ' ' : '|');
            bottom += (cell.isLinked(cell.south) ? '   ' : '---') + '+';
        }

        output += top + '\n';
        output += bottom + '\n';
    }

    return output
};
