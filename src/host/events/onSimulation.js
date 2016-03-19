/*
onSimulation(fn), will call fn with a fixed time step, to update physics etc */

import onFrame from './onFrame';

const simulationTimeStep = 5; // milliseconds
const simulationHandlers = [];

export default function onSimulation(fn) {
    simulationHandlers.push(fn);
}

let simulationTime = 0;


function invokeSimulationHandlers(time = performance.now()) {
    while (simulationTime < time) {
        simulationTime += simulationTimeStep;
        const length = simulationHandlers.length;
        for (let i = 0; i < length; i++) {
            simulationHandlers[i](simulationTime);
        }
    }
}

setInterval(invokeSimulationHandlers, simulationTimeStep * 2);
onFrame(invokeSimulationHandlers);
