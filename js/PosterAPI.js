class PosterAPI {
  /*static sumary(sinopsis) {
    if(sinopsis.length > 50){

    }else if{(sinopsis == "undefined" || sinopsis.length == 0)
      
    }else{

    }
  }*/
/*
  static printStars(star) {
    fetch("./data/json/poster.json")
      .then((result) => result.json())
      .then((data) => {
        
        let liststaJSON = data.poster.films.stars;
        let stars = JSON.parse(liststaJSON);
        for (let i = 0; i < stars.length; i++) {
           star = stars[i];
        }
        console.log(star);
      });
    console.log(star);
*/
  /*static printStars(starsJSON) {
    fetch("./data/json/poster.json")
      .then((result) => result.json())
      .then((data) => {
        let liststarsJSON = data.poster.films.stars;
        let starsJSON = new Array;
        $.each(liststarsJSON, function (key, val) {
          for (key in starsJSON) {
            starsJSON.push(key);
            for (val in starsJSON) {
              starsJSON.push(val);
            }
          }
        });
        console.log(starsJSON);
      });
    console.log(starsJSON);
  }*/

  static getJSONPoster() {
    fetch("./data/json/poster.json")
      .then((result) => result.json())
      .then((data) => {
        let posterJSON = data.poster;
        //let stars = data.poster.films.stars;

        /*¿Porqué da undefined?
        console.log(typeof(stars));

        console.log(typeof(posterJSON.films));*/


        PosterAPI.populateFilms(posterJSON.films);
        PosterAPI.populateSeries(posterJSON.series);

      });
  }

  static populateFilms(listFilms) {
    $("#list-films").html("");
    document.querySelector("#list-films").innerHTML = "";
    listFilms.forEach((oFilm) => {
      //console.log(listFilms.stars);
      //console.log("info: " + oFilm.stars);
      let card = `
		  <!--Card-->
                  <div class="card mb-4 shadow-sm" style="width: 20rem;">
                    <img src="img/${oFilm.cover}" class="card-img-top" alt="...">
                    <div class="card-body" >
                      <h5 class="card-title">${oFilm.name}</h5>
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
                        ${oFilm.director}
                      </div>
                      <div class="card-text row" style="margin: 20px">
                        <div style="color: rgb(0, 255, 255)">
                          Género :&nbsp
                        </div>
                        ${oFilm.genre}
                      </div>
                    </div>
                    <ul class="list-group list-group-flush">
                      <center class="card-header" style="background-color: #f7f7f7">Actores</center>
                      <li class="list-group-item">{txtListStars}</li>
                      <li class="list-group-item">{txtListStars}</li>
                      <li class="list-group-item">{txtListStars}</li>
                    </ul>
                    <!--Us del tooltip -->
                    <div class="text-center container" data-toggle="modal" data-target="#pedido">
                    <button id="btn-order" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Pago sólo con paypal">
                      Comprar
                    </button>
                  </div>
        `;
      document.querySelector("#list-films").innerHTML += card;
    });
  }

  static populateSeries(listSeries) {
    $("#list-series").html("");
    document.querySelector("#list-series").innerHTML = "";
    listSeries.forEach((oSerie) => {
      //console.log(listFilms.stars);
      //console.log("info: " + oFilm.stars);
      let card = `
      <!--Card-->
      <div class="card mb-4 shadow-sm" style="width: 20rem;">
        <img src="img/${oSerie.cover}" class="card-img-top" alt="...">
        <div class="card-body" >
        <h5 class="card-title">${oSerie.name}</h5>
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
          ${oSerie.director}
        </div>
        <div class="card-text row" style="margin: 20px">
          <div style="color: rgb(0, 255, 255)">
            Género :&nbsp
          </div>
          ${oSerie.genre}
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <center class="card-header" style="background-color: #f7f7f7">Actores</center>
        <li class="list-group-item">${oSerie.stars}</li>
        <li class="list-group-item">${oSerie.stars}</li>
        <li class="list-group-item">${oSerie.stars}</li>
      </ul>        <!--Us del tooltip -->
        <!--ús del tooltip i modal-->
        <div class="text-center container" data-toggle="modal" data-target="#pedido">
        <button id="btn-order" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Pago sólo con paypal">
          Comprar
        </button>
      </div>
      </div>
        `;
      document.querySelector("#list-series").innerHTML += card;
    });
  }

  static searchFilm() {
    fetch("./data/poster.json")
      .then((result) => result.json())
      .then((data) => {
        let txtSearch = document.querySelector("#txt-search").value;
        txtSearch = txtSearch.toLowerCase();
        let listFilms = data.poster.films;
        let films = listFilms.filter(
          (item) => item.name.toLowerCase().indexOf(txtSearch) > -1
        );
        if (films.length > 0) {
          PosterAPI.printFilms(films);
        } else {
          document.querySelector("#list-films").innerHTML = `
                    <p>Ninguna película coincide con los datos de búsqueda</p>
                `;
        }
      });
  }
}

export default PosterAPI;
