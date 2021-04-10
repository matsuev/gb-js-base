'use strict'

/**
 * Возвращает val, возведённое в степень pow или NaN, если переданы
 * неправильные аргументы.
 *
 * @param {number} val Возводимое в степень число.
 * @param {number} pow Степень, должна быть натуральным числом.
 * @returns {(number|NaN)} val, возведённое в степень pow (или NaN)
 */
function power(val, pow) {
   // Если аргументы не являются числами, или показатель степени
   // pow не является натуральным числом, возвращаем значение NaN.
   if (isNaN(val) || isNaN(pow) || pow < 0 || (pow ^ 0) !== pow) {
      return NaN;
   }

   // Любое число в степени 0 равно 1
   if (pow == 0) {
      return 1;
   }

   // Число в степени N равняется числу в степени N-1
   // умноженному на себя (x^n == x^(n-1) * x)
   return val * power(val, pow - 1)
}

console.log(power(2, 5))      // 32
console.log(power(-2, 5))     // -32
console.log(power(2.5, 5))    // 97.65625
console.log(power(-2.5, 5))   // -97.65625

console.log(power(2, -5))     // NaN
console.log(power(2, 5.5))    // NaN

console.log(power('abc', 5))  // NaN
console.log(power(5, 'abc'))  // NaN
