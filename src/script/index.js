// import Glide from '@glidejs/glide';
// import Glide from '@glidejs/glide';
//import gsap
// import { gsap } from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// new Glide('.glide', {
//   type: 'carousel',
//   autoplay: 0,
//   animationDuration: 600,
//   animationTimingFunc: 'linear',
//   perView: 2,
//   peek: 300,
//   focusAt: 0,
//   breakpoints: {
//     1080: {
//       perView: 2,
//       peek: 100
//     },
// 		768: {
//       perView: 1,
// 			peek: 200
// 		},
//     460: {
//       perView: 1,
//       peek: 50
//     }
// 	}
// }).mount();

gsap.registerPlugin(ScrollTrigger);
// yes, we can add it to an entire timeline!
let tl = gsap.timeline({scrollTrigger: {trigger: "#firstSectionHome"}});
tl.addLabel("start-Home")
  .from("#firstSectionHomeText span", {opacity: 0,y:-50})
  .to("#firstSectionHomeText span", {opacity: 1,y:0, duration: 0.5})
  .from("#logoHome", {opacity: 0,y:-100})
  .from(".videoContainer", {opacity: 0,x:100})
  .to("#logoHome", {opacity: 1,y:0, duration: 0.5})
  .to(".videoContainer", {opacity: 1,x:0, duration: 0.5})
  .addLabel("end-Home");

// let tl2 = gsap.timeline({scrollTrigger: {trigger: ".sectionCarousel"}});
// tl.addLabel("start-Carousel")
//   .from(".titlesectionCarousel", {opacity: 0,y:-50})
//   .to(".titlesectionCarousel", {opacity: 1,y:0, duration: 0.5})
//   .from(".glideContainer", {opacity: 0,y:-50})
//   .to(".glideContainer", {opacity: 1,y:0, duration: 0.5})
//   .addLabel("end-Carousel");