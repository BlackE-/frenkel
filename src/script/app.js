import Menu from './menu.js';
import Highway from '@dogstudio/highway';
import Fade from './fade.js';
import Expand from './expand.js';
import SmoothScroll from './smoothScroll.js';
import Drawing from './drawing.js';
import Animations from './animations.js';

const _draw = new Drawing('paintonme',5);
const _animations = new Animations();
const _menu = new Menu('menuHamburguer','nav-icon2','nav','navUl');
const linksMenu = document.querySelectorAll('nav a');
const maximusContainer = document.getElementById('maximusContainer');

gsap.registerPlugin(ScrollTrigger);
/*			highway 			*/
const H = new Highway.Core({
	transitions:{
		default: Fade,
		contextual: {expand: Expand}
	}
});
H.on('NAVIGATE_OUT',({from, trigger,location}) =>{_menu.closeMenu();});//listen to the navigate OUT
H.on( 'NAVIGATE_IN', ({ to, location }) => {//listen to the navegate IN
	linksMenu.forEach(link => {link.classList.remove('active');if(link.href == location.href ){link.classList.add('active');}});
	checkLinkAnimations(location.href);	
});
const checkLinkAnimations = (link) =>{
	let l = link.split('/');
	switch(l[l.length-1]){
		case "capacitacion.html": 	setWhite(); 	_animations.capacitacion();break;	
		case "innovacion-4.0.html": setWhite(); 	_animations.innovacion();break;
		case "servicios.html": 		setOrange(); 	_animations.servicios();break;
		case "beneficios.html": 	setBlue(); 		_animations.beneficios();break;
		default: 					setWhite(); 	_animations.index();
	}
	_animations.footer();
}
const setOrange = () => {_draw.setBackground('rgb(211, 117,  34)');maximusContainer.classList = '';maximusContainer.classList.add('orange');}
const setBlue 	= () => {_draw.setBackground('rgb( 44, 116, 184)');maximusContainer.classList = '';maximusContainer.classList.add('blue');}
const setWhite 	= () => {_draw.setBackground('rgb(200, 200, 200)');maximusContainer.classList = '';}
const _scroll = new SmoothScroll();
checkLinkAnimations(window.location.href);