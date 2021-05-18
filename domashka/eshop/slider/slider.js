class Slider {
   constructor() {
      this._current = null;
      
      this._el = document.createElement('div');
      this._el.classList.add('slider');

      const template = `
         <div class="slider-window">
            <div class="slider-window__viewport"></div>
            <div class="slider-window__prev"><span>&#10094;</span></div>
            <div class="slider-window__next"><span>&#10095;</span></div>
            <div class="slider-window__close">&#x2715</div>
         </div>
      `
      this._el.insertAdjacentHTML('afterbegin', template);

      this._el.querySelector(".slider-window__close").addEventListener("click", () => this.hide());
      this._el.querySelector(".slider-window__prev").addEventListener("click", () => this._prev());
      this._el.querySelector(".slider-window__next").addEventListener("click", () => this._next());
      document.addEventListener("keydown", (e) => this._keydown(e));

      this._viewport = this._el.querySelector(".slider-window__viewport");
      this.hide();

      document.body.appendChild(this._el);
   }


   show(images, current = 0) {
      if (!Array.isArray(images)) {
         console.log('SLIDER ERROR: argument "images" is not array');
         return;
      }

      current = parseInt(current);
      if (current < 0 || current >= images.length) {
         console.log('SLIDER ERROR: argument "current" is out of range');
         return;
      }

      images.map((item) => {
         let img = document.createElement("img");
         img.setAttribute("src", item);
         this._viewport.appendChild(img);
      });
      
      this._current = current;
      this._render();
      document.body.style.overflow = "hidden";
      this._el.style.visibility = "visible";
   }


   hide() {
      this._el.style.visibility = "hidden";
      document.body.style.overflow = "";
      this._viewport.textContent = "";
   }


   _prev() {
      this._current = (this._current > 0) ? this._current - 1 : (this._viewport.children.length - 1);
      this._render();
   }


   _next() {
      this._current = (this._current < (this._viewport.children.length - 1)) ? this._current + 1 : 0;
      this._render();
   }


   _render() {
      for (let el of this._viewport.children) {
         el.style.display = "none"
      }
      this._viewport.children[this._current].style.display = "flex";
   }


   _keydown(e) {
      if (this._el.style.visibility === "visible") {
         e.stopPropagation();
         switch (e.code) {
            case 'Escape':
               this.hide();
               break;
            case 'ArrowRight':
               this._next();
               break;
            case 'ArrowLeft':
               this._prev();
               break;
         }
      }
   }
}
