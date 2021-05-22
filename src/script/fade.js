//import highway
import Highway from '@dogstudio/highway';
//import gsap
// import Tween from 'gsap';
		
//fade class
class Fade extends Highway.Transition{
	//index -> about
	in( { from, to, done }){
		//about PAGE GOING IN
		//remove the old content
		from.remove();
		// Reset Scroll
		window.scrollTo(0, 0);

		//animation
		gsap.fromTo( to , 0.5, {opacity:0} , {opacity:1, onComplete:done});

	}

	out( { from, done } ){

		//index PAGE FOUND OUT
		//animation
		// done();
		// gsap.fromTo( from, 0.5, {opacity:1}, {opacity:0,  onComplete:done});
		gsap.fromTo( from, 0.5, {opacity:1}, {opacity:0});
		setTimeout(()=>{
			done();
		},2000);
	}
}

export default Fade;