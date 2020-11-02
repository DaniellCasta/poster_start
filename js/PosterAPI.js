class PosterAPI {
  static sumary(sinopsis) {
    fetch("./data/json/poster.json")
      .then((result) => result.json())
      .then((data) => {
        let films = data[0].films;
        films.forEach((oFilm) => {
          let fullSinopsis = `${oFilm.sinopsis}`;
          if (fullSinopsis.length > 50) {
            sinopsis = fullSinopsis.substring(0, 50);
          } else if (fullSinopsis == "undefined" || fullSinopsis.length == 0) {
            sinopsis = "No hay sinopsis";
            return sinopsis;
          } else {
            return sinopsis;
          }
          console.log(sinopsis);
        });
      });
  }

  static getJSONSerieStars(stars) {
    let html = "";
    stars.forEach((oStar) => {
      html += `
              <div style="margin: 15px;">
              <div style="color: rgb(0, 255, 255)">
                Actores :&nbsp
              </div>
              <div class="row" style="margin: 15px;">${oStar.name}&nbsp<p style="color: rgb(204, 0, 0)">como</p>&nbsp${oStar.character}</div>
              </div>
            `;
    });
    return html;
  }

  static getJSONFilmStars(stars) {
    let html = "";
    stars.forEach((oStar) => {
      html += `
              <div style="margin: 15px;">
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
        let listFilmStars = data[0].films[0].stars;
        let listSerieStars = data[1].series[0].stars;
        let listFilms = data[0].films;
        let listSeries = data[1].series;
        PosterAPI.getJSONFilmStars(listFilmStars);
        PosterAPI.getJSONSerieStars(listSerieStars);
        PosterAPI.populateFilms(listFilms);
        PosterAPI.populateSeries(listSeries);
      });
  }

  static populateFilms(films) {
    document.querySelector("#list-films").innerHTML = "";
    films.forEach((oFilm) => {
      let card = `
		  <!--Card-->
                  <div class="card mb-4 shadow-sm" style="width: 20rem;">
                    <img src="img/${
                      oFilm.cover
                    }" class="card-img-top" alt="...">
                    <div class="card-body" >
                      <h5 class="card-title">${oFilm.name}</h5>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Sinopsis :&nbsp
                        </div>
                        ${oFilm.sinopsis}
                      </div>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Director :&nbsp
                        </div>
                        ${oFilm.director}
                      </div>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Duración :&nbsp
                        </div>
                        ${oFilm.duration}
                      </div>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Director :&nbsp
                        </div>
                        ${oFilm.price}
                      </div>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Género :&nbsp
                        </div>
                        ${oFilm.genre}
                      </div>
                    </div>
                    <ul class="list-group list-group-flush star">
                    ${PosterAPI.getJSONFilmStars(oFilm.stars)}
                    </ul>
                    <!--Us del tooltip i modal -->
                    <button id="btn-buy-${oFilm.id}"  type="button" class="btn btn-primary" data-memory="${oFilm.name}" data-toggle="modal" data-target="#pedido" title="Pago sólo con paypal">
                    Comprar
                    </button>
        `;
      document.querySelector("#list-films").innerHTML += card;
    });
  }

  static populateSeries(series) {
    document.querySelector("#list-series").innerHTML = "";
    films.forEach((oSerie) => {
      let card = `
		  <!--Card-->
                  <div class="card mb-4 shadow-sm" style="width: 20rem;">
                    <img src="img/${
                      oSerie.cover
                    }" class="card-img-top" alt="...">
                    <div class="card-body" >
                      <h5 class="card-title">${oSerie.name}</h5>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Sinopsis :&nbsp
                        </div>
                        ${oSerie.sinopsis}
                      </div>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Director :&nbsp
                        </div>
                        ${oSerie.director}
                      </div>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Duración :&nbsp
                        </div>
                        ${oSerie.duration}
                      </div>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Director :&nbsp
                        </div>
                        ${oSerie.price}
                      </div>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Género :&nbsp
                        </div>
                        ${oSerie.genre}
                      </div>
                    </div>
                    <ul class="list-group list-group-flush star">
                    ${PosterAPI.getJSONSerieStars(oSerie.stars)}
                    </ul>
                    <!--Us del tooltip i modal -->
                    <button type="button" class="btn btn-primary" data-memory="${oSerie.name}" data-toggle="modal" data-target="#pedido" title="Pago sólo con paypal">
                    Comprar
                    </button>
        `;
      document.querySelector("#list-series").innerHTML += card;
    });
  }

  static handleClickEvent() {
    let favouriteList = document.querySelectorAll(".btn-primary");
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
