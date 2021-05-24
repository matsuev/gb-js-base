const jsonCatalog = `
[
   {
      "product": {
         "id": 1,
         "name": "14'' Ноутбук Lenovo Yoga Slim 7 14IIL05 зеленый",
         "descr": "Встречайте 14-дюймовый ноутбук Yoga Slim 7. Его процессор Intel Core 10-го поколения и аккумулятор, поддерживающий до 14 часов автономной работы, позволят вам справиться с любой нагрузкой. Модели с высококачественным дисплеем и объемным звуком Dolby Atmos станут для вас настоящим центром развлечений, а интеллектуальные функции позволят сэкономить время и упростят решение повседневных задач. Высокая производительность в элегантном корпусе.",
         "price": 1,
         "images": [
            "img/img_1_1.jpeg",
            "img/img_1_2.jpeg",
            "img/img_1_3.jpeg",
            "img/img_1_4.jpeg",
            "img/img_1_5.jpeg"
         ]
      },
      "count": 3
   },
   {
      "product": {
         "id": 2,
         "name": "17.3'' Ноутбук ASUS TUF Gaming FX706LI-H7057 черный",
         "descr": "Ноутбук ASUS TUF Gaming FX706LI-H7057 подходит для игр, создания видеороликов, обработки фотографий и других целей. Модель оснащена мощным процессором с 4 ядрами и тактовой частотой 2.5 ГГц. Размер оперативной памяти 16 ГБ обеспечивает быструю скорость загрузки даже в многозадачном режиме. За плавный переход картинки в динамичных сценах отвечает графический ускоритель и частота обновления экрана 120 Гц. Ноутбук ASUS TUF Gaming FX706LI-H7057 диагональю 17.3 дюйма оснащен IPS-матрицей, которая характеризуется естественной и детализированной цветопередачей в формате FullHD. Для удобного управления персонажами есть клавиатура с цифровым блоком и подсветкой. Объем встроенной памяти 512 ГБ позволяет хранить фотографии, фильмы и другие файлы в большом количестве. Расширенная акустическая система позволяет погрузиться в игровой мир и услышать даже мельчайшие шорохи.",
         "price": 2,
         "images": [
            "img/img_2_1.jpeg",
            "img/img_2_2.jpeg",
            "img/img_2_3.jpeg",
            "img/img_2_4.jpeg",
            "img/img_2_5.jpeg",
            "img/img_2_6.jpeg",
            "img/img_2_7.jpeg"
         ]
      },
      "count": 5
   },
   {
      "product": {
         "id": 3,
         "name": "13'' Ультрабук Huawei Matebook 13 WRTB-WAH9L серый",
         "descr": "13'' Ультрабук Huawei Matebook 13 WRTB-WAH9L в корпусе с темно-серым цветовым исполнением получил предустановленную платформу Windows 10 Home и дисплей с наибольшим разрешением 2160x1440 пикселей на основе IPS-матрицы. Данная модель комплектуется процессором Intel Core i5 10210U, 8 ГБ оперативной памяти, отличающимся низким энергопотреблением накопителем SSD вместимостью 512 ГБ в качестве устройства долговременной памяти. Еще одним значимым преимуществом устройства является дискретный видеопроцессор GeForce MX250 для уверенной работы с графическими данными. Отличающийся стильным внешним видом тонкий ультрабук Huawei Matebook 13 WRTB-WAH9L весом всего 1.3 кг оснащается литий-полимерной батареей с наибольшей емкостью 3660 мАч. Получив полный заряд, АКБ обеспечивает автономную работу портативного компьютера на протяжении 10 часов. В комплектацию устройства вошли наружный блок питания и документация.",
         "price": 10,
         "images": [
            "img/img_3_1.jpeg",
            "img/img_3_2.jpeg",
            "img/img_3_3.jpeg",
            "img/img_3_4.jpeg"
         ]
      },
      "count": 30
   },
   {
      "product": {
         "id": 4,
         "name": "13.3'' Ноутбук HP ENVY 13-ba1031ur золотистый",
         "descr": "Благодаря аккумулятору, которого хватает на весь день, вы можете продолжать работать в любое время, где бы вы ни находились. Всего одно нажатие кнопки — и расширенные функции конфиденциальности будут защищать все ваши творения, пока вы не захотите поделиться ими. Оцените потрясающую четкость изображения с любого угла. Благодаря широкому углу обзора 178° и высокому разрешению 1920 x 1080 изображение на экране будет отлично выглядеть с любой стороны.",
         "price": 25,
         "images": [
            "img/img_4_1.jpeg",
            "img/img_4_2.jpeg",
            "img/img_4_3.jpeg",
            "img/img_4_4.jpeg",
            "img/img_4_5.jpeg",
            "img/img_4_6.jpeg",
            "img/img_4_7.jpeg"
         ]
      },
      "count": 20
   },
   {
      "product": {
         "id": 5,
         "name": "14'' Ультрабук Acer Swift 5 SF514-54T-56GP белый",
         "descr": "Ультрабук Acer Swift 5 SF514-54T-56GP, выполненный в компактном и довольно легком металлическом корпусе, станет надежным помощником для работы и учебы. В нем установлены экран диагональю 14 дюймов стандарта FullHD, фирменная акустическая система, клавиатура с подсветкой. Платформа с процессором Intel Core i5 1035G1 и 8 ГБ памяти ОЗУ обеспечивает быструю работу системы при запуске приложений, интернет-страниц, различных файлов. Под размещение данных пользователя предусмотрен накопитель SSD на 256 ГБ. Acer Swift 5 SF514-54T-56GP получил востребованные проводные и беспроводные интерфейсы. Среди функциональных особенностей отмечаются веб-камера высокой четкости, интегрированный сканер отпечатков пальцев и продолжительная автономность на базе аккумулятора с энергоемкостью 4670 мА*ч. Полноценного заряда достаточно для 12 часов работы в непрерывном режиме.",
         "price": 50,
         "images": [
            "img/img_5_1.jpeg",
            "img/img_5_2.jpeg",
            "img/img_5_3.jpeg",
            "img/img_5_4.jpeg"
         ]
      },
      "count": 20
   }
]
`