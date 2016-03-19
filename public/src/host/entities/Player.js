
import {getRandomColor} from '../utils';

import {
    acceleration,
    airFriction,
    floorFrictionY,
    floorFrictionX,
    gravity,
    bounceAmount,
    floorTouchDistance,
    width,
    height,
    context,
    entities
} from '../constants';

export default class Player {
    constructor(id) {
        this.id = id;
        this.pressed = {};
        this.x = width / 2;
        this.y = height / 2;
        this.speedX = 0;
        this.speedY = 0;
        this.color = getRandomColor();
    }

    update() {
        const isTouchingFloor = this.y > height - floorTouchDistance || this.y < floorTouchDistance;
        let accX = 0;
        let accY = 0;
        if (this.pressed.LEFT) {
            accX -= acceleration;
        }
        if (this.pressed.RIGHT) {
            accX += acceleration;
        }
        if (this.pressed.UP) {
            accY -= acceleration;
        }
        if (this.pressed.DOWN) {
            accY += acceleration;
        }
        this.speedX += accX;
        this.speedY += accY;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < height - 5) {
            this.speedY += gravity;
        }
        if (isTouchingFloor) {
            this.speedY *= floorFrictionY;
            this.speedX *= floorFrictionX;
        } else {
            this.speedY *= airFriction;
            this.speedX *= airFriction;
        }
        if (this.x > width) this.x -= width;
        if (this.x < 0) this.x += width;
        if (this.y > height) {
            this.y = height - (this.y - height);
            this.speedY *= -bounceAmount;
        }
        if (this.y < 0) {
            this.y = -this.y;
            this.speedY *= -bounceAmount;
        }
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(
            Math.round(this.x - 10),
            Math.round(this.y - 10),
            20,
            20
        );
    }
}
