// Do not forget to load
// "store.js", "catalog.js" and "slider.js"

const store = new Store("#catalog", "#cart", "#cartWidget");

store.loadFromJson(jsonCatalog)
store.useSlider(new Slider());
store.run();



// document.querySelector("#show").addEventListener("click", () => {
//    slider.show([
//       'img/img1.jpeg',
//       'img/img2.jpeg',
//       'img/img3.jpeg',
//    ]);
// });


