class MenuServicios{
    constructor(liElements, liTitle, liText, swiperArea, box){
        this.isMobile = this.mobileCheck();
        //menu
        this.liElements  =  typeof (liElements) ===  'string'  ?  document.querySelectorAll(liElements) : liElements;
        this.liText = typeof (liText) ===  'string'  ? document.querySelectorAll(liText) : liText;
        this.liTitle = typeof (liTitle) ===  'string'  ? document.querySelector(liTitle) : liTitle;
        this.swiperArea = typeof(swiperArea) === 'string' ? document.querySelector(swiperArea) : swiperArea;

        //
        this.titleMap = new Map();
        this.titleMap.set(0, 'IT & Desarrollo de Software');
        this.titleMap.set(1, 'Automatización y Control');
        this.titleMap.set(2, 'Consultoría y Asesoría de Ingeniería');
        this.titleMap.set(3, 'Industry 4.0 Solutions');
        this.titleMap.set(4, 'Ingeniería de Proceso');
        this.numberOfElements = this.liElements.length;
        this.slice = 360 * (1/this.numberOfElements);
        this.start = -this.slice;
        this.extraAngle = (this.isMobile) ? 90 : 0; //rotate circle by 90deg
        this.counter = -1;
        this.clicked = 0;
        this.prevClicked = 0;
        this.dragX = 0;
        this.dragY = 0;
        this.xDown = null;
        this.yDown = null;
        this.wasRight = false;

        //boxes
        this.boxes = [...document.querySelectorAll(box)];
        if(this.isMobile){
          this.options = {root: null,rootMargin: '10px',threshold:.6}
          this.observer = new IntersectionObserver(this.onIntersect, this.options);
          this.boxes.forEach(el => {this.observer.observe(el)})         
        }  
        this.init();
        window.addEventListener('resize',function(){this.extraAngle = (window.innerWidth < 660) ? 90 : 0;this.rotateMenu();}.bind(this),false);  
    }
    setInViewStyles = (target,sec) => {target.classList.add('is-inview');}
    setOutOfViewStyles = (target) => {if(!target.classList.contains('is-inview')){target.classList.remove('is-inview')}}
    onIntersect = (entries) => {entries.forEach((entry,index) => {if (entry.isIntersecting) {return this.setInViewStyles(entry.target,index)}return this.setOutOfViewStyles(entry.target)})}

    handleTouchMove  = (evt) => {
      if(this.isMobile){
        if (!this.xDown) {return;}
        let  xUp  =  evt.touches[0].clientX;
        this.xDiff  = this.xDown  -  xUp;
        if (Math.abs(this.xDiff) !==  0) {
            if (this.xDiff  >  2) {this.onRight();          
            } else  if (this.xDiff  <  -2) {this.onLeft();   
          }
        }

      }else{
        if (!this.yDown) {return;}
        let  yUp  =  evt.clientY;
        this.yDiff  = this.yDown  -  yUp;
        if (Math.abs(this.yDiff) !==  0) {
            if (this.yDiff  >  2) {         this.onLeft();
            } else  if (this.yDiff  <  -2) {this.onRight(); 
          }
        }
      }
      // Reset values.
        this.xDown  =  null;
        this.yDown  =  null;
    }
    onLeft  = () => {
        this.wasRight = 0;
        console.log(`onleft ${this.prevClicked} - ${this.clicked}`);
        this.prevClicked = this.clicked;
        switch(this.prevClicked){case 0:this.clicked = 1;break;case 1:this.clicked = 2;break;case 2:this.clicked = 3;break;case 3:this.clicked = 4;break;case 4:this.clicked = 0;break;}
        console.log(`beforeSETMENU ${this.prevClicked} - ${this.clicked}`);
        this.setMenu();
        this.prevClicked = this.clicked;
    }
    onRight  = () => {
        this.wasRight = 1;
        this.prevClicked = this.clicked;
        switch(this.prevClicked){case 0:this.clicked = 4;break;case 1:this.clicked = 0;break;case 2:this.clicked = 1;break;case 3:this.clicked = 2;break;case 4:this.clicked = 3;break;}
        this.setMenu();
        this.prevClicked = this.clicked;
    }

