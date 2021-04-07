
import Mouse from './files/mouse.js';

class Drawing{
	constructor(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.mouse = new Mouse();
		this.myRef;
		this.maxLength = 10;
		this.background = 'rgb(255,255,255)';

		this.positions = [];
		const onResizeHandler = this.debounce(this.onResize.bind(this), 100,this);
		window.addEventListener('resize', onResizeHandler, false);
        this.onResize();
        this.animate();
	}

	onResize(e) {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	
	animate() {
		this.myRef = requestAnimationFrame(() => this.animate());
		this.render();
	}

	setBackground(color){
		this.background = color;
	}

	map(n, start1, stop1, start2, stop2) {
  		return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
	}

	render() {
		this.ctx.globalCompositeOperation = 'source-over';
		this.ctx.fillStyle = this.background;
		this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fill();
		this.ctx.globalCompositeOperation = 'screen';
		this.positions.push([this.mouse.pos.x, this.mouse.pos.y]);

		if (this.positions.length > this.maxLength) {this.positions.splice(0, 1);}
		this.ctx.shadowColor = 'rgb(255, 255, 255)';

		for (let i = 0; i < this.positions.length; i++) {
	      let pos = this.positions[i];

	      this.ctx.beginPath(); // begin
	      // this.ctx.strokeStyle = `rgb(0, ${this.map(i, 0, this.maxLength, 100, 255)})`;
	      this.ctx.strokeStyle = `rgb(255, ${this.map(i, 0, this.maxLength, 100, 255)})`;
	      this.ctx.lineWidth = `${this.map(i, 0, this.maxLength, 420, 220)}`;
	      this.ctx.shadowBlur = this.map(i, 0, this.maxLength, 255, 200);
	      this.ctx.arc(pos[0], pos[1], 50, 0, Math.PI * 2, false);
	      this.ctx.stroke();
	      this.ctx.closePath();
	    }
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
export default Drawing;