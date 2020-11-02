import PosterAPI from "./PosterAPI.js";
//import Order from "./Order.js";


function init() {
  //Initial loading of date
  PosterAPI.getJSONPoster();
  //PosterAPI.buttonFav();
  PosterAPI.sumary();


  //Order botom action
  /*const btnOrder = document.querySelector("#c");
  btnOrder.addEventListener("click", function (e) {
    saveOrderInStorage();
  });*/
  /*$(document).ready(function(){
    $('#btn-order').on('click', function(){
      console.log("ola perola");
    });
  });*/
}


init();