    setRight = () => {this.counter++; this.start = (this.slice * this.counter); this.wasRight = true; }
    setLeft = () => { this.counter--; this.start = (this.slice * this.counter); this.wasRight = false;}
    setMenu = () =>{
      if(this.prevClicked != this.clicked){
        if(this.prevClicked == this.liElements.length - 1 && this.clicked == 0)  this.setLeft() //left 1
        else
          if(this.prevClicked == 0 && this.clicked == this.liElements.length - 1)//right 2
            this.setRight();
          else 
            if(this.prevClicked < this.clicked)  this.setLeft();//left 3
            else this.setRight(); //right 3
      }else{
        if(this.wasRight) this.setLeft();
        else this.setRight();
      }
      this.setTitle();
      this.setMenuActive();
      this.setBoxesActive();
      this.rotateMenu();
      return;
    }

    setTitle = () => {this.liTitle.innerHTML = this.titleMap.get(this.clicked);}
    rotateMenu = () =>{
      const radius = (window.innerWidth < 660) ? '8em' : '15em';
      const scale = (window.innerWidth < 660) ? '1.2' : '1.5';
      Object.entries(this.liElements).forEach(([key, value]) => {
          let rotate = this.slice * key + this.start + this.extraAngle;
          let rotateReverse = rotate * -1;
          if(value.classList.contains('active'))
            value.style.transform = `rotate(${rotate}deg)  translate(${radius}) rotate(${rotateReverse}deg) scale(${scale}) `;
          else 
            value.style.transform = `rotate(${rotate}deg)  translate(${radius}) rotate(${rotateReverse}deg)`;
      });
    }
    setMenuActive = () =>{
      this.liElements.forEach((item)=>{
        if(item.getAttribute('id') == this.clicked) item.classList.add('active');
        else item.classList.remove('active');
      });
    }
    setBoxesActive = () =>{
      this.liText.forEach((item)=>{
          let idText = `text${this.clicked}`;
          if(item.getAttribute('id') == idText)item.classList.add('active');
          else item.classList.remove('active');
      });

      for(let box of this.boxes){box.classList.remove('is-inview')}
      let boxesActive;
      if(!this.isMobile){
        this.liText.forEach((item)=>{if(item.classList.contains('active')){boxesActive = item.children[0].children[0].children;}});
        for(let i= 0; i < boxesActive.length; i++){
          boxesActive[i].classList.add('is-inview');
          boxesActive[i].style.animationDuration = `${.2 * (i+1)}s`;
        }
      }
    }

    init = () =>{
      if(!this.isMobile){
          Object.entries(this.liElements).forEach(([key, value]) => {
            value.addEventListener("click",function(){
              if(!value.classList.contains('active')){
                this.clicked = parseInt(value.getAttribute('id'));
                this.setMenu();
                this.prevClicked = this.clicked;
              }
            }.bind(this), false); 
          });
      }
      this.swiperArea.addEventListener('touchstart', function (evt) {evt.preventDefault();this.xDown  =  evt.touches[0].clientX;this.yDown = evt.touches[0].clientY;}.bind(this), false);
      this.swiperArea.addEventListener('touchmove', function (evt) {this.handleTouchMove(evt);}.bind(this), false);
      this.swiperArea.addEventListener('mousedown', function (evt) {
        let same = false;
        evt.preventDefault();
        Object.entries(this.liElements).forEach(([key, value]) => {if( evt.target  == value ){same = true;return}});
        if(!same){this.xDown = evt.clientX;this.yDown = evt.clientY;}
      }.bind(this), false);
      this.swiperArea.addEventListener('mousemove', function (evt) {this.handleTouchMove(evt);}.bind(this), false);
      this.rotateMenu();
      setTimeout(()=>{
          this.liElements[0].classList.add('active');
          this.liText[0].classList.add('active');
          this.setMenu();
      },500);

    }


    mobileCheck = () =>{
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      if(window.innerWidth < 700){check = true;}
      return check;
    }
}

export default MenuServicios;