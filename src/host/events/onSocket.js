
const socket = io.connect();

const socketEventHandler = eventName => fn => (
    socket.on(eventName, fn),
    () => socket.off(eventName, fn)
);

export const onPlayerJoin = socketEventHandler('played joined');
export const onPlayerDisconnect = socketEventHandler('played disconnected');
export const onInput = socketEventHandler('direction');
