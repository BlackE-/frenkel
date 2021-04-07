/*estos imports estan como scripts en el footer
// import Glide from '@glidejs/glide';
// import { gsap } from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
*/

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

gsap.registerPlugin(ScrollTrigger);
// yes, we can add it to an entire timeline!
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