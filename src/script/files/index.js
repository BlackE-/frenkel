import Glide from '@glidejs/glide';
import lottie from 'lottie-web';
// import Slider from './slider.js';

class Index{
	constructor(slider,json,id_beneficios,id_servicios){
		this.slider = slider;
		this.json = json;
		this.transitionBeneficios = document.getElementById(id_beneficios);
		this.transitionServicios = document.getElementById(id_servicios);
		const heightSlider = this.debounce(this.heightSlider.bind(this), 100,this);
		window.addEventListener('resize', heightSlider, false);
		this.init();
	}

	setGlide = () =>{
		new Glide(this.slider, {type: 'carousel',autoplay: 0, animationDuration: 600,animationTimingFunc: 'linear',focusAt: 0,perView: 3,peek: 100,
			breakpoints: {1080: {perView: 2,peek: 100},768: {perView: 1,peek: 50},460: {perView: 1,peek: 50,gap:20}}
		}).mount();
	}

	heightSlider = () =>{
		const glide__slide = [...document.getElementsByClassName('glide__slide')];
		let longest = glide__slide.reduce( function (a, b) {return a.clientHeight > b.clientHeight ? a: b; });
		glide__slide.forEach((i)=>{i.style.height = `${longest.clientHeight}px`;});
	}

	setLottieAnimation = () =>{
		lottie.loadAnimation({container: document.querySelector("lottie-player"),renderer: 'svg',loop: true,autoplay: true,path: this.json,});
	}

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

	init = () =>{
		this.setLottieAnimation();
		this.setTimelines();
		setTimeout(()=>{this.setGlide();this.heightSlider()},1000);
	}
}

export default Index;