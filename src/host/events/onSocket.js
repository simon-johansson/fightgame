
const socket = io.connect();

const socketEventHandler = eventName => fn => (
    socket.on(eventName, fn),
    () => socket.off(eventName, fn)
);

export const onPlayerJoin = socketEventHandler('player joined');
export const onPlayerDisconnect = socketEventHandler('player disconnected');
export const onInput = socketEventHandler('direction');
