'use strict'

/**
 * 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
 */

/**
 * Вариант "в лоб" с использованием вложенных циклов While не самый оптимальный,
 * поскольку он потребует выполнения лишних операций вычисления.
 * Но все равно рассмотрим его, т.к. тема занятия - использование циклов.
 */

 let i = 2;

 while (i <= 100) {
    let j = 2;
    let isSimple = true;
    while (j < i && isSimple) {
       isSimple = i % j !== 0;
       j++;
    }
    if (isSimple) {
       console.log(i);
    }
    i++;
 }


 /**
  * Более оптимальным является алгоритм вычисления на основе следующего
  * свойства простых чисел: простым является число, которое не делится
  * нацело на предыдущие ему простые числа. Т.е. можно построить ряд
  * простых чисел и проверять делимость только на числа из этого ряда.
  * 
  * Это позволит избежать лишних операций вычисления.
  */


 /**
  * Функция возвращает массив простых чисел не превышающих значение n.
  * Вариант функции с использованием цикла While.
  */

function getSimpleNumbers1(n) {
   let i = 1;
   let numbers = [];
   while (++i <= n) {
      if (numbers.reduce((isSimple, item) => isSimple && (i % item !== 0), true)) {
         numbers.push(i);
      }
   }
   return numbers;
}

console.log(getSimpleNumbers1(100));
// getSimpleNumbers1(100).forEach(item => console.log(item));

/**
 * Вариант функции с использованием цикла for получается еще немного проще.
 */

function getSimpleNumbers2(n) {
   let numbers = [];
   for (let i = 2; i <= n; i++) {
      if (numbers.reduce((isSimple, item) => isSimple && (i % item !== 0), true)) {
         numbers.push(i);
      }
   }
   return numbers;
}

console.log(getSimpleNumbers2(100));
// getSimpleNumbers2(100).forEach(item => console.log(item));
