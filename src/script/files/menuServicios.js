class MenuServicios{
    constructor(liElements,liText,swiperArea){
        this.isMobile = this.mobileCheck();
        this.xDown  =  null;
        this.swiperArea = typeof(swiperArea) === 'string' ? document.querySelector(swiperArea) : swiperArea;
        this.liText = typeof (liText) ===  'string'  ? document.querySelectorAll(liText) : liText;
        this.liElements  =  typeof (liElements) ===  'string'  ?  document.querySelectorAll(liElements) :  liElements;
        this.numberOfElements = liElements.length ;
        this.slice = 360 * (1/this.numberOfElements);

        this.clicked = 0;
        this.prevClicked = 0;  
        this.start = -this.slice;
        this.dragX = 0;
        this.xDown = null;
        this.init();
        window.addEventListener('resize',function(){this.setMenu()}.bind(this),false);  
    }

    setMenu = () =>{
      this.liElements.forEach((item)=>{
        if(item.getAttribute('id') == this.clicked) item.classList.add('active');
        else item.classList.remove('active');});
        this.liText.forEach((item)=>{
          let idText = `text${this.clicked}`;
          if(item.getAttribute('id') == idText)item.classList.add('active');
          else item.classList.remove('active');
      });

      if(this.prevClicked != this.clicked){
        if(this.prevClicked == this.liElements.length - 1 && this.clicked == 0)  this.setLeft() //left 1
        else
          if(this.prevClicked == 0 && this.clicked == this.liElements.length - 1)//right 2
            this.setRight();
          else 
            if(this.prevClicked < this.clicked)  this.setLeft();//left 3
            else this.setRight(); //right 3
        this.rotateMenu();
      }
      return
    }

    rotateMenu = () =>{
      const radius = (window.innerWidth < 660) ? '8em' : '15em';
      Object.entries(this.liElements).forEach(([key, value]) => {
          let rotate = this.slice * key + this.start;
          let rotateReverse = rotate * -1;
          if(value.classList.contains('active'))
            value.style.transform = `rotate(${rotate}deg)  translate(${radius}) rotate(${rotateReverse}deg) scale(1.3) `;
          else 
            value.style.transform = `rotate(${rotate}deg)  translate(${radius}) rotate(${rotateReverse}deg)`;
      });
    }

    handleTouchMove  = (evt) => {
        if (!this.xDown) {
            return;
        }
        let xUp = (evt.type === "touchmove") ?  evt.touches[0].clientX :  evt.clientX;
        this.xDiff  = this.xDown  -  xUp;

        if (Math.abs(this.xDiff) !==  0) {
            if (this.xDiff  >  2) {
                typeof (this.onRight) ===  "function"  && this.onRight();
            } else  if (this.xDiff  <  -2) {
                typeof (this.onLeft) ===  "function"  && this.onLeft();
            }
        }
        // Reset values.
        this.xDown  =  null;
    }

    setRight = () => {this.start += this.slice; return;}
    setLeft = () => {this.start -= this.slice; return;}
    
    onLeft  = () => {
        this.prevClicked = this.clicked;
        switch(this.prevClicked){case 0:this.clicked = 1;break;case 1:this.clicked = 2;break;case 2:this.clicked = 3;break;case 3:this.clicked = 0;break;}
        this.setMenu();
    }
    onRight  = () => {
        this.prevClicked = this.clicked;
        switch(this.prevClicked){case 0:this.clicked = 3;break; case 1:this.clicked = 0;break;case 2:this.clicked = 1;break;case 3:this.clicked = 2;break;}
        this.setMenu();
    }

    initMenu = () =>{ 
      // Object.entries(this.liElements).forEach(([key, value]) => {
      //   value.addEventListener("click",function(){
      //     if(!value.classList.contains('active')){
      //       this.clicked = parseInt(value.getAttribute('id'));
      //       this.setMenu();
      //       this.prevClicked = this.clicked;
      //     }
      //   }.bind(this), false); 
      // });

      this.swiperArea.addEventListener('touchstart', function (evt) {evt.preventDefault();this.xDown  =  evt.touches[0].clientX;}.bind(this), false);
      this.swiperArea.addEventListener('touchmove', function (evt) {this.handleTouchMove(evt);}.bind(this), false);

      this.swiperArea.addEventListener('mousedown', function (evt) {evt.preventDefault();this.xDown = evt.clientX;}.bind(this), false);
      this.swiperArea.addEventListener('mousemove', function (evt) {this.handleTouchMove(evt);}.bind(this), false);
    }

    mobileCheck = () =>{
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }

    init = () =>{
        this.initMenu();
        this.rotateMenu();
        setTimeout(()=>{
            this.start = this.slice;
            this.liElements[0].classList.add('active');
            this.liText[0].classList.add('active');
            this.rotateMenu();
        },500);
    }
}

export default MenuServicios;