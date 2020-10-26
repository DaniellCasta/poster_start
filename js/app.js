import PosterAPI from "./PosterAPI.js";
//import Order from "./Order.js";


function init() {
  //Initial loading of date
  PosterAPI.getJSONPoster();
  //PosterAPI.printStars();

  //Search boton starts
  const btnSearch = document.querySelector("#btn-search");
  btnSearch.addEventListener("click", function (e) {
    e.preventDefault();
    PosterAPI.searchPosterFilms();
    PosterAPI.searchFilm();
  });

  //Order botom action
  const btnOrder = document.querySelector("#btn-order");
  btnOrder.addEventListener("click", function (e) {
    saveOrderInStorage();
  });
}


init();
