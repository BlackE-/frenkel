// Highway
import Highway from '@dogstudio/highway';
// GSAP
// import Tween from 'gsap';
// OVERLAP
class Overlap extends Highway.Transition {
  in({ from, to, done }) {
    from.remove();
    // Animation
    gsap.fromTo(to, 0.5,{ opacity: 0,scale:1.2 },{opacity: 1,scale:1,onComplete: done});

    // // Animation
    // gsap.fromTo(from, 0.5,{ opacity: 1 },{opacity: 0,
    //     onComplete: () => {
    //       // Set New View in DOM Stream
    //       to.style.position = 'static';

    //       // Remove Old View
    //       from.remove();
    //     }
    //   }
    // );

    // Animation
    gsap.fromTo(from, 0.5,{ opacity: 1 },{opacity: 0,onComplete: done});
  }

  out({ from,trigger, done }) {
    let triggerLink = trigger.getAttribute('id');
    document.getElementById(triggerLink).classList.add('clicked');

    // switch(triggerLink){
    //   case 'linkTransitionServicios':
    //     document.getElementById('serviciostransitionPage').classList.add('clicked');
    //   break;
    //   case 'linkTransitionBeneficios':
    //     document.getElementById('beneficiostransitionPage').classList.add('clicked');
    //   break;
    // }
    
    setTimeout(()=>{window.scrollTo(0, 0);},2000);
    setTimeout(()=>{done();},3000);
  }
}

export default Overlap;