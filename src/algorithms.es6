function binary_tree(grid) {
    for(let cell of grid) {
        let neighbors = [];
        if(cell.north !== null)
            neighbors.push(cell.north);
        if(cell.east !== null)
            neighbors.push(cell.east);

        if(neighbors.length > 0) {
            let link = neighbors[Math.floor(Math.random() * neighbors.length)];
            cell.link(link);
        }
    }
}

function sidewinder(grid) {
    for(let row of grid.eachRow()) {
        let start = 0;
        let end = 0;

        console.log(row);

        for(let index = 0; index < row.length; index++) {
            let cell = row[index];

            end = index + 1;

            if(cell.north === null && cell.east === null) {
                continue;
            } else if (cell.east !== null && (Math.floor(Math.random() * 2) === 1 || cell.north === null)) {
                cell.link(cell.east);
            } else {
                console.log(start);
                console.log(end);
                let link_cell = row[Math.floor(Math.random() * (end - start)) + start];
                link_cell.link(link_cell.north);

                start = end;
            }
        }
    }
}