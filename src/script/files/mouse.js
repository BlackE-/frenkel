import Vector from './vector.js';
const pxRatio = window.devicePixelRatio;
class Mouse{   
    constructor() {
        this.pos = new Vector(1, 1);
        this.addEvents();
    }

    addEvents() {
        // const mouseMove = this.throttle(this.update.bind(this), 100,this);
        const mouseMove = this.debounce(this.update.bind(this), 100,this);
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
        // this.pos.set(e.clientX * pxRatio, e.clientY * pxRatio);
        this.pos.set(e.clientX, e.clientY);
    }

    /**
     * in case of a "storm of events", this executes once every $threshold
     * @param fn
     * @param threshhold
     * @param scope
     * @returns {Function}
     */
    throttle(fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function () {
            var context = scope || this;

            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    debounce(func, wait, scope) {
        var timeout;
        return function () {
            var context = scope || this, args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

}

export default Mouse;