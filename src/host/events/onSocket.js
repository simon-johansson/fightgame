
const socket = io.connect();

export function onPlayerJoin(fn) {
    socket.on('player joined', fn);
}

export function onPlayerDisconnect(fn) {
    socket.on('player disconnected', fn);
}

export function onInput(fn) {
    socket.on('direction', fn);
}
