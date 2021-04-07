import Highway from '@dogstudio/highway';
import Fade from './fade.js';
import Overlap from './overlap.js';
import SmoothScroll from './scroll.js';
import Drawing from './drawing.js';

const _draw = new Drawing('paintonme');

/*			highway 			*/
const H = new Highway.Core({
	transitions:{
		default: Fade,
		contextual: {
	      overlap: Overlap
	    }
	}
});

const linksMenu = document.querySelectorAll('nav a');
const maximusContainer = document.getElementById('maximusContainer');
//listen to the navigate OUT
H.on('NAVIGATE_OUT',({from, trigger,location}) =>{
	closeMenu();
	let link = location.href.split('/');
	switch(link[link.length-1]){
		case "servicios.html":
			_draw.setBackground('rgb(211, 117, 34)');
			maximusContainer.classList = '';
			maximusContainer.classList.add('orange');
		break;
		case "beneficios.html":
			_draw.setBackground('rgb(44, 116, 184)');
			maximusContainer.classList = '';
			maximusContainer.classList.add('blue');
		break;
		default:
			_draw.setBackground('rgb(233, 233, 233)');
			maximusContainer.classList = '';
	}
});
//listen to the navegate IN
H.on( 'NAVIGATE_IN', ({ to, location }) => {
	linksMenu.forEach(link => {
		link.classList.remove('active');
		if(link.href == location.href ){link.classList.add('active');}
	});
});
H.on('NAVIGATE_END',({to, location}) =>{
	// console.log(to);
});



/*			scroll mobile 			*/
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (!isMobile) {
	const _scroll = new SmoothScroll('scrollContainer','main');
}else{
	maximusContainer.classList.add('mobile');
	document.getElementById('scrollContainer').classList.add('mobile');
}

//HEADER
console.log('%cBy @Studio-SUB', 'font-size: 14px;color: #000; border:1px solid #000;');
const menuHamburguer = document.getElementById('menuHamburguer');
const hamburgerIcon = document.getElementById('nav-icon2');
const menuNav = document.getElementById('nav');
const menuNavUl = document.getElementById('navUl');

let openMenu = () =>{
	hamburgerIcon.classList.remove('close');hamburgerIcon.classList.add('open');
	menuNav.classList.remove('close');menuNav.classList.add('open');
	menuNavUl.classList.add('open');
}
let closeMenu = () =>{
	menuNavUl.classList.remove('open');
	hamburgerIcon.classList.remove('open');hamburgerIcon.classList.add('close');
	menuNav.classList.remove('open');menuNav.classList.add('close');
}
menuHamburguer.addEventListener("change",()=>{
	(menuHamburguer.checked) ? openMenu() : closeMenu() ;
});

setTimeout(()=>{hamburgerIcon.classList.remove('load');},1500);


let tlFooter = gsap.timeline({scrollTrigger: {trigger: ".footer"}});
tlFooter.addLabel("start-footer")
  .from(".footerText", {opacity: 0,scale:1.2})
  .to(".footerText", {opacity: 1,scale:1, duration: 0.5})
  .addLabel("end-footer");