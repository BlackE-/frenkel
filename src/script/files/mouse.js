import Vector from './vector.js';
const pxRatio = window.devicePixelRatio;
class Mouse{   
    constructor() {
        this.pos = new Vector(1, 1);
        this.addEvents();
    }

    addEvents() {
        // const mouseMove = throttle(this.update.bind(this), 100,this);
        const mouseMove = this.update.bind(this);
        document.addEventListener('mousemove', mouseMove, false);
        document.addEventListener('touchmove', mouseMove, false);
    }

    onDown(callback) {
        document.addEventListener('mousedown', () => callback(this.pos), false);
        document.addEventListener('touchstart', () => callback(this.pos), false);
    }

    onUp(callback) {
        document.addEventListener('mouseup', () => callback(this.pos), false);
        document.addEventListener('touchend', () => callback(this.pos), false);
    }

    update(e) {
        if (e.touches) e = e.touches[0];
        this.pos.set(e.clientX * pxRatio, e.clientY * pxRatio);
        // this.pos.set(e.clientX, e.clientY);
    }

}

export default Mouse;