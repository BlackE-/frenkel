import Index from './files/index.js';
import MenuServicios from './files/menuServicios.js';
import MenuBeneficios from './files/menuBeneficios.js';
import Innovacion from './files/innovacion.js';
import Capacitacion from './files/capacitacion.js';

class Animations{
	constructor(){}
	index(){
		new Index('.glide', 'https://frenkel.com.mx/assets/lottie/Frenkel-logo.json','linkTransitionBeneficios','linkTransitionServicios' );
	}

	beneficios(){
		this.header();
		new MenuBeneficios('select_wrapper','.select_inner li','.containerBeneficios section','.box');
	}

	servicios(){
		this.header();
		new MenuServicios(".circle-container li","#ulTitleH2","#ulText li",'#swipeArea',".box");
	}

	innovacion(){
		this.header();
		new Innovacion();
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
		const tlFooter = gsap.timeline({scrollTrigger: {trigger: ".footer"}});
		tlFooter.addLabel("start-footer").from(".footerText", {opacity: 0,scale:1.2}).to(".footerText", {opacity: 1,scale:1, duration: 0.5}).addLabel("end-footer");
	}

}

export default Animations;