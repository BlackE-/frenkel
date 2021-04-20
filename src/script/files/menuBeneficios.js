class MenuBeneficios{
    constructor(wrapper,liItems,sections){
        this.wrapper = document.getElementById(wrapper);
        this.liItems = [...document.querySelectorAll(liItems)];
		this.sections = [...document.querySelectorAll(sections)];

        this.init(); 
    }

    init = () =>{
    	this.wrapper.addEventListener('click',function(){this.wrapper.classList.toggle('openSelect');}.bind(this),false);
    	this.liItems.forEach((item)=>{
			item.addEventListener("click",function(){
                if(this.wrapper.classList.contains('openSelect')){
                    for(let i of this.liItems){i.classList.remove('active');}
                    for(let s of this.sections){s.classList.remove('active');}
                    item.classList.add("active");
                    document.getElementById(`content_${item.getAttribute('id')}`).classList.add('active');
                }
			}.bind(this),false);
		});
    }
}
export default MenuBeneficios;