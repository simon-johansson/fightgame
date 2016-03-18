const socket = io.connect();

socket.on('player joined', function(data) {
    entities.push(new Player(data.id));
});

socket.on('player disconnected', function(data) {
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].id == data.id) {
            entities.splice(i, 1);
            break;
        }
    }
});

socket.on('direction', function(data) {
    if (data.type === 'keydown') {
        entities.forEach(function(player) {
            if (player.id === data.id) {
                player.pressed[data.key] = true;
            }
        });
    }

    if (data.type === 'keyup') {
        entities.forEach(function(player) {
            if (player.id === data.id) {
                player.pressed[data.key] = false;
            }
        });
    }
});
