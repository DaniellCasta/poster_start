class PosterAPI {
  static sumary(sinopsis) {
    if (sinopsis.length > 50) {
      return sinopsis.substring(0, 50) + "...";
    } else if (sinopsis == "undefined" || sinopsis.length == 0) {
      return "No hay sinopsis";
    } else {
      return sinopsis + "...";
    }
  }

  static getJSONStars(stars) {
    let html = "";
    stars.forEach((oStar) => {
      html += `
              <div style="margin: 5px;">
                <div style="color: rgb(0, 255, 255)">
                 Actores :&nbsp
                </div>
                <div class="row" style="margin: 15px;">${oStar.name}&nbsp<p style="color: rgb(204, 0, 0)">como</p>&nbsp${oStar.character}</div>
              </div>
            `;
    });
    return html;
  }

  static getJSONPoster() {
    fetch("./data/json/poster.json")
      .then((result) => result.json())
      .then((data) => {
        let listFilms = data.films;
        let listSeries = data.series;
        PosterAPI.populateFilms(listFilms);
        PosterAPI.populateSeries(listSeries);
      });
  }

  static populateFilms(films) {
    document.querySelector("#list-films").innerHTML = "";
    films.forEach((oFilm) => {
      let card = `
		  <!--Card-->
                  <div class="card mb-4 shadow-sm" data-memory"${
                    oFilm.id
                  }"  style="width: 14rem;">
                    <img src="img/${
                      oFilm.cover
                    }" class="card-img-top" alt="...">
                    <div class="card-body" >
                      <h5 class="card-title">${oFilm.name}</h5>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Sinopsis :&nbsp
                        </div>
                        ${PosterAPI.sumary(oFilm.sinopsis)}
                      </div>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Director :&nbsp
                        </div>
                        ${oFilm.director}
                      </div>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Duración :&nbsp
                        </div>
                        ${oFilm.duration}
                      </div>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Director :&nbsp
                        </div>
                        ${oFilm.price}
                      </div>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Género :&nbsp
                        </div>
                        ${oFilm.genre}
                      </div>
                    <ul class="list-group list-group-flush star">
                      ${PosterAPI.getJSONStars(oFilm.stars)}
                    </ul>
  
                    </div>
                    <!--Us del tooltip i modal -->
                    <button id="btn-buy-${
                      oFilm.id
                    }"  type="button" class="btn btn-primary" data-memory="${
        oFilm.name
      }" data-toggle="modal" data-target="#pedido" title="Pago sólo con paypal">
                    Comprar
                    </button>
        `;
      document.querySelector("#list-films").innerHTML += card;
    });
  }

  static populateSeries(series) {
    document.querySelector("#list-series").innerHTML = "";
    series.forEach((oSerie) => {
      let card = `
		  <!--Card-->
                  <div class="card mb-4 shadow-sm" data-memory"${
                    oSerie.id
                  }"  style="width: 14rem;">
                    <img src="img/${
                      oSerie.cover
                    }" class="card-img-top" alt="...">
                    <div class="card-body" >
                      <h5 class="card-title">${oSerie.name}</h5>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Sinopsis :&nbsp
                        </div>
                        ${PosterAPI.sumary(oSerie.sinopsis)}
                      </div>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Director :&nbsp
                        </div>
                        ${oSerie.director}
                      </div>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Duración :&nbsp
                        </div>
                        ${oSerie.duration}
                      </div>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Director :&nbsp
                        </div>
                        ${oSerie.price}
                      </div>
                      <div class="card-text row" style="margin: 5px">
                        <div style="color: rgb(0, 255, 255)">
                          Género :&nbsp
                        </div>
                        ${oSerie.genre}
                      </div>
                    <ul class="list-group list-group-flush star">
                      ${PosterAPI.getJSONStars(oSerie.stars)}
                    </ul>
  
                    </div>
                    <!--Us del tooltip i modal -->
                    <button id="btn-buy-${
                      oSerie.id
                    }"  type="button" class="btn btn-primary" data-memory="${
                      oSerie.name
      }" data-toggle="modal" data-target="#pedido" title="Pago sólo con paypal">
                    Comprar
                    </button>
        `;
      document.querySelector("#list-series").innerHTML += card;
    });
  }

  static handleClickEvent() {
    let favouriteList = document.querySelector(".btn-primary");
    favouriteList.forEach((button) => {
      button.addEventListener("click", function (e) {
        let memory = this.getAttribute("data-memory");
        localStorage.setItem("post", memory);
      });
    });
  }

  static buttonOrder() {
    let save_button = {};
    document.querySelector("#btn-buy").innerHTML = save_button;
    document.getElementById("btn-buy");
    save_button.onclick = saveData();

    function saveData() {}
  }
}

export default PosterAPI;
