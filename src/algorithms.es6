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