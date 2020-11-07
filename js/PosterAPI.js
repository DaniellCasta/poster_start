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
              <li class="list-group-item">${oStar.name} (${oStar.character})</li>
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
        <div id="film-${oFilm.id}" class="card mb-4 shadow-sm" style="width: 14rem;">
         <img src="./img/${oFilm.cover}" class="card-img-top" alt="poster img.">
          <div class="card-body">
            <h5 class="card-title">${oFilm.name}</h5>
            <p class="card-text">${PosterAPI.sumary(oFilm.sinopsis)}</p>
            <p class="card-text"><span class="text-info">Duración:</span>${oFilm.duration}</p>
            <p class="card-text"><span class="text-info">Director:</span>${oFilm.director}</p>
            <p class="card-text"><span class="text-info bold">Género:</span>${oFilm.genre}</p>
            <p class="card-text price">${oFilm.price}</p>
          </div>
          <div class="card-header">Stars</div>
          <ul class="list-group list-group-flush">
          ${PosterAPI.getJSONStars(oFilm.stars)}
          </ul>
          <div class="text-center" data-toggle="modal" data-target="#pedido">
            <button data-idOrder="${oFilm.id}" type="button" class="btn btn-primary btn-buy" data-toggle="tooltip" data-placement="top" title="Pago sólo con paypal">
              Comprar
            </button>
          </div>
        </div>
        `;
      document.querySelector("#list-films").innerHTML += card;
    });
  }

  static populateSeries(series) {
    document.querySelector("#list-series").innerHTML = "";
    series.forEach((oSerie) => {
      let card = `
		  <!--Card-->
        <div id="film-${oSerie.id}" class="card mb-4 shadow-sm" style="width: 14rem;" >
         <img src="./img/${oSerie.cover}" class="card-img-top" alt="poster img.">
          <div class="card-body">
            <h5 class="card-title">${oSerie.name}</h5>
            <p class="card-text">${PosterAPI.sumary(oSerie.sinopsis)}</p>
            <p class="card-text"><span class="text-info">Duración:</span>${oSerie.duration}</p>
            <p class="card-text"><span class="text-info">Director:</span>${oSerie.director}</p>
            <p class="card-text"><span class="text-info bold">Género:</span>${oSerie.genre}</p>
            <p class="card-text price">${oSerie.price}</p>
          </div>
          <div class="card-header">Stars</div>
          <ul class="list-group list-group-flush">
          ${PosterAPI.getJSONStars(oSerie.stars)}
          </ul>
          <div class="text-center" data-toggle="modal" data-target="#pedido">
            <button data-idOrder="${oSerie.id}" type="button" class="btn btn-primary btn-buy" data-toggle="tooltip" data-placement="top" title="Pago sólo con paypal">
              Comprar
            </button>
          </div>
        </div>
        `;
      document.querySelector("#list-series").innerHTML += card;
    });
  }

  static searchFilm() {
		fetch('./data/poster.json')
			.then(result => result.json())
			.then(data => {
				let txtSearch = document.querySelector("#txt-search").value;
				txtSearch = txtSearch.toLowerCase();
				let listFilms = data.poster.films;
				let films = listFilms.filter(
					// If the condition returns true, return the current item
					// Check if there is a film width the same name (or more than one) 
					(item) => (item.name.toLowerCase().indexOf(txtSearch) > -1)
				);
				if (films.length > 0) {
					PosterAPI.populateFilms(films);
				} else {
					document.querySelector("#list-films").innerHTML = `
						<p>Ninguna película coincide con los datos de búsqueda</p>
					`;
				}

			});
	}

  static handleButtonOrder() {
    //Configure action of every buy button
    let aBtn = document.querySelectorAll(".btn-buy");
    if (aBtn) {
      aBtn.forEach((item) => {
        item.addEventListener("click", function () {

          //modal fields
          let tagPostId = document.querySelector("#order_id");
          let tagPostName = document.querySelector("#order_name");
          let tagPostPrice = document.querySelector("#order_price");

          let idFilm = item.getAttribute("data-idOrder");
          tagPostId.value = idFilm;

          let title = item.querySelector("#film-" + idFilm + ".card-title")
            .innerHTML;
          tagPostName.innerHTML = title;

          let price = item.querySelector("#film-" + idFilm + ".price")
            .innerHTML;
          tagPostPrice.value = price;
        });
      });
    }
  }
}

export default PosterAPI;
