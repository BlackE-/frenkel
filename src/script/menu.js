class Menu{
	constructor(menu,icon,nav,ul){
		console.log('%cBy @Studio-SUB', 'font-size: 14px;color: #000; border:1px solid #000;');
		
		this.menu = document.getElementById(menu);
		this.icon = document.getElementById(icon);
		this.nav = document.getElementById(nav);
		this.ul = document.getElementById(ul);

		this.menu.addEventListener('change',()=>{
			(this.menu.checked) ? this.openMenu() : this.closeMenu()
		});

		setTimeout(()=>this.icon.classList.remove('load'), 1500)
	}
	openMenu(){
		this.icon.classList.add('open');
		this.nav.classList.remove('close');
		this.nav.classList.add('open');
		this.ul.classList.add('open');
	}

	closeMenu(){
		this.icon.classList.remove('open');
		this.icon.classList.add('close');
		this.nav.classList.remove('open');
		this.nav.classList.add('close');
	}
}

export default Menu;