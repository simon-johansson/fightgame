/*
onFrame(function), simple event-like handling of frames. */

const frameHandlers = [];

export default function onFrame(fn) {
    frameHandlers.push(fn);
}

function invokeFrameHandlers(time) {
    requestAnimationFrame(invokeFrameHandlers);
    const length = frameHandlers.length;
    for (let i = 0; i < length; i++) {
        frameHandlers[i](time);
    }
}

invokeFrameHandlers(0);
