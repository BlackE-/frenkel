// Highway
import Highway from '@dogstudio/highway';
// Expand
class Expand extends Highway.Transition {
  in({ from, to, done }) {
    from.remove();
    // Animation
    gsap.fromTo(from, 0.5,{ opacity: 1 },{opacity: 0,onComplete: done});
  }

  out({ from,trigger, done }) {
    let triggerLink = trigger.getAttribute('id');
    let btn = document.getElementById(triggerLink).getBoundingClientRect();

    let dialog = document.getElementById(`${triggerLink}Dialog`);
    dialog.style.width = `${btn.width}px`;
    dialog.style.height = `${btn.height}px`;
    dialog.style.top = `${btn.top + window.scrollY}px`;
    dialog.style.left = `${btn.left}px`;
    dialog.classList.add('clicked');

    setTimeout(()=>{window.scrollTo(0, 0);},2000);
    setTimeout(()=>{done();},3000);
  }
}

export default Expand;