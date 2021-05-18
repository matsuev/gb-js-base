'use strict'


class Product {
   constructor (id, name, descr, price, images) {
      this.id = id;
      this.name = name;
      this.descr = descr;
      this.price = price;
      this.images = images;
   }
}


class ProductListItem {
   constructor (product, count) {
      this.product = product;
      this.count = count;
   }
}


class ProductList {
   constructor (target) {
      this.items = []
      this.target = document.querySelector(target);
   }

   add (product, count = 1) {
      let item = this.findItemById(product.id);
      if (item) {
         item.count += count;
      } else {
         this.items.push(new ProductListItem(product, count));
      }
      return true;
   }

   remove (product, count = 1) {
      let item = this.findItemById(product.id);
      if (!item || count < 1 || item.count - count < 0) {
         return false;
      } else {
         item.count -= count;
         return true;
      }
   }

   delete (product) {
      let idx = this.findIndexById(product.id);
      if (idx < 0) {
         return false;
      } else {
         this.items.splice(idx, 1);
         return true;
      }
   }

   findItemById (id) {
      return this.items.find((item) => item.product.id == id);
   }

   findIndexById (id) {
      return this.items.findIndex((item) => item.product.id == id);
   }

   getCountById (id) {
      let idx = this.findIndexById(id)
      return idx >= 0 ? this.items[idx].count : undefined;
   }

   show () {
      this.target.style.display = "block";
   }

   hide () {
      this.target.style.display = "none";
   }
}


class Catalog extends ProductList {
   constructor (target) {
      super(target);
   }

   render () {
      if (this.target) {
         let list = this.target.querySelector(".catalog-list");
         list.textContent = "";

         if (this.items.length) {
            this.items.forEach((item) => {
               let template = `<div class="catalog-item"><div class="catalog-item__images">`
               item.product.images.forEach((src, index) => {
                  template += (index > 3) ? "" : `<img src="${src}" data-id="${item.product.id}" data-count="${index}" />`;
               })
               template += `</div>
                     <div class="catalog-item__product">
                        <div class="catalog-item__name">${item.product.name}</div>
                        <div class="catalog-item__descr">${item.product.descr}</div>
                        <div class="catalog-item__price">
                           Цена: ${item.product.price}
                           рубл${numEnding(item.product.price, ["ь", "я", "ей"])}
                        </div>
                        <button class="add-to-cart" data-id="${item.product.id}">В корзину</button>
                     </div>
                  </div>
               `;
               list.insertAdjacentHTML("beforeend", template);
            })
         } else {
            list.insertAdjacentHTML("beforeend", `<p>В каталоге нет товаров</p>`);
         }
      }
   }
}


class Cart extends ProductList{
   constructor (target) {
      super(target);
   }

   getCount() {
      return this.items.length;
   }

   getSumm() {
      return this.items.reduce((summ, item) => summ += (item.count * item.product.price), 0);
   }

   render () {
      if (this.target) {
         let list = this.target.querySelector('.cart-list');
         list.textContent = "";

         if (this.items.length) {
            this.items.forEach((item) => {
               let summ = item.count * item.product.price;
               let template = `
                  <div class="catalog-item">
                     <div class="catalog-item__images">
                        <img src="${item.product.images[0]}" data-id="${item.product.id}" />
                     </div>
                     <div class="catalog-item__product">
                        <div class="catalog-item__name">${item.product.name}</div>
                        <div class="catalog-item__price">
                           Цена: ${item.product.price}
                           рубл${numEnding(item.product.price, ["ь", "я", "ей"])}
                        </div>
                        <div class="cart-item__count">Количество:
                           <span class="cart-item__dec" data-id="${item.product.id}">-</span>
                           <strong>${item.count}</strong>
                           <span class="cart-item__inc" data-id="${item.product.id}">+</span>
                           <span class="cart-item_summ">на сумму ${summ} рубл${numEnding(summ, ["ь", "я", "ей"])}</span>
                        </div>
                        <button class="delete-from-cart" data-id="${item.product.id}">Удалить</button>
                     </div>
                  </div>
               `;
               list.insertAdjacentHTML("beforeend", template);
            });
            let orderSumm = this.getSumm();
            list.insertAdjacentHTML("beforeend", `<div class="cart-summ">
                  Общая сумма заказа: ${orderSumm} рубл${numEnding(orderSumm, ["ь", "я", "ей"])}
               </div>
               <div>
                  <form onsubmit="return false;">
                     <fieldset>
                        <label for="email">Адрес E-Mail</label>
                        <input name="email" type="email" />
                     </fieldset>
                     <fieldset>
                        <label for="addr">Адрес доставки</label>
                        <textarea name="addr"></textarea>
                     </fieldset>
                     <input type="submit" class="cart-order" value="Оформить заказ"/>
                  </form>
               </div>`) 
         } else {
            list.insertAdjacentHTML("beforeend", `<p>В корзине нет товаров</p>`)
         }

      }
   }
}


