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
	// validatePhone(phone){return /^(\+\d{1,2}\s)?\(?\d{2}\)?[\s.-]\d{4}[\s.-]\d{4}$/.test(phone);}
	validatePhone(phone){return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/.test(phone);}
	validateCurso(curso){return (curso == 0) ? false: true;}
	setError(message){this.responseCapacitacion.innerHTML = message;return}

	submitForm(){
		this.setError('');
		const nameForm = this.capacitacionForm.elements['name'];
		const phoneForm = this.capacitacionForm.elements['phone'];
		console.log(phoneForm.value);
		const emailForm = this.capacitacionForm.elements['email'];
		const mensajeForm = this.capacitacionForm.elements['message'];
		const cursoForm = this.capacitacionForm.elements['cursos'];
		if(!this.validateEmail(emailForm.value)){emailForm.setCustomValidity("Email inválido");this.setError("Email inválido");emailForm.reportValidity();   		return false;}
		if(!this.validateName(nameForm.value)){nameForm.setCustomValidity('Nombre inválido');this.setError("Nombre inválido");nameForm.reportValidity();			return false;}
		if(!this.validatePhone(phoneForm.value)){phoneForm.setCustomValidity('Teléfono inválido');this.setError("Teléfono inválido");phoneForm.reportValidity();	return false;}
		if(!this.validateCurso(cursoForm.value)){cursoForm.setCustomValidity('Selecciona un curso');this.setError("Selecciona un curso");cursoForm.reportValidity();return false;}
			

		// var xhttp = new XMLHttpRequest();
  //        xhttp.onreadystatechange = function() {
  //            if (this.readyState == 4 && this.status == 200) {
  //                const res = JSON.parse(this.responseText);
  //               response.innerHTML = `GRACIAS ${res.message}`;
  //               // dataLayer.push({'event': 'EnviarFormularioModal-QuieroMiDescuento-Desktop','landingPage':{'btn_activador':btn_activador}});
  //               setTimeout(function(){response.innerHTML = '';},3000);
  //            }
  //            else{
  //                const errorMessage = JSON.parse(this.responseText);
  //                response.innerHTML = errorMessage.message;
  //            }
  //        };
  //        xhttp.open("POST", "script/enviarFormularioFooter.php", true);
  //        xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
  //        xhttp.send("name="+name.value+"&phone="+itl.getNumber()+"&email="+email.value+"&mensaje="+mensaje.value);

	}

	init(){
		this.capacitacionForm.addEventListener("submit", function(event){event.preventDefault();console.log("submitForm");this.submitForm();}.bind(this),false);  
		// document.querySelector('#capacitacionForm #submit').addEventListener("click", function(event){event.preventDefault();console.log("submitForm");this.submitForm();}.bind(this),false);  
	}
}

export default Capacitacion;