'use strict'

/**
 * 5. *Нарисовать пирамиду с помощью console.log, как показано на рисунке,
 * только у вашей пирамиды должно быть 20 рядов, а не 5:
 * 
 * x
 * xx
 * xxx
 * xxxx
 * xxxxx
 */


/**
 * Функция рисует в консоли пирамиду, состоящую из numRows строк.
 * Каждая строка состоит из шаблона pattern, повторенного numRows раз.
 * 
 * Если аргумент pattern не является значением типа String,
 * он преобразуется в строку (p = String(pattern)).
 *
 * @param {number} numRows - Количество строк пирамиды.
 * @param {*} pattern - Шаблон из которого будут формироваться ряды пирамиды.
 */

function drawPyramidToConsole(numRows, pattern) {
   let p = String(pattern)
   let lastRowLength = numRows * p.length
   for (let rowStr = p; rowStr.length <= lastRowLength; rowStr += p) {
      console.log(rowStr);
   }   
}

// Рисуем пирамиду из 20-и рядов, шаблоном 'x'
drawPyramidToConsole(20, 'x');

// drawPyramidToConsole(20, ':-)');
// drawPyramidToConsole(10, null);