class CartWidget {
   constructor (target, cart) {
      this.target = document.querySelector(target);
      this.cart = cart;
   }

   render () {
      if (this.target) {
         let count = this.cart.getCount();
         let summ = this.cart.getSumm();

         let widget = document.createElement("div");
         widget.classList.add("cart-widget");
         widget.innerHTML = (count == 0)
            ? "Корзина пуста"
            : `В корзине ${count} товар${numEnding(count, ["", "а", "ов"])}
               на сумму ${summ} рубл${numEnding(summ, ["ь", "я", "ей"])}
               <button class="show-cart">Корзина</button>
            `;
         this.target.textContent = "";
         this.target.appendChild(widget);
      }
   }
}


class Store {
   constructor (elCatalog, elCart, elCartWidget) {
      this.catalog = new Catalog(elCatalog)
      this.cart = new Cart(elCart);
      this.cartWidget = new CartWidget(elCartWidget, this.cart);
      this.slider = null;
   }

   useSlider(slider) {
      this.slider = slider;
   }

   loadFromJson (jsonCatalog) {
      let cat = JSON.parse(jsonCatalog);
      if (Array.isArray(cat)) {
         cat.forEach((item) => this.catalog.add(
            new Product(
               item.product.id,
               item.product.name,
               item.product.descr,
               item.product.price,
               item.product.images
            ), item.count)
         )
      }
   }

   run () {
      this.catalog.target.addEventListener("click", (e) => this.onCatalogClick(e));
      this.cart.target.addEventListener("click", (e) => this.onCartClick(e));
      this.cartWidget.target.addEventListener("click", (e) => this.onCartWidgetClick(e));

      this.catalog.render();
      this.cartWidget.render();
   }

   addToCart (productId) {
      let quantity = this.catalog.getCountById(productId);
      let count = this.cart.getCountById(productId);
      if (count < quantity || !count) {
         if (this.cart.add(this.catalog.findItemById(productId).product)) {
            this.cartWidget.render();
         }   
      } else {
         alert("Недостаточное количество товара на складе");
      }
   }

   removeFromCart (productId) {
      if (this.cart.remove(this.catalog.findItemById(productId).product)) {
         this.cartWidget.render();
      }
   }

   deleteFromCart (productId) {
      if (this.cart.delete(this.catalog.findItemById(productId).product)) {
         this.cartWidget.render();
      }
   }

   onCatalogClick (e) {
      let productId = e.target.dataset.id;

      // Обработка нажатия на кнопку "В корзину"
      if (e.target.classList.contains("add-to-cart")) {
         this.addToCart(productId);
      }

      // Обработка нажатия на изображение товара
      if (this.slider && e.target.tagName == "IMG") {
         this.slider.show(this.catalog.findItemById(productId).product.images, e.target.dataset.count);
      }
   }


   onCartClick (e) {
      // Обработка нажатия кнопки закрытия корзины
      if (e.target.classList.contains("hide-cart")) {
         this.cart.hide();
         this.catalog.show();
      }

      // Обработка нажатия на кнопку увеличения количества товара в корзине
      if (e.target.classList.contains("cart-item__inc")) {
         this.addToCart(e.target.dataset.id);
         this.cart.render();
      }

      // Обработка нажатия на кнопку уменьшения количества товара в корзине
      if (e.target.classList.contains("cart-item__dec")) {
         this.removeFromCart(e.target.dataset.id);
         this.cart.render();
      }

      // Обработка нажатия на кнопку удаления товара из корзины
      if (e.target.classList.contains("delete-from-cart")) {
         if (confirm("Вы действительно хотите удалить этот товар из корзины?")) {
            this.deleteFromCart(e.target.dataset.id);
            this.cart.render();   
         }
      }

      // Обработка нажатия на кнопку оформления заказа
      if (e.target.classList.contains("cart-order")) {
         alert("Ваш заказ оформлен");
      }

   }

   onCartWidgetClick (e) {
      // Обработка нажатия на кнопку "Корзина"
      if (e.target.classList.contains("show-cart")) {
         this.cart.render();
         this.catalog.hide();
         this.cart.show();
      }
   }

}


/**
 * Функция возвращает окончание для множественного числа слова на основании числа и массива окончаний
 * @param {Number} num – Число на основе которого нужно сформировать окончание
 * @param {Array} endings – Массив окончаний для чисел, например ["ь", "я", "ей"] для слов "рубль", "рубля", "рублей"
 * @returns {String}
 */
function numEnding(num, endings) {
   let ending = endings[2];
   if (num < 5 || num > 20) {
      switch (num.toString().substr(-1)) {
         case "1": ending = endings[0]; break;
         case "2":
         case "3":
         case "4": ending = endings[1];
      }   
   }
   return ending;
}

