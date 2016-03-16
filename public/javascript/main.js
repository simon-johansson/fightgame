
const socket = io.connect();

function emit(event) {
    console.log(event);
    socket.emit('input', { direction: event });
}

const PRESSED = {};

socket.on('direction', function (data) {
    if (data.type === 'keydown') {
        PRESSED[data.key] = true;
    }
    if (data.type === 'keyup') {
        PRESSED[data.key] = false;
    }
});


const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const rootNode = document.getElementById('app');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
rootNode.appendChild(canvas);

const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

document.addEventListener('keydown', function(e) {
    for (let key in KEYS) {
        const which = KEYS[key];
        if (e.which === which) {
            socket.emit('input', {
                type: 'keydown',
                key: key
            });
            break;
        }
    }
});

document.addEventListener('keyup', function(e) {
    for (let key in KEYS) {
        const which = KEYS[key];
        if (e.which === which) {
            socket.emit('input', {
                type: 'keyup',
                key: key
            });
            break;
        }
    }
});

const entities = [];

let playerX = width / 2;
let playerY = height / 2;
let speedX = 0;
let speedY = 0;
const playerFriction = 0.97;

const player = {
    update() {
        if (PRESSED.UP) {
            speedY--;
        }
        if (PRESSED.DOWN) {
            speedY++;
        }
        if (PRESSED.LEFT) {
            speedX--;
        }
        if (PRESSED.RIGHT) {
            speedX++;
        }
        speedX *= playerFriction;
        speedY *= playerFriction;
        playerX += speedX;
        playerY += speedY;
        if (playerX > width) playerX -= width;
        if (playerX < 0) playerX += width;
        if (playerY > height) playerY -= height;
        if (playerY < 0) playerY += height;
    },
    draw(t) {
        context.fillStyle = '#ff0000';
        context.fillRect(playerX - 10, playerY - 10, 20, 20);
    }
};

entities.push(player);

let frameT = 0;
let simulationT = 0;
const simulationStepMs = 5;

function frame(t) {
    requestAnimationFrame(frame);

    let simulationSteps = 0;
    while (simulationT < t) {
        simulationT += simulationStepMs;
        simulationSteps++;
    }

    context.clearRect(0, 0, width, height);
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].update) {
            for (let step = 0; step < simulationSteps; step++) {
                entities[i].update();
            }
        }
    }
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].draw) {
            entities[i].draw(t);
        }
    }
}


frame(0);



