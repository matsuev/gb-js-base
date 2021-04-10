/**
 * 6. Реализовать функцию с тремя параметрами:
 * function mathOperation(arg1, arg2, operation),
 * где arg1, arg2 – значения аргументов,
 * operation – строка с названием операции.
 * 
 * В зависимости от переданного значения операции выполнить одну
 * из арифметических операций (использовать функции из пункта 3) (???)
 * (видимо здесь ошибка и я взял функции из п.5)
 * и вернуть полученное значение (использовать switch).
 */

function mathOperation(arg1, arg2, operation) {
   switch (operation.toLowerCase()) {
      case 'summ':
         return summ(arg1, arg2);
      case 'diff':
         return diff(arg1, arg2);
      case 'mult':
         return mult(arg1, arg2);
      case 'div':
         return div(arg1, arg2);
   }
}

console.log(mathOperation(3, 7, 'summ'))  // 10
console.log(mathOperation(3, 7, 'diff'))  // -4
console.log(mathOperation(3, 7, 'mult'))  // 21
console.log(mathOperation(3, 7, 'div'))   // 0.42857142857142855

function summ(a, b) {
   return a + b;
}

function diff(a, b) {
   return a - b;
}

function mult(a, b) {
   return a * b;
}

function div(a, b) {
   return a / b;
}