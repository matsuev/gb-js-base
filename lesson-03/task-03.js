'use strict'

/**
 * Список товаров в корзине пользователя
 */

const basket = [
   {
      product: 'Название продукта 1',
      count: 1,
      price: 100,
   },
   {
      product: 'Название продукта 2',
      count: 1,
      price: 150,
   },
   {
      product: 'Название продукта 3',
      count: 2,
      price: 25.5,
   },
   {
      product: 'Название продукта 4',
      count: 3,
      price: 15.25,
   },
   {
      product: 'Название продукта 5',
      count: 2,
      price: 50,
   },
]

/**
 * Функция возвращает общую стоимость всех товаров в корзине пользователя. 
 * 
 * @param {Array.<Object>}  basket - Массив, содержащий список товаров
 * @returns {number|NaN} - Общая стоимость товаров или NaN, если аргумент basket не массив
 */
function countBasketPrice(basket) {
   if (Array.isArray(basket)) {
      return basket.reduce((summ, item) => summ += item.price * item.count, 0);
   }
   return NaN;
}

console.log(countBasketPrice(basket))     // 446.75
