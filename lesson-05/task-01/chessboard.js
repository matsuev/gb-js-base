'use strict'

/**
 * Шахматная доска
 */
class ChessBoard {
   constructor() {
      this._target = null;
      this._letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
   }

   /**
    * Функция ресует шахматную доску
    * 
    * @param {String} target – Селектор элемента, внутри которого выводится шахматная доска
    */
   drawTo(target) {
      this._target = document.querySelector(target);
      if (this._target) {
         this._target.append(this._newBoard());
      } else {
         console.log(`ChessBoard ERROR: No element matched "${target}" in document`);
      }
   }

   /**
    * Функция возвращает DOM Element, содержащий шахматную доску
    * 
    * @returns {Element}
    */
   _newBoard() {
      const board = document.createElement("div");
      board.classList.add("chessboard");

      board.append(this._newRow());       // Добавляем ряд текстовых меток
      for (let i = 8; i > 0; i--) {
         board.append(this._newRow(i));   // Добавляем ряды шахматной доски
      }
      board.append(this._newRow());       // Добавляем ряд текстовых меток

      return board;
   }

   /**
    * Функция возвращает DOM Element, содержащий один ряд шахматной доски
    * 
    * @param {Number} num – Число, обозначает номер ряда на шахматной доске.
    * Если не задано, тогда формируется ряд символьных меток
    * @returns {Element}
    */
   _newRow(num) {
      const row = document.createElement("div");
      row.classList.add("chessboard-row");

      row.append(this._newCell("label", num));  // Добавляем ячейку с числовой меткой (или пустую ячейку)
      if (num) {     // Добавляем ячейки шахматной доски
         for (let i = 1; i < 9; i++) {
            let cellType = ((i + num) % 2 === 0) ? "white" : "black";
            row.append(this._newCell(cellType));
         }
      } else {       // Добавляем ячейки с текстовыми метками
         this._letters.forEach(letter => row.append(this._newCell("label", letter)));
      }
      row.append(this._newCell("label", num));  // Добавляем ячейку с числовой меткой (или пустую ячейку)
      return row;
   }

   /**
    * Функция возвращает DOM Element, содержащий одну ячейку шахматной доски
    * 
    * @param {String} type - Тип (CSS класс) ячейки
    * @param {Number|String} content – Число - номер горизонтального ряда
    * или символ - номер вертикального ряда 
    * @returns 
    */
   _newCell(type, content="") {
      const cell = document.createElement("div");
      cell.classList.add("chessboard-cell", "cell-" + type.toLowerCase());
      cell.textContent = content;

      return cell;
   }
}


const chessBoard = new ChessBoard;
chessBoard.drawTo("#chessBoard");
