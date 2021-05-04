import Index from './files/index.js';
import MenuServicios from './files/menuServicios.js';
import MenuBeneficios from './files/menuBeneficios.js';
import Inovacion from './files/inovacion.js';
import Capacitacion from './files/capacitacion.js';

class Animations{
	constructor(){}
	index(){
		new Index('.glide', 'https://www.studio-sub.com/clientes/frenkel/json/Frenkel-logo.json','linkTransitionBeneficios','linkTransitionServicios' );
	}

	beneficios(){
		this.header();
		new MenuBeneficios('select_wrapper','.select_inner li','.containerBeneficios section','.box');
	}

	servicios(){
		this.header();
		new MenuServicios( 
			document.querySelectorAll(".circle-container li"),
			document.querySelectorAll(".sectionServicios"),
			document.getElementById('swipeArea'),
			document.querySelectorAll(".box")
			);
	}

	inovacion(){
		this.header();
		new Inovacion();
	}

	capacitacion(){
		this.header();
		new Capacitacion();
	}

	header(){
		const tl = gsap.timeline({repeatDelay: 1});
		tl.from(".logoHeader", {opacity: 0,scale:1.2});
		tl.to(".logoHeader", {opacity: 1,scale:1, duration: 0.05});
	}
	footer(){
		document.getElementById('footerDate').innerHtml = new Date().getFullYear();
		// const tlFooter = gsap.timeline({scrollTrigger: {trigger: ".footer",scrub:1}});
		const tlFooter = gsap.timeline({scrollTrigger: {trigger: ".footer"}});
		tlFooter.addLabel("start-footer").from(".footerText", {opacity: 0,scale:1.2}).to(".footerText", {opacity: 1,scale:1, duration: 0.5}).addLabel("end-footer");
	}

	// loadCSS(filename){ 
	// 	let file = document.createElement("link");
	// 	file.setAttribute("rel", "stylesheet");
	// 	file.setAttribute("type", "text/css");
	// 	file.setAttribute("href", filename);
	// 	document.head.appendChild(file);
	// }
	// loadScript(filePath){
	// 	let myScript = document.createElement("script");
	// 	myScript.setAttribute("src", filePath);
	// 	document.body.appendChild(myScript);
	// }

}

export default Animations;