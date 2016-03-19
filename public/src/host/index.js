
import socket from './socket';

import {
    canvas,
    context,
    rootNode,
    width,
    height,
    entities
} from './constants';

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
rootNode.appendChild(canvas);

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


