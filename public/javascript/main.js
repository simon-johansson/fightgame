
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const rootNode = document.getElementById('app');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
rootNode.appendChild(canvas);

const entities = [];

const acceleration = 0.03;
const airFriction = 0.999;
const floorFrictionY = 0.99;
const floorFrictionX = 0.99;
const gravity = 0.002;
const bounceAmount = 0.9;

const floorTouchDistance = 2;

let simulationT = 0;
const simulationStepMs = 5;

function frame(t) {
    requestAnimationFrame(frame);

    let simulationSteps = 0;
    while (simulationT < t) {
        simulationT += simulationStepMs;
        simulationSteps++;
    }
    simulationSteps = Math.min(simulationSteps, 20);

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


