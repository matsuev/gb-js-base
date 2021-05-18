'use strict'

class Coord {
   constructor (x, y) {
      this.set(x, y);
   }

   set(x, y) {
      this.x = x;
      this.y = y;
   }

   checkIntersect (position) {
      return position.x == this.x && position.y == this.y;
   }
}


class Snake {
   constructor (selector, width = 21, height = 21) {
      this._el = document.querySelector(selector);
      if (!this._el) {
         console.log(`SNAKE ERROR: element with selector "${selector}" not found`);
         return;
      }

      if (width < 7 || height < 7) {
         console.log(`SNAKE ERROR: minimum game area is [7x7] segments`);
         return;
      }
      
      this._board = [];                         // игровое поле
      this._size = new Coord(width, height);    // размер игрового поля
      
      this._body = [];                          // массив сегментов тела
      this._initBody();

      this._vector = new Coord(0, -1);          // вектор смещения за один шаг
      this._target = null;                      // координаты цели

      this._timerId = null;                     // таймер
      this._delay = 200;                        // задержка
      this._lastKey = "";                       // код последней нажатой клавиши
      this._ready = false;                      // игра инициализирована
      this._runnung = false;                    // игра запущена

      this._initBoard();
   }


   // Функция возвращает указатель на голову змейки
   _head() {
      return this._body[0];
   }


   // Функция инициализирует тело змейки
   _initBody() {
      for (let i = Math.floor(this._size.y / 2); i < this._size.y; i++) {
         this._body.push(new Coord(Math.floor(this._size.x / 2), i));
      }
   }


   // Функция рисует игровое поле, инициализирует массив DOM элементов
   // и добавляет обработчик нажатия клавиш
   _initBoard() {
      this._el.classList.add('snake-game');
      for (let i = 0; i < this._size.y; i++) {
         let row = document.createElement('div');
         for (let j = 0; j < this._size.x; j++) {
            row.appendChild(document.createElement('div'));
         }
         this._el.appendChild(row);
         this._board.push(this._el.children[i].children);
      }
      document.addEventListener('keydown', (e) => this._keydown(e));
      this._ready = true;
   }


   // Функция проверяет направление движения
   // и сохраняет код последней нажатой клавиши
   _keydown(e) {
      if ((this._vector.x !== 0 && (e.code == 'ArrowUp' || e.code === 'ArrowDown')) ||
         (this._vector.y !== 0 && (e.code == 'ArrowLeft' || e.code === 'ArrowRight'))) {
         this._lastKey = e.code;
      }
   }


   // Проверяем, какая клавиша нажата и изменяем направление движения
   _keySwith() {
      switch (this._lastKey) {
         case 'ArrowRight':
            this._vector.set(1, 0);
            break;
         case 'ArrowLeft':
            this._vector.set(-1, 0);
            break;
         case 'ArrowDown':
            this._vector.set(0, 1);
            break;
         case 'ArrowUp':
            this._vector.set(0, -1);
      }
      this._lastKey = "";
   }


   // Функция устанавливает CSS Class для определенной позиции игрового поля
   _drawSegment(position, cssClass) {
      this._board[position.y][position.x].className = cssClass;
   }


   // Функция рисует тело змейки
   _drawBody() {
      this._body.map((segment, index) => index ? this._drawSegment(segment, "body") : this._drawSegment(segment, "head"))
   }


   // Функция проверяет пересечение тела змейки с объектом
   _checkBodyIntersect(position) {
      return this._body.reduce((result, segment) => result || segment.checkIntersect(position), false);
   }


   // Функция проверяет выход координаты головы за границу 
   // игрового поля и возвращает новую координату
   _getHeadCoord(current, vector, max) {
      let coordinate = current + vector;
      if (coordinate < 0) {
         return --max;
      }
      if (coordinate >= max) {
         return 0;
      }
      return coordinate;
   }


   // Функция возвращает случайную координату
   _getRandomCoord(max) {
      return Math.round(Math.random() * (max - 1))
   }


   // Функция возвращает новую позицию головы змейки
   _newHeadPosition() {
      return new Coord(
         this._getHeadCoord(this._head().x, this._vector.x, this._size.x),
         this._getHeadCoord(this._head().y, this._vector.y, this._size.y)
      )
   }


   // Функция инициализирует цель в случайной позиции.
   // Проверяем, что новые координаты не совпадают с телом змейки
   _initNewTarget() {
      do {
         this._target = new Coord(
            this._getRandomCoord(this._size.x),
            this._getRandomCoord(this._size.y)
         )
      } while (this._checkBodyIntersect(this._target));
      this._drawSegment(this._target, "target");
   }


   // Функция инициализирует новую цель
   // и немного увеличивает скорость движения
   _takeTarget() {
      this._initNewTarget();
      if (this._delay >= 75) {
         this._delay -= 5;
      }
   }


   // Основной цикл игры
   _loop() {
      this._keySwith();

      let newHeadPosition = this._newHeadPosition();

      // Если голова змейки пересекается с телом, завершаем игру
      if (this._checkBodyIntersect(newHeadPosition)) {
         this._runnung = false;
         alert("Game over");
         return;
      }

      // Если координаты головы совпадают с координатами цели,
      // тогда увеличиваем длину змейки на один сегмент
      // и немного увеличиваем скорость движения
      if (this._head().checkIntersect(this._target)) {
         this._takeTarget();
      } else {
         this._drawSegment(this._body.pop(), "");
      }
      this._body.unshift(newHeadPosition);
      this._drawBody();

      if (this._runnung) {
         this._timerId = setTimeout(() => this._loop(), this._delay);
      }
   }


   // Функция стартует игру
   run() {
      if (!this._ready) {
         return;
      }
      this._runnung = true;
      this._initNewTarget();
      this._loop();
   }
}
