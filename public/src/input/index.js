
const socket = io.connect();
socket.emit('new user');

const KEYS = {
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN'
};

const buttons = Array.prototype.slice.call(document.querySelectorAll('button'));

function emit(key, keyEventType, classMethod) {
    if (key) {
        buttons.find(function(button) {
            return button.id === key;
        }).classList[classMethod]('active');
        console.log('emitting', keyEventType, key);
        socket.emit('input', {
            type: keyEventType,
            key: key
        });
    }
}

function emitStart(key) {
    emit(key, 'keydown', 'add');
}

function emitEnd(key) {
    emit(key, 'keyup', 'remove');
}

document.addEventListener('keydown', function(e) {
    emitStart(KEYS[e.which]);
});

document.addEventListener('keyup', function(e) {
    emitEnd(KEYS[e.which]);
});

buttons.forEach(function(button) {
    const id = button.id;

    ['touchstart', 'mousedown'].forEach(function(evType) {
        button.addEventListener(evType, emitStart.bind(null, id));
    });

    ['mouseup', 'touchend', 'mouseleave'].forEach(function(evType) {
        button.addEventListener(evType, emitEnd.bind(null, id));
    });

    button.addEventListener('touchmove', function(e) {
        // Avoid scrolling when moving finger on button
        e.preventDefault();
    });
});


