
import {getRandomColor} from '../utils';

import onFrame from '../events/onFrame';
import onSimulation from '../events/onSimulation';
import onDraw from '../events/onDraw';
import * as socket from '../events/onSocket';

import {
    width,
    height,
    context
} from '../constants';

const acceleration = 0.03;
const airFriction = 0.999;
const floorFrictionY = 0.99;
const floorFrictionX = 0.99;
const gravity = 0.002;
const bounceAmount = 0.9;
const floorTouchDistance = 2;

export default function player(playerId) {
    let id = playerId;
    let pressed = {};
    let x = width / 2;
    let y = height / 2;
    let speedX = 0;
    let speedY = 0;
    let color = getRandomColor();

    let isAlive = true;

    socket.onInput(function(data) {
        if (data.id === id) {
            switch (data.type) {
                case 'keydown':
                    pressed[data.key] = true;
                    break;
                case 'keyup':
                    pressed[data.key] = false;
                    break;
            }
        }
    });

    socket.onPlayerDisconnect(function(data) {
        if (data.id === id) {
            isAlive = false;
        }
    });

    onSimulation(function(simTime) {
        if (!isAlive) return;
        const isTouchingFloor = y > height - floorTouchDistance || y < floorTouchDistance;
        let accX = 0;
        let accY = 0;
        if (pressed.LEFT) {
            accX -= acceleration;
        }
        if (pressed.RIGHT) {
            accX += acceleration;
        }
        if (pressed.UP) {
            accY -= acceleration;
        }
        if (pressed.DOWN) {
            accY += acceleration;
        }
        speedX += accX;
        speedY += accY;
        x += speedX;
        y += speedY;
        if (y < height - 5) {
            speedY += gravity;
        }
        if (isTouchingFloor) {
            speedY *= floorFrictionY;
            speedX *= floorFrictionX;
        } else {
            speedY *= airFriction;
            speedX *= airFriction;
        }
        if (x > width) x -= width;
        if (x < 0) x += width;
        if (y > height) {
            y = height - (y - height);
            speedY *= -bounceAmount;
        }
        if (y < 0) {
            y = -y;
            speedY *= -bounceAmount;
        }
    });

    onDraw(1, function(time) {
        if (!isAlive) return;
        context.fillStyle = color;
        context.fillRect(
            Math.round(x - 10),
            Math.round(y - 10),
            20,
            20
        );
    });
}



