    class SmoothScroll {
      constructor() {
        this.bindMethods();
        this.data = {ease: 0.085, current: 0,last: 0 };
        this.dom = {el: document.querySelector('[data-scroll]'),content: document.querySelector('[data-scroll-content]') };
        this.rAF = null;
        this.hasReachBottom = false;
        this.init();
      }

      bindMethods() {['scroll', 'run', 'resize'].forEach(fn => this[fn] = this[fn].bind(this));}

      setStyles() {
        this.dom.el.style.position = 'fixed';
        this.dom.el.style.top = 0;
        this.dom.el.style.left = 0;
        this.dom.el.style.height = '100%';
        this.dom.el.style.width = '100%';
        this.dom.el.style.overflow = 'hidden';
      }

      setHeight() {
        setTimeout(()=>{document.body.style.height = `${this.dom.content.clientHeight}px`;},500);
        // document.body.style.height = `${this.dom.content.offsetHeight}px`;
      }

      resize() {
        this.setHeight();
        this.scroll();
      }


      scroll() {
        if(!this.hasReachBottom){
          let scrollHeight = document.clientHeight;
          let scrollPosition = window.innerHeight + window.scrollTop;
          if ((scrollHeight - scrollPosition) / scrollHeight != 0) {
              // when scroll to bottom of the page
              this.hasReachBottom = true;
              this.setHeight();
          }
        }
    
        this.data.current = window.scrollY;
      }

      lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
      }

      run() {
        this.data.last = this.lerp(this.data.last, this.data.current, this.data.ease);
        this.data.last = Math.floor(this.data.last * 100) / 100;
        const diff = this.data.current - this.data.last;
        const acc = diff / window.innerWidth;
        const velo = +acc;
        this.dom.content.style.transform = `translate3d(0, -${this.data.last.toFixed(0)}px, 0) `;
        this.requestAnimationFrame();
      }

      on(requestAnimationFrame = true) {
        this.setStyles();
        this.setHeight();
        this.addEvents();

        requestAnimationFrame && this.requestAnimationFrame();
      }

      off(cancelAnimationFrame = true) {
        cancelAnimationFrame && this.cancelAnimationFrame();
        this.removeEvents();
      }

      requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.run);
      }

      cancelAnimationFrame() {cancelAnimationFrame(this.rAF);}
      destroy() {
        document.body.style.height = '';
        this.data = null;
        this.removeEvents();
        this.cancelAnimationFrame();
      }

      addEvents() {
        window.addEventListener('resize', this.resize, { passive: true });
        window.addEventListener('scroll', this.scroll, { passive: true });
      }

      removeEvents() {
        window.removeEventListener('resize', this.resize, { passive: true });
        window.removeEventListener('scroll', this.scroll, { passive: true });
      }

      init() {
        this.on();
      }
    }

    export default SmoothScroll;