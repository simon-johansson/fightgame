/*
onDraw(zIndex, fn), will be called on each frame, with order determined by zIndex */

import onFrame from './onFrame';
import {width, height, context} from '../constants';

const drawHandlers = [[]];

let minZIndex = 0;
let maxZIndex = 0;

export default function onDraw(z, fn) {
    const zIndex = Math.max(0, z | 0);
    if (drawHandlers[zIndex] === undefined) {
        if (zIndex < minZIndex) {
            minZIndex = zIndex;
        }
        if (zIndex > maxZIndex) {
            maxZIndex = zIndex;
        }
        drawHandlers[zIndex] = [];
    }
    drawHandlers[zIndex].push(fn);
}

function invokeDrawHandlers(time) {
    for (let z = minZIndex; z <= maxZIndex; z++) {
        const layer = drawHandlers[z];
        if (layer) {
            const length = layer.length;
            for (let i = 0; i < length; i++) {
                layer[i](time);
            }
        }
    }
}

onFrame(invokeDrawHandlers);

onDraw(0, function clearCanvas() {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
});
