import PosterAPI from "./PosterAPI.js";
import {saveOrderInStorage} from "./order-func.js"

function init() {
  //Initial loading of date
  PosterAPI.getJSONPoster();

  //Search a film by name
  const btnSearch = document.querySelector("#btn-search");
  btnSearch.addEventListener("click", function (e) {
    e.preventDefault();

    //PosterAPI.searchPosterFilms();
    PosterAPI.searchFilm();
  });

  // Action when user orders a poster
  const btnOrder = document.querySelector("#btn-order");
  btnOrder.addEventListener("click", function (e) {
    e.preventDefault();
    saveOrderInStorage();
  });

  // Action when user changes the quantity of a poster order (modal window)
  const fieldQuatity = document.querySelector("#order_quantity");
  fieldQuatity.addEventListener("change", function (e) {
    let postPrice = document.querySelector("#order_price");
    let priceTotal =
      parseInt(this.value, 10) *
      parseFloat(postPrice.getAttribute("data-price"), 10);
    postPrice.value = priceTotal;
  });
}

init();
