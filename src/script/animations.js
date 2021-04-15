import Glide from '@glidejs/glide';
import lottie from 'lottie-web';
import ServiciosMenu from './files/ServiciosMenu.js';
// import Slider from './files/slider.js';
class Animations{
	constructor(){}
	index(){
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
			const anim = lottie.loadAnimation({
		      container: document.querySelector("lottie-player"),
		      renderer: 'svg',
		      loop: true,
		      autoplay: true,
		      path: 'https://www.studio-sub.com/clientes/frenkel/json/Frenkel-logo.json',
		    });


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

		document.getElementById('linkTransitionBeneficios').addEventListener('click',(e)=>{
			document.getElementById('linkTransitionBeneficios').setAttribute('x',e.clientX);
			document.getElementById('linkTransitionBeneficios').setAttribute('y',e.clientY);
		});

		document.getElementById('linkTransitionServicios').addEventListener('click',(e)=>{
			document.getElementById('linkTransitionServicios').setAttribute('x',e.clientX);
			document.getElementById('linkTransitionServicios').setAttribute('y',e.clientY);
		});
	}

	beneficios(){
		this.header();
		let select_title = document.getElementById('select_title');
		let select_wrapper = document.getElementById('select_wrapper');
		let select_content = document.getElementById('select_content');
		let li = [...document.querySelectorAll('.select_inner li')];
		let sections = [...document.querySelectorAll('.containerBeneficios section')];
		select_title.addEventListener('click',()=>{	select_wrapper.classList.toggle('openSelect');});
		for(let i of li){
			i.addEventListener('click',function(){
				for(let item of li){item.classList.remove('active');}
				i.classList.add('active');
				for(let s of sections){s.classList.remove('active');}
				let section = document.getElementById(`content_${i.getAttribute('id')}`);
				section.classList.add('active');
			});
		}
	}

	servicios(){
		this.header();
		new ServiciosMenu( document.querySelectorAll(".circle-container li"), document.querySelectorAll(".sectionServicios") );
	}

	header(){
		const tl = gsap.timeline({repeatDelay: 1});
		tl.from(".logoHeader", {opacity: 0,scale:1.2});
		tl.to(".logoHeader", {opacity: 1,scale:1, duration: 0.05});
	}
	footer(){
		const tlFooter = gsap.timeline({scrollTrigger: {trigger: ".footer",scrub:1}});
		tlFooter.addLabel("start-footer").from(".footerText", {opacity: 0,scale:1.2}).to(".footerText", {opacity: 1,scale:1, duration: 0.05}).addLabel("end-footer");
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