var ROWS_NUM = 10;
var MAZE_SIZE = 1000;
var CELL_SIZE = 10000 / (10 * ROWS_NUM + 1);
var WALL_HEIGHT = 150;

// generate a maze using binary tree
var grid = new Grid(10, 10);
sidewinder(grid);
console.log(grid.toString());

// setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 20000 );

// camera
camera.position.set(500, 500, 1000);
scene.add(camera);

// renderer
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0);

// append to dom
document.body.appendChild( renderer.domElement );

// light
var light = new THREE.HemisphereLight( 0xffffff, 0x080808, 0.4 );
scene.add( light );

var dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(1200, 600, 600);
scene.add(dirLight);

dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(-400, 600, 700);
scene.add(dirLight);

// cube
/*var geometry = new THREE.BoxGeometry( 100, 100, 100);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.y = 51;
scene.add( cube );*/

// floor
var floorMaterial = new THREE.MeshLambertMaterial({color: 0xdddddd, side: THREE.DoubleSide});
var floorGeometry = new THREE.PlaneGeometry(MAZE_SIZE, MAZE_SIZE, 1, 1);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
floor.position.x = MAZE_SIZE / 2;
floor.position.z = MAZE_SIZE / 2;
scene.add(floor);


var wallMaterial = new THREE.MeshLambertMaterial({color: /*0xaaaaaa*/ 0x4caf50 });

// northern wall
var northWallGeometry = new THREE.BoxGeometry(1000, WALL_HEIGHT, CELL_SIZE * 0.1);
var northWall = new THREE.Mesh(northWallGeometry, wallMaterial);
northWall.position.set(
    northWallGeometry.parameters.width / 2,
    northWallGeometry.parameters.height / 2,
    northWallGeometry.parameters.depth / 2
);
scene.add(northWall);

// western wall
var westWallGeometry = new THREE.BoxGeometry(CELL_SIZE * 0.1, WALL_HEIGHT, 1000);
var westWall = new THREE.Mesh(westWallGeometry, wallMaterial);
westWall.position.set(
    westWallGeometry.parameters.width / 2,
    westWallGeometry.parameters.height / 2,
    westWallGeometry.parameters.depth / 2
);
scene.add(westWall);


// actual maze printing algorithm
for(let cell of grid) {
    if(cell === null)
        continue;

    if(!cell.isLinked(cell.east) || cell.column === grid.columns - 1) {
        let easternWallGeometry = new THREE.BoxGeometry(CELL_SIZE * 0.1, WALL_HEIGHT, CELL_SIZE * 1.1);
        let easternWall = new THREE.Mesh(easternWallGeometry, wallMaterial);
        easternWall.position.set(
            easternWallGeometry.parameters.width / 2,
            easternWallGeometry.parameters.height / 2,
            easternWallGeometry.parameters.depth / 2
        );
        easternWall.position.x += (cell.column + 1) * CELL_SIZE;
        easternWall.position.z += cell.row * CELL_SIZE;
        scene.add(easternWall);
    }

    if(!cell.isLinked(cell.south) || cell.row === grid.rows - 1) {
        let southernWallGeometry = new THREE.BoxGeometry(CELL_SIZE * 1.1, WALL_HEIGHT, CELL_SIZE * 0.1);
        let southernWall = new THREE.Mesh(southernWallGeometry, wallMaterial);
        southernWall.position.set(
            southernWallGeometry.parameters.width / 2,
            southernWallGeometry.parameters.height / 2,
            southernWallGeometry.parameters.depth / 2
        );
        southernWall.position.x += cell.column * CELL_SIZE;
        southernWall.position.z += (cell.row + 1) * CELL_SIZE;
        scene.add(southernWall);
    }
}

// axis helper
var axes = new THREE.AxisHelper(100);
scene.add( axes );

// controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.center = new THREE.Vector3(500, 0, 500);

// render loop
function render() {
    requestAnimationFrame( render );

    controls.update();
    renderer.render( scene, camera );
}
render();