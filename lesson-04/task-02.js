'use strict'

// Product - информация о товаре
class Product {
   constructor (name, price, count) {
      // TODO - Неплохо бы добавить проверку аргументов
      this.name = name;
      this.price = price;
      this.count = count;
   }

   // Функция возвращает стоимость товара (цена * количество)
   getSumm() {
      return this.price * this.count;
   }
}

// Basket - корзина товаров
class Basket {
   constructor() {
      this.items = []
   }

   // Функция добавляет товар в корзину
   add(item) {
      // TODO - добавить проверку типа аргумента
      this.items.push(item);
      return this;
   }

   // Функция возвращает общую стоимость всех товаров в корзине
   calcPrice() {
      return this.items.reduce((summ, item) => summ += item.getSumm(), 0);
   }
}

let basket = new Basket

basket
   .add(new Product('Название 1', 100, 1))
   .add(new Product('Название 2', 150, 1))
   .add(new Product('Название 3', 25.5, 2))
   .add(new Product('Название 4', 30.75, 3))
   .add(new Product('Название 5', 50, 1))

console.log(basket)
console.log("Общая стоимость товаров в корзине:", basket.calcPrice())
