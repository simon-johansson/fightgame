
import {onPlayerJoin} from './events/onSocket';

import {
    canvas,
    context,
    rootNode,
    width,
    height,
    entities
} from './constants';

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
rootNode.appendChild(canvas);

import onFrame from './events/onFrame';
import onSimulation from './events/onSimulation';
import onDraw from './events/onDraw';

import './entities/fps';
import player from './entities/player';

onPlayerJoin(function(data) {
    console.log('player join');
    player(data.id);
});
