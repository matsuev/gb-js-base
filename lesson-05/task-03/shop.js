'use strict'

/**
 * Характеристики товара
 */
class Product {
   constructor(id, name, price, imgUri, description)  {
      this._id = id;                   // Уникальный идентификатор товара
      this.name = name;                // Название товара
      this.price = price;              // Цена за единицу товара
      this.imgUri = imgUri;            // Ссылка на изображение товара
      this.description = description;  // Описание товара
      // и другие свойства товара...
      // 
      // Например количество товара в корзине не является
      // характеристикой товара, поэтому здесь его не указываем
   }
}

/**
 * Элемент списка товаров (корзины)
 */
class ProductListItem {
   constructor(product, count) {
      this.product = product;    // Товар
      this.count = count;        // Количество
   }
}

/**
 * Абстрактный список товаров
 */
class ProductList {
   constructor() {
      this._items = []
   }

   /**
    * Функция ищет элемент в списке товаров
    * 
    * @param {Product} product – Экземпляр класса Product
    * @returns 
    */
   _find(product) {
      if (product instanceof Product) {
         return this._items.find(item => item.product === product);
      }
      return null
   }

   /**
    * Функция ищет элемент в списке товаров по уникальному идентификатору
    * 
    * @param {Number} id – Идентификатор товара
    * @returns {Product} – Экземпляр класса Product
    */
   findById(id) {
      return this._items.find(item => item.product._id === id)
   }

   /**
    * Функция обновляет количество товара в списке.
    * Если товар отсутствует, то он будет добавлен в список.
    * 
    * @param {Product} product – Экземпляр класса Product
    * @param {*} count – Количество.
    * В каталоге обозначает остаток товара на складе.
    * В корзине обозначает количество выбранного товара
    * @returns 
    */
   update(product, count) {
      // Проверяем входные аргументы
      if (count >= 0 && product instanceof Product) {
         let item = this._find(product);
         if (item) {
            item.count = count;  // Если товар есть в списке - изменяем количество
         } else {
            this._items.push(
               new ProductListItem(product, count) // Иначе добавляем товар в список
            );
         }   
      } else {
         console.log("ERROR: ProductList.update() – неверно заданы аргументы")
      }
      // Возвращаем this, чтобы иметь возможность выстраивать цепочки вызова
      return this;
   }

   /**
    * Функция удаляет товар из списка
    * 
    * @param {Product} product – Экземпляр класса Product
    * @returns 
    */
   delete(product) {
      // Проверяем аргумент на соответствие типу
      if (product instanceof Product) {
         let idx = this._items.findIndex(item => item.product === product)
         // Если товар присутствует в списке - удаляем его
         if (idx > -1) {
            this._items.splice(idx, 1)
         }   
      }
      // Возвращаем this, чтобы иметь возможность выстраивать цепочки вызова
      return this;
   }
}

/**
 * Каталог товаров
 */
class Catalog extends ProductList {
   constructor(target) {
      super();
      this._target = document.querySelector(target);
      this.render()
   }

   /**
    * Функция проверяет количество товара в каталоге
    * 
    * @param {Product} product – Экземпляр класса Product
    * @param {Number} count - Количество товара
    * @returns {Boolean}
    */
   checkQuantity(product, count) {
      // Проверяем входные аргументы
      if (count >= 0 && product instanceof Product) {
         return this._find(product).count >= count;
      } else {
         return false;
      }
   }

   render() {
      if (!this._target) {
         return;
      }
      this._target.textContent = "";

      this._items.forEach(item => {
         let el = document.createElement("div");
         el.classList.add("catalog-item");

         el.insertAdjacentHTML("beforeend", `
            <img class="product-image" src="${item.product.imgUri ? item.product.imgUri : 'img-placeholder.jpeg'}" />
            <div class="product-container">
            <h2 class="product-name">${item.product.name}</h2>
            <h4>Описание товара:</h4>
            <div class="product-description">${item.product.description ? item.product.description : ""}</div>
            <div class="product-price">Цена: ${item.product.price} руб.</div>
            <button class="product-button" data-productId="${item.product._id}">Купить</button>
            </div>
         `)
         this._target.append(el)
      })
   }

   update(product, count) {
      super.update(product, count);
      this.render();
      return this;
   }

   delete(product) {
      super.delete(product);
      this.render();
      return this;
   }
}

/**
 * Корзина товаров
 */
class Basket extends ProductList {
   constructor(catalog, target) {
      super();
      this._catalog = catalog;   // Ссылка на каталог товаров
      this._target = document.querySelector(target)
      this.render();
   }

   /**
    * Функция обновляет количество товара в корзине.
    * Если товар отсутствует, то он будет добавлен в корзину.
    * 
    * @param {Product} product – Экземпляр класса Product
    * @param {Number} count – Количество товара
    * @returns 
    */
   update(product, count) {
      // Проверяем количество товара в каталоге
      if (this._catalog.checkQuantity(product, count)) {
         super.update(product, count)  // Добавляем товар в корзину
         this.render();
      } else {
         alert("Недостаточное количество товара на складе")
      }
      // Возвращаем this, чтобы иметь возможность выстраивать цепочки вызова
      return this;
   }

   render() {
      if (!this._target) {
         return;
      }
      this._target.textContent = "";


      let el = document.createElement("div");
      el.classList.add("basket-summary");

      let size = this.getSize()
      if (size == 0) {
         el.textContent = "Корзина пуста";
      } else {
         el.textContent = `В корзине: ${size} товаров на сумму ${this.getSumm()} рублей`;
      }
      
      this._target.append(el)

   }

   inc(product) {
      // Проверяем входные аргументы
      if (product instanceof Product) {
         let item = this._find(product);
         if (item) {
            this.update(product, item.count + 1) // Если товар есть в списке - изменяем количество
         } else {
            this.update(product, 1);
         }
      } else {
         console.log("ERROR: ProductList.inc() – неверно заданы аргументы")
      }
   }

   dec(product) {
      // Проверяем входные аргументы
      if (product instanceof Product) {
         let item = this._find(product);
         if (item) {
            if (item.count > 1) {
               this.update(product, item.count - 1)
            }
         }   
      } else {
         console.log("ERROR: ProductList.inc() – неверно заданы аргументы")
      }
   }


   /**
    * Функция возвращает суммарную стоимость всех товаров в корзине
    * 
    * @returns {Number} – Стоимость товаров
    */
   getSumm() {
      return this._items.reduce((summ, item) => summ += item.product.price * item.count, 0)
   }

   /**
    * Функция возвращает количество товаров в корзине
    * 
    * @returns {Number} – Количество товаров
    */
   getSize() {
      return this._items.length
   }
}
