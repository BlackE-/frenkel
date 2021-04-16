import Glide from '@glidejs/glide';
import lottie from 'lottie-web';
// import Slider from './slider.js';

class Index{
	constructor(slider,json,id_beneficios,id_servicios){
		this.slider = slider;
		this.json = json;
		this.transitionBeneficios = document.getElementById(id_beneficios);
		this.transitionServicios = document.getElementById(id_servicios);
		this.init();
	}

	setGlide = () =>{
		new Glide(this.slider, {type: 'carousel',autoplay: 0,animationDuration: 600,animationTimingFunc: 'linear',focusAt: 0,perView: 2,peek: 300,
			breakpoints: {1080: {perView: 2,peek: 100},768: {perView: 1,peek: 200},460: {perView: 1,peek: 50}}
		}).mount();
	}

	setLottieAnimation = () =>{
		lottie.loadAnimation({container: document.querySelector("lottie-player"),renderer: 'svg',loop: true,autoplay: true,path: this.json,});
	}

	// setSlider = () =>{
		// custom options
		// var options = {
		// 	// element: document.querySelector('.glide'),
		//     easing: 0.075,
		//     duration: 500,
		//     dragSpeed: 1.75,
		// }

		// // let's go!
		// var slider = new Slider(options);
	// }

	setTimelines = () =>{
		let tl2 = gsap.timeline({scrollTrigger: {trigger: ".sectionCarousel"}});
		tl2.from(".titlesectionCarousel", {opacity: 0,scale:1.2}).to(".titlesectionCarousel", {opacity: 1,scale:1, duration: 0.5})
		  .from(".glideContainer", {opacity: 0,scale:1.2}).to(".glideContainer", {opacity: 1,scale:1, duration: 0.5});

		let tl3 = gsap.timeline({scrollTrigger: {trigger: ".sectionBotones"}});
		tl3.from(".sectionBotones .title", {opacity: 0,scale:1.2}).to(".sectionBotones .title", {opacity: 1,scale:1, duration: 0.5})
		  .from(".btnContainer", {opacity: 0,scale:1.2}).to(".btnContainer", {opacity: 1,scale:1, duration: 0.5});

		let tl4 = gsap.timeline({scrollTrigger: {trigger: ".sectionPartners"}});
		tl4.from("#partnerContainer", {opacity: 0,scale:1.2}).to("#partnerContainer", {opacity: 1,scale:1, duration: 0.5});
	}

	init = () =>{
		this.transitionBeneficios.addEventListener('click',function(e){
			this.transitionBeneficios.setAttribute('x',e.clientX);
			this.transitionBeneficios.setAttribute('y',e.clientY);
		}.bind(this),false);

		this.transitionServicios.addEventListener('click',function(e){
			this.transitionServicios.setAttribute('x',e.clientX);
			this.transitionServicios.setAttribute('y',e.clientY);
		}.bind(this),false);

		this.setLottieAnimation();
		this.setTimelines();
		setTimeout(()=>{this.setGlide();},1000);
	}
}

export default Index;