/*
onFrame(function), simple event-like handling of frames. */

const frameHandlers = [];

export default function onFrame(fn) {
    frameHandlers.push(fn);
    return function removeHandler() {
        const index = frameHandlers.indexOf(fn);
        frameHandlers.splice(index, 1);
    }
}

function invokeFrameHandlers(time) {
    requestAnimationFrame(invokeFrameHandlers);
    const length = frameHandlers.length;
    for (let i = 0; i < length; i++) {
        frameHandlers[i](time);
    }
}

invokeFrameHandlers(0);
