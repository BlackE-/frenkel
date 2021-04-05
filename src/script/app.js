import Highway from '@dogstudio/highway';
import Fade from './fade.js';
// import Overlap from './overlap.js';

import SmoothScroll from './scroll.js';
import Drawing from './drawing.js';

const _draw = new Drawing('paintonme');

/*			highway 			*/
const H = new Highway.Core({
	transitions:{
		default: Fade,
	    // contextual: {
	    //   overlap: Overlap
	    // }
	}
});

const linksMenu = document.querySelectorAll('nav a');
//listen to the navigate OUT
H.on('NAVIGATE_OUT',({from, trigger,location}) =>{
	closeMenu();
});
//listen to the navegate IN
H.on( 'NAVIGATE_IN', ({ to, location }) => {
	linksMenu.forEach(link => {
		//remove class
		link.classList.remove('active');

		//add class list active
		if(link.href == location.href ){link.classList.add('active');}
	});
});


/*			scroll mobile 			*/
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (!isMobile) {
	const _scroll = new SmoothScroll('scrollContainer','main');
}else{
	document.getElementById('maximusContainer').classList.add('mobile');
	document.getElementById('scrollContainer').classList.add('mobile');
}

/*			MENU 			*/
var anim3 = {
    container: document.getElementById('nav-icon2'),renderer: "svg",loop: false,autoplay: false,
    path: "https://www.studio-sub.com/clientes/frenkel/json/Frenkel-menu-load.json"
};
var anim3 = lottie.loadAnimation(anim3);

var anim1 = {
    container: document.getElementById('nav-icon2'),renderer: 'svg',loop: false,autoplay: false,
    path: 'https://www.studio-sub.com/clientes/frenkel/json/Frenkel-menu-entrada.json'
};
var anim1 = lottie.loadAnimation(anim1);

var anim2 = {
    container: document.getElementById('nav-icon2'),renderer: "svg",loop: false,autoplay: false,
    path: "https://www.studio-sub.com/clientes/frenkel/json/Frenkel-menu-salida.json"
};
var anim2 = lottie.loadAnimation(anim2);

//HEADER
console.log('%cBy @Studio-SUB', 'font-size: 14px;color: #000; border:1px solid #000;');
const menuHamburguer = document.getElementById('menuHamburguer');
const hamburgerIcon = document.getElementById('nav-icon2');
const menuNav = document.getElementById('nav');
const menuNavUl = document.getElementById('navUl');
anim3.play();

let openMenu = () =>{
	hamburgerIcon.classList.add('open');
	menuNav.classList.add('open');
	menuNavUl.classList.add('open');
	anim1.play();
}
let closeMenu = () =>{
	menuNavUl.classList.remove('open');
	setTimeout(()=>{hamburgerIcon.classList.remove('open');menuNav.classList.remove('open');},1000);
	anim2.play();
}
menuHamburguer.addEventListener("change",()=>{
	(menuHamburguer.checked) ? openMenu() : closeMenu() ;
});

setTimeout(()=>{hamburgerIcon.classList.remove('load');},3000);