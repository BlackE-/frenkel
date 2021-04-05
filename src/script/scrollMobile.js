class SmoothScrollMobile{
	constructor(id,) {
		this.container = document.getElementById(id)
		this.y = 0
		this.pY = 0
		this.myRef
		this.allowScroll = true
		
		this.rotate = 0
		this.speed = 0
		this.lastPosition = 0
	 	this.currentPosition = 0
	 	this.minSpeed = -1
	 	this.maxSpeed = 1

		this.events()
		this.animate()
	}

	events() {
		window.addEventListener("scroll", (e) => {if(this.allowScroll) this.animate()});
	}

	get scrollY() {
		return window.pageYOffset || document.documentElement.scrollTop
	}
	
	animate() {
		this.allowScroll = false;
		this.myRef = requestAnimationFrame(() => this.animate())
		this.render()
	}

	render() {
		this.y += (this.scrollY - this.y)
		if(this.pY  === this.y){
			this.allowScroll = true;
			window.cancelAnimationFrame(this.myRef);
		}

		this.currentPosition = this.scrollY;
	  	this.speed = this.speed + (this.lastPosition - this.currentPosition);
		this.speed = (this.speed > this.maxSpeed) ? this.maxSpeed : this.speed;
		this.speed = (this.speed < this.minSpeed) ? this.minSpeed : this.speed;
		this.lastPosition = this.currentPosition;

		this.speed = (this.speed > 0) ? (this.speed - 0.1) : this.speed;
		this.speed = (this.speed <= 0) ? (this.speed + 0.1) : this.speed;

		this.container.style.transform = `perspective(300px) rotateX(${this.speed.toFixed(this.precision)}deg)`;
		this.pY = this.y;
	}
}
export default SmoothScrollMobile;