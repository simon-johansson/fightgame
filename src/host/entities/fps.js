
import {context} from '../canvas/canvas';
import onDraw from '../events/onDraw';

let seconds = 0;
let frameCount = 0;
let longestFrame = 0;

let prevT = 0;

let fpsText = '';

onDraw(0, function(t) {
    frameCount++;
    let frameTime = t - prevT;
    longestFrame = Math.max(longestFrame, frameTime);
    prevT = t;
    if (t > seconds * 1000) {
        fpsText = `${frameCount} fps (worst ${longestFrame.toFixed(2)}ms)`;
        longestFrame = 0;
        frameCount = 0;
        seconds++;
    }
    context.font = '16px sans-serif';
    context.fillStyle = '#000000';
    context.fillText(fpsText, 10, 20);
});
