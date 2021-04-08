import Menu from './menu.js';
import Highway from '@dogstudio/highway';
import Fade from './fade.js';
import Overlap from './overlap.js';
// import SmoothScroll from './scroll.js';
import Drawing from './drawing.js';
import Animations from './animations.js';

const _draw = new Drawing('paintonme');
const _animations = new Animations();
const _menu = new Menu('menuHamburguer','nav-icon2','nav','navUl');
const linksMenu = document.querySelectorAll('nav a');
const maximusContainer = document.getElementById('maximusContainer');

gsap.registerPlugin(ScrollTrigger);
/*			highway 			*/
const H = new Highway.Core({
	transitions:{
		default: Fade,
		contextual: {
	      overlap: Overlap
	    }
	}
});


H.on('NAVIGATE_OUT',({from, trigger,location}) =>{//listen to the navigate OUT
	_menu.closeMenu();
	checkLinkTransitions(location.href);
});
H.on( 'NAVIGATE_IN', ({ to, location }) => {//listen to the navegate IN
	linksMenu.forEach(link => {
		link.classList.remove('active');
		if(link.href == location.href ){link.classList.add('active');}
	});
	checkLinkAnimations(location.href);	
});
H.on('NAVIGATE_END',({to, location}) =>{// console.log(to);
});

const checkLinkAnimations = (link) =>{
	let l = link.split('/');
	switch(l[l.length-1]){
		case "servicios.html":
			setOrange();
			_animations.servicios();
		break;
		case "beneficios.html":
			setBlue();
			_animations.beneficios();
		break;
		default:
			setWhite();
			_animations.index();
	}
	_animations.footer();
}

const checkLinkTransitions = (link) =>{
	maximusContainer.classList = '';

	let l = link.split('/');
	switch(l[l.length-1]){
		case "servicios.html":setOrange();break;
		case "beneficios.html":setBlue();break;
		default:setWhite();
	}
}

const setOrange = () => {
	_draw.setBackground('rgb(211, 117, 34)');
	maximusContainer.classList.add('orange');
}
const setBlue = () =>{
	_draw.setBackground('rgb(44, 116, 184)');
	maximusContainer.classList.add('blue');
}
const setWhite = () =>{_draw.setBackground('rgb(233, 233, 233)');}


/*			scroll mobile 			*/
// const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// if (!isMobile) {
	// const _scroll = new SmoothScroll('scrollContainer','main');
	// maximusContainer.classList.add('scroll');
	// document.getElementById('scrollContainer').classList.add('scroll');
// }


checkLinkAnimations(window.location.href);
