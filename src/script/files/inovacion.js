class Inovacion{
	constructor(){
		this.setTimelines();
	}

	setTimelines = () =>{
		let tl2 = gsap.timeline({scrollTrigger: {trigger: ".awardsSection"}});
		tl2.from("#awardsSection", {opacity: 0,scale:1.2}).to("#awardsSection", {opacity: 1,scale:1, duration: .5})

		let tl3 = gsap.timeline({scrollTrigger: {trigger: ".downloadSection"}});
		tl3.from(".downloadSection .title", {opacity: 0,scale:1.2}).to(".downloadSection .title", {opacity: 1,scale:1, duration: .1})
		.from(".downloadSection .filesContainer a:nth-child(1)", {opacity: 0,scale:1.2}).to(".downloadSection .filesContainer a:nth-child(1)", {opacity: 1,scale:1, duration: .1})
		.from(".downloadSection .filesContainer a:nth-child(2)", {opacity: 0,scale:1.2}).to(".downloadSection .filesContainer a:nth-child(2)", {opacity: 1,scale:1, duration: .1})
		.from(".downloadSection .filesContainer a:nth-child(3)", {opacity: 0,scale:1.2}).to(".downloadSection .filesContainer a:nth-child(3)", {opacity: 1,scale:1, duration: .1})


		let tl4 = gsap.timeline({scrollTrigger: {trigger: ".demoSection"}});
		tl4.from(".demoSection .title", {opacity: 0,scale:1.2}).to(".demoSection .title", {opacity: 1,scale:1, duration: .1})
		.from(".demoSection .filesContainer a:nth-child(1)", {opacity: 0,scale:1.2}).to(".demoSection .filesContainer a:nth-child(1)", {opacity: 1,scale:1, duration: .1})
		.from(".demoSection .filesContainer a:nth-child(2)", {opacity: 0,scale:1.2}).to(".demoSection .filesContainer a:nth-child(2)", {opacity: 1,scale:1, duration: .1})
		.from(".demoSection .filesContainer a:nth-child(3)", {opacity: 0,scale:1.2}).to(".demoSection .filesContainer a:nth-child(3)", {opacity: 1,scale:1, duration: .1})

		let tl5 = gsap.timeline({scrollTrigger: {trigger: ".mailingSection",start: "top center"}});
		tl5.from("#mailingForm", {opacity: 0,scale:1.2}).to("#mailingForm", {opacity: 1,scale:1, duration: 0.05});
	}
}

export default Inovacion;