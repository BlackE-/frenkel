//import highway
import Highway from '@dogstudio/highway';
//import gsap
// import Tween from 'gsap';
		
//fade class
class Fade extends Highway.Transition{
	//index -> about
	in( { from, to, done }){
		//about PAGE GOING IN
		// Reset Scroll
    	window.scrollTo(0, 0);

		//remove the old content
		from.remove();

		//animation
		gsap.fromTo( to , 0.5, {opacity:0} , {opacity:1, onComplete:done});

	}

	out( { from, done } ){
		//index PAGE FOUND OUT
		//animation
		// done();
		gsap.fromTo( from, 0.5, {opacity:1}, {opacity:0, onComplete:done});
	}
}

export default Fade;