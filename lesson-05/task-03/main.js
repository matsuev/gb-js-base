// -------------
// Проверяем все
// -------------

const elCatalog = document.querySelector("#catalog")

const catalog = new Catalog("#catalog");
const basket = new Basket(catalog, "#basket");

elCatalog.addEventListener("click", function(event) {
   let el = event.target;
   if (el.classList.contains("product-button")) {
      basket.inc(catalog.findById(parseInt(el.dataset.productid)).product);
   }
})


// Добавляем товары в каталог
catalog
   .update(new Product(1, "Название 01", 10), 2)
   .update(new Product(2, "Название 02", 20, "asus.jpeg", "Какой-то текст с описанием товара"), 5)
   .update(new Product(4, "Название 04", 30), 2)
   .update(new Product(3, "Название 03", 40), 10)
