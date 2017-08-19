'use strict';

$(function () {

  $('#buscar').on('click', function () {

    $.getJSON('data.json', (data) => {
      $('.lista').empty();
      $.each(data, (indice, valor) => {
        let card = `<div class="card horizontal">
          <div class="card-image">
            <img src="img/home.jpg">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <div>
                <b>Direccion: </b><span>${valor.Direccion}</span>
              </div>
              <div>
                <b>Ciudad: </b><span>${valor.Ciudad}</span>
              </div>
              <div>
                <b>Telefono: </b><span>${valor.Telefono}</span>
              </div>
              <div>
                <b>Código postal: </b><span>${valor.Codigo_Postal}</span>
              </div>
              <div>
                <b>Precio: </b><span>${valor.Precio}</span>
              </div>
              <div>
                <b>Tipo: </b><span>${valor.Tipo}</span>
              </div>
            </div>
          </div>
        </div>`;
        $('.lista').append(card);
      });
    });
  });
});

//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
});

function setSearch() {
  let busqueda = $('#checkPersonalizada');
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true;
    } else {
      this.customSearch = false;
    }
    $('#personalizada').toggleClass('invisible');
  });
}

setSearch();
