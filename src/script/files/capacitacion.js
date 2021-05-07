class Capacitacion{
	constructor(){
		this.cursos = [...document.getElementsByClassName('inscribirse')];
		this.capacitacionForm = document.getElementById('capacitacionForm');
		this.cursos.forEach(function(item){
			item.addEventListener("click",function(){
				let topScroll = document.getElementById('formSection').getBoundingClientRect().top
				scrollTo({top: topScroll,behavior: 'smooth'});
				document.getElementById('cursos').value = item.getAttribute('id');
			});
		});
		this.mailingForm = document.getElementById("mailingForm"); 
		this.responseMailing = document.getElementById("responseMailing"); 
		this.capacitacionForm = document.getElementById("capacitacionForm"); 
		this.responseCapacitacion = document.getElementById('responseCapacitacion');
		this.setTimelines();
		this.init();
	}

	setTimelines(){
		let tl5 = gsap.timeline({scrollTrigger: {trigger: ".mailingSection",start: "top center"}});
		tl5.from("#mailingForm", {opacity: 0,scale:1.2}).to("#mailingForm", {opacity: 1,scale:1, duration: 0.5});


		let tl6 = gsap.timeline({scrollTrigger: {trigger: ".formSection",start: "top center"}});
		tl6.from("#capacitacionForm div", {opacity:0,scale:1.2}).to("#capacitacionForm div",{opacity:1,scale:1,stagger: .5,duration:0.05 });
	}

	validateName(name){return /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);}
	validateEmail(email){return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);}
	validatePhone(phone){return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/.test(phone);}
	validateCurso(curso){return (curso == 0) ? false: true;}
	setMessageCapacitacion(message){this.responseCapacitacion.innerHTML = message;return}
	setMessageMailing(message){this.responseMailing.innerHTML = message;return}

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
	    xhttp.send(`email=${emailForm.value}&origin=mailingCapacitacion&today=${new Date()}`);
	}

	submitCapacitacionForm(){
		this.setMessageCapacitacion('');
		const response = document.getElementById('responseCapacitacion');
		const nameForm = this.capacitacionForm.elements['name'];
		const phoneForm = this.capacitacionForm.elements['phone'];
		const emailForm = this.capacitacionForm.elements['email'];
		const mensajeForm = this.capacitacionForm.elements['message'];
		const cursoForm = this.capacitacionForm.elements['cursos'];
		if(!this.validateEmail(emailForm.value)){this.setMessageCapacitacion("Email inválido");return false;}
		if(!this.validateName(nameForm.value)){this.setMessageCapacitacion("Nombre inválido");return false;}
		if(!this.validatePhone(phoneForm.value)){this.setMessageCapacitacion("Teléfono inválido");	return false;}
		if(!this.validateCurso(cursoForm.value)){this.setMessageCapacitacion("Selecciona un curso");return false;}
		
		this.capacitacionForm.submit.disabled = false;
		var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                response.innerHTML = `Gracias, hemos guardado tu datos, te enviaremos lo antes posible la información del curso`;	
                setTimeout(function(){response.innerHTML = '';this.capacitacionForm.reset();},3000);
             }
             if (this.readyState == 4 && this.status == 400) {
             	this.capacitacionForm.submit.disabled = true;
                response.innerHTML = errorMessage.message;
             }
         }
         xhttp.open("POST", "include/capacitacionForm.php", true);
         xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
         xhttp.send(`name=${nameForm.value}&phone=${phoneForm.value}&email=${emailForm.value}&message=${mensajeForm.value}&curse=${cursoForm.value}&today=${new Date()}`);
	}

	init(){	
		this.capacitacionForm.addEventListener("submit", function(event){event.preventDefault();this.submitCapacitacionForm();}.bind(this),false);
		this.mailingForm.addEventListener("submit", function(event){event.preventDefault();this.submitMailingForm();}.bind(this),false);
	}
}

export default Capacitacion;