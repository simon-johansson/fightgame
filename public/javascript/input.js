
var socket = io.connect();

var KEYS = {
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN'
};

var buttons = Array.prototype.slice.call(document.querySelectorAll('button'));

function emitStart(key) {
    if (!!key) {
        buttons.find(function(button) {
            return button.id === key;
        }).classList.add('active');
        console.log('emitting start', key);
        socket.emit('input', {
            type: 'keydown',
            key: key
        });
    }
}

function emitEnd(key) {
    if (!!key) {
        buttons.find(function(button) {
            return button.id === key;
        }).classList.remove('active');
        console.log('emitting end', key);
        socket.emit('input', {
            type: 'keyup',
            key: key
        });
    }
}

document.addEventListener('keydown', function(e) {
    emitStart(KEYS[e.which]);
});

document.addEventListener('keyup', function(e) {
    emitEnd(KEYS[e.which]);
});

buttons.forEach(function(button) {
    var id = button.id;
    button.addEventListener('touchstart', emitStart.bind(null, id));
    button.addEventListener('mousedown', emitStart.bind(null, id));
    button.addEventListener('mouseup', emitEnd.bind(null, id));
    button.addEventListener('touchend', emitEnd.bind(null, id));
    button.addEventListener('mouseleave', emitEnd.bind(null, id));
    button.addEventListener('touchmove', function(e) {
        // Avoid scrolling when moving finger on button
        e.preventDefault();
    });
});


