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
   constructor() {
      super();
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
}

/**
 * Корзина товаров
 */
class Basket extends ProductList {
   constructor(catalog) {
      super();
      this._catalog = catalog;   // Ссылка на каталог товаров
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
      } else {
         console.log("Недостаточное количество товара на складе")
      }
      // Возвращаем this, чтобы иметь возможность выстраивать цепочки вызова
      return this;
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

// -------------
// Проверяем все
// -------------

let products = new Catalog;
let basket = new Basket(products);

// Добавляем товары в каталог
products
   .update(new Product(1, 'Название 01', 10), 2)
   .update(new Product(2, 'Название 02', 20), 5)
   .update(new Product(4, 'Название 04', 30), 2)
   .update(new Product(3, 'Название 03', 40), 10)

console.log(products);

// Добавляем товары из каталога в корзину
basket
   .update(products.findById(2).product, 3)
   .update(products.findById(4).product, 2)

console.log(basket);

// Выводим количество товаров и стоимость
console.log(`В корзине ${basket.getSize()} товаров на сумму ${basket.getSumm()} рублей`);

// Удаляем товар и корзины
basket.delete(basket.findById(4).product)
console.log(basket);