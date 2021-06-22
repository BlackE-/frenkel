class Innovacion{
	constructor(){
		this.modal = document.getElementById('youtubeLightBox');
		this.close = document.getElementById('close');
		this.buttonsModal = [...document.getElementsByClassName('openModal')];
		this.mailingForm = document.getElementById("mailingForm"); 
		this.responseMailing = document.getElementById("responseMailing");
		this.init();
	}

	validateEmail(email){return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);}
	setMessageMailing(message){this.responseMailing.innerHTML = message;return}

	setModal(){
		this.buttonsModal.forEach((button)=>{button.addEventListener("click",(event)=>{event.preventDefault();document.getElementById('youtubeLightBox').classList.add('active');});});
		this.close.addEventListener('click',()=>{this.closeModal();});
		this.modal.addEventListener('click',()=>{this.closeModal();});
	}

	closeModal(){
		this.modal.classList.remove('active');
	}

	submitMailingForm(){
		this.setMessageMailing('');
		const response = document.getElementById('responseMailing');
		const emailForm = this.mailingForm.elements['email'];
		if(!this.validateEmail(emailForm.value)){this.setMessageMailing("Email inválido");return false;}
		
		this.mailingForm.submit.disabled = false;
		var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	         if (this.readyState == 4 && this.status == 200) {
	            response.innerHTML = `Hemos guardado tu información en nuestro mailing list`;	
	            setTimeout(function(){response.innerHTML = '';this.mailingForm.reset();},3000);
	         }
	         if (this.readyState == 4 && this.status == 400) {
	         	this.mailingForm.submit.disabled = true;
	            response.innerHTML = `Ha ocurrido un error, intentarlo nuevamente.`;
	         }
	    }
	    xhttp.open("POST", "include/mailingForm.php", true);
	    xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
	    xhttp.send(`email=${emailForm.value}&origin=mailingInovacion&today=${new Date()}`);
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

	init(){
		this.setTimelines();
		this.setModal();
		this.mailingForm.addEventListener("submit", function(event){event.preventDefault();this.submitMailingForm();}.bind(this),false);
	}
}

export default Innovacion;