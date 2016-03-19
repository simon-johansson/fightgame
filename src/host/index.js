
import {onPlayerJoin} from './events/onSocket';

import onFrame from './events/onFrame';
import onSimulation from './events/onSimulation';
import onDraw from './events/onDraw';

import './entities/fps';
import player from './entities/player';

onPlayerJoin(function(data) {
    player(data.id);
});
