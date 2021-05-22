class MenuBeneficios{
    constructor(wrapper,liItems,sections,itemsReveal){
        this.wrapper = document.getElementById(wrapper);
        this.liItems = [...document.querySelectorAll(liItems)];
		this.sections = [...document.querySelectorAll(sections)];
        this.boxes = [...document.querySelectorAll('.box')];
        this.options = {root: null,rootMargin: '10px',threshold:.6}
        this.observer;
        this.init(); 
    }

    setInViewStyles = (target) => {target.classList.add('is-inview')}
    setOutOfViewStyles = (target) => {
        if(!target.classList.contains('is-inview')){target.classList.remove('is-inview')}
    }

    onIntersect = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {return this.setInViewStyles(entry.target)}
            return this.setOutOfViewStyles(entry.target)
        })
    }

    init = () =>{
    	this.wrapper.addEventListener('click',function(){this.wrapper.classList.toggle('openSelect');}.bind(this),false);
    	this.liItems.forEach((item)=>{
			item.addEventListener("click",function(){
                if(this.wrapper.classList.contains('openSelect')){
                    for(let box of this.boxes){box.classList.remove('is-inview')}
                    for(let i of this.liItems){i.classList.remove('active');}
                    for(let s of this.sections){s.classList.remove('active');}
                    item.classList.add("active");
                    document.getElementById(`content_${item.getAttribute('id')}`).classList.add('active');
                }
			}.bind(this),false);
		});
        this.observer = new IntersectionObserver(this.onIntersect, this.options);
        this.boxes.forEach(el => {this.observer.observe(el)})
    }
}
export default MenuBeneficios;