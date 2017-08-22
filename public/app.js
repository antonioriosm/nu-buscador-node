'use strict';

$(function () {
  let dataJSON = [];

  $.getJSON('data.json', (data) => {
    dataJSON = data;

    llenar_tipo_vivienda(dataJSON);
    llenar_ciudades(dataJSON);
  });

  $('#buscar').on('click', function () {

    if ($('#checkPersonalizada').is(':checked')) { // true = personalizada
      let ciudad = $('#ciudad').val(); // tomamos el valor actual de ciudad
      let tipo = $('#tipo').val(); // tomamos el valor actual de tipo
      let data = filtrar_informacion($('#rangoPrecio').val(), ciudad, tipo);
      llenar_informacion(data); // llenamos toda la data filtrada por criterios.
    }
    else { // false = mostrar todo
      llenar_informacion(dataJSON); // llenamos toda la data.
    }
  });

  const filtrar_informacion = (precio, ciudad, tipo) => {
    // como el rango no es opcional filtramos obligadamente
    precio = precio.split(";");
    let arreglo = dataJSON.filter((item) => {
      let item_precio = item.Precio.replace("$", "");
      item_precio = parseInt(item_precio.replace(",", ""));
      return (item_precio > precio[0] && item_precio < precio[1]);
    });

    if (ciudad !== "") {
      arreglo = arreglo.filter((item) => {
        return (item.Ciudad == ciudad);
      });
    }

    if (tipo !== "") {
      arreglo = arreglo.filter((item) => {
        return (item.Tipo == tipo);
      });
    }
    return arreglo;
  };

  const llenar_informacion = data => {
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
  };

  const llenar_ciudades = function (data) {
    /* creamos nuevo arreglo con las ciudades únicas del JSON para poblar la lista
       desplegable de ciudades */
    let ciudades = data.reduce((anterior, actual) => {
      if (anterior.indexOf(actual.Ciudad) == -1) anterior.push(actual.Ciudad);
      return anterior.sort();
    }, []);

    ciudades.forEach((valor) => {
      let opcion = $('<option></option>', {
        text: valor,
        value: valor
      });
        
      $('#ciudad').append(opcion);
    });
  };

  const llenar_tipo_vivienda = function (data) {
    /* creamos nuevo arreglo con los tipo de vivienda únicas del JSON para poblar la lista
       desplegable de tipo de vivienda */
    let tipo_vivienda = data.reduce((anterior, actual) => {
      if (anterior.indexOf(actual.Tipo) == -1) anterior.push(actual.Tipo);
      return anterior.sort();
    }, []);

    tipo_vivienda.forEach((valor) => {
      let opcion = $('<option></option>', {
        text: valor,
        value: valor
      });

      $('#tipo').append(opcion);
    });
  };

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
      /*if (this.customSearch == false) {
        this.customSearch = true;
      } else {
        this.customSearch = false;
      }*/
      $('#personalizada').toggleClass('invisible');
    });
  }
  
  setSearch();
});

