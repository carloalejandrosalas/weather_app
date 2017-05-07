// by Carlo Salas
//appid=2e90a27d571638e876ad29daccd87ceb

$('body').ready(obtenerPosicion('metric'));

var objeto={};
var condition=0;

function obtenerPosicion(unidad){
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude,position.coords.longitude);
    obtenerData(position.coords.latitude,position.coords.longitude,unidad);
  });
  }}

  function obtenerData(latitud,longitude,unidad){
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=29.059860&lon=-111.006377&appid=2e90a27d571638e876ad29daccd87ceb&units="+unidad;
    console.log(url);
    $.getJSON(url, function(datos) {
      var temp = Math.ceil(datos.main.temp);
      condition = datos.weather[0].id;
      console.log(condition);
      var imagen = "";
      console.log(datos);
      $("#city").html("<i class='fa fa-building'> </i> "+datos.name+", "+datos.sys.country);
      console.log(unidad);

      if (unidad == 'metric')
      {
        $('#weather').html(temp+" °"+"<a id='unidad' class='unidad' href='#'>C</a>");
      }

      if (unidad == 'imperial')
      {
        $('#weather').html(temp+" °"+"<a id='unidad' class='unidad' href='#'>F</a>");
      }



      $('#time').html(datos.weather[0].main);
      if (condition >=200 || condition <=232)
        imagen  = "https://cdn3.iconfinder.com/data/icons/weather-icons-8/512/weather-thunder-rainy-m-64.png";

      if (condition >=300 || condition <=321)
          imagen = "https://cdn3.iconfinder.com/data/icons/weather-icons-8/512/weather-rainy-s-64.png";

      if (condition >=500 || condition <=531)
          imagen = "https://cdn3.iconfinder.com/data/icons/weather-icons-8/512/weather-rainy-h-64.png";

      if (condition >=600 || condition <=622)
          imagen = "https://cdn3.iconfinder.com/data/icons/weather-icons-8/512/weather-snowy-h-64.png";

      if (condition >=701 && condition <=781)
          imagen = "https://cdn3.iconfinder.com/data/icons/weather-icons-8/512/weather-windy-64.png";

      if (condition ==800)
          imagen = "https://cdn3.iconfinder.com/data/icons/weather-icons-8/512/weather-sunny-64.png";

      if (condition >= 801 && condition <=804)
          imagen = "https://cdn3.iconfinder.com/data/icons/weather-icons-8/512/weather-partlycloudy-64.png";

      $('#desc').html(datos.weather[0].description);
      $('#icon').html("<img src="+imagen+" />");

      $('#unidad').click(function(){
        if (unidad == 'metric')
        {
          obtenerPosicion('imperial');
        }

        if (unidad == 'imperial')
        {
          obtenerPosicion('metric');
        }
      });


      objeto = datos;
    });
  }
