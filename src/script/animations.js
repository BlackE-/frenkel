import Glide from '@glidejs/glide';
// import "@lottiefiles/lottie-player";
// import Slider from './files/slider.js';
class Animations{
	constructor(){}

	index(){
		console.log('index');
		setTimeout(()=>{
			new Glide('.glide', {
				type: 'carousel',autoplay: 0,animationDuration: 600,animationTimingFunc: 'linear',focusAt: 0,
				perView: 2,
				peek: 300,
				breakpoints: {
					1080: {perView: 2,peek: 100},
					768: {perView: 1,peek: 200},
					460: {perView: 1,peek: 50}
				}
			}).mount();


			// custom options
			// var options = {
			// 	// element: document.querySelector('.glide'),
			//     easing: 0.075,
			//     duration: 500,
			//     dragSpeed: 1.75,
			// }

			// // let's go!
			// var slider = new Slider(options);
		},1000);

		

		let tl = gsap.timeline({scrollTrigger: {trigger: "#firstSectionHome"}});
		tl.addLabel("start-Home")
		  .from("#firstSectionHomeText span", {opacity: 0,scale:1.2})
		  .to("#firstSectionHomeText span", {opacity: 1,scale:1, duration: 0.5})

		  .from("#logoHome", {opacity: 0,scale:1.2})
		  .from(".videoContainer", {opacity: 0,scale:1.3})
		  .to("#logoHome", {opacity: 1,scale:1, duration: 0.5})
		  .to(".videoContainer", {opacity: 1,scale:1, duration: 0.5})
		  .addLabel("end-Home");

		let tl2 = gsap.timeline({scrollTrigger: {trigger: ".sectionCarousel"}});
		tl2.addLabel("start-Carousel")
		  .from(".titlesectionCarousel", {opacity: 0,scale:1.2})
		  .to(".titlesectionCarousel", {opacity: 1,scale:1, duration: 0.5})
		  .from(".glideContainer", {opacity: 0,scale:1.2})
		  .to(".glideContainer", {opacity: 1,scale:1, duration: 0.5})
		  .addLabel("end-Carousel");


		let tl3 = gsap.timeline({scrollTrigger: {trigger: ".sectionBotones"}});
		tl3.addLabel("start-botones")
		  .from(".sectionBotones .title", {opacity: 0,scale:1.2})
		  .to(".sectionBotones .title", {opacity: 1,scale:1, duration: 0.5})
		  .from(".btnContainer", {opacity: 0,scale:1.2})
		  .to(".btnContainer", {opacity: 1,scale:1, duration: 0.5})
		  .addLabel("end-botones");


		let tl4 = gsap.timeline({scrollTrigger: {trigger: ".sectionPartners"}});
		tl4.addLabel("start-partners")
		  .from("#partnerContainer", {opacity: 0,scale:1.2})
		  .to("#partnerContainer", {opacity: 1,scale:1, duration: 0.5})
		  .addLabel("end-partners");
	}

	beneficios(){
		console.log('beneficios');
		let tl = gsap.timeline({scrollTrigger: {trigger: "#firstSectionAbout"}});
		tl.addLabel("start-Home")
		  .from("#firstSectionAbout title", {opacity: 0,scale:1.2})
		  .to("#firstSectionAbout title", {opacity: 1,scale:1, duration: 0.5})
		  .from("#beneficiosSelecct", {opacity: 0,scale:1.2})
		  .to("#beneficiosSelecct", {opacity: 1,scale:1, duration: 0.5})
		  .from(".containerBeneficios", {opacity: 0,scale:1.3})
		  .to(".containerBeneficios", {opacity: 1,scale:1, duration: 0.5})
		  .addLabel("end-Home");
	}

	servicios(){
		console.log('servicios');
	}

	footer(){
		let tlFooter = gsap.timeline({scrollTrigger: {trigger: ".footer"}});
		tlFooter.addLabel("start-footer")
		  .from(".footerText", {opacity: 0,scale:1.2})
		  .to(".footerText", {opacity: 1,scale:1, duration: 0.5})
		  .addLabel("end-footer");
	}

	loadCSS(filename){ 
		let file = document.createElement("link");
		file.setAttribute("rel", "stylesheet");
		file.setAttribute("type", "text/css");
		file.setAttribute("href", filename);
		document.head.appendChild(file);
	}
	loadScript(filePath){
		let myScript = document.createElement("script");
		myScript.setAttribute("src", filePath);
		document.body.appendChild(myScript);
	}

}

export default Animations;