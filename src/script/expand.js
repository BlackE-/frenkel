// Highway
import Highway from '@dogstudio/highway';
// GSAP
// import Tween from 'gsap';
// Expand
class Expand extends Highway.Transition {
  in({ from, to, done }) {
    from.remove();
    // Animation
    gsap.fromTo(from, 0.5,{ opacity: 1 },{opacity: 0,onComplete: done});
  }

  out({ from,trigger, done }) {
    let triggerLink = trigger.getAttribute('id');
    let btn = document.getElementById(triggerLink);
    btn.classList.add('clicked');

    let dialog = document.getElementById(`${triggerLink}Dialog`);
    dialog.style.transformOrigin = `${btn.getAttribute('x')}px ${btn.getAttribute('y')}px`;
    dialog.classList.add('clicked');
    
    setTimeout(()=>{window.scrollTo(0, 0);},2000);
    setTimeout(()=>{done();},3000);
  }
}

export default Expand;