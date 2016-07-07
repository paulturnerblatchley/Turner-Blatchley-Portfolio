

/*
 * GLOBAL VARIABLES
****/

var lat;
var lng;
var currentMapStyles = [];

/*
 * FUNCTIONS
****/

// Add colors to Map Style Array
function mapStyler(c1, c2, c3, c4) {
  currentMapStyles = [{
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{
      color: c1,
      visibility: "simplified"
    }]
  }, {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [{
      color: "#000"
    }]
  }, {
    featureType: "road",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  }, {
    featureType: "landscape",
    elementType: "all",
    stylers: [{
      color: c2
    }]
  }, {
    featureType: "poi",
    elementType: "all",
    stylers: [{
      visibility: "off"
    }]
  }, {
    featureType: "road.highway",
    elementType: "all",
    stylers: [{
      visibility: "simplified"
    }]
  }, {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [{
      visibility: "off"
    }]
  }, {
    featureType: "transit",
    elementType: "all",
    stylers: [{
      visibility: "off"
    }]
  }, {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{
      color: c4
    }]
  }, {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{
      color: c3
    }, {
      visibility: "one"
    }]
  }, {
    featureType: "water",
    elementType: "all",
    stylers: [{
      color: c3
    }, {
      visibility: "on"
    }]
  }];
}

// Add CSS Classes for the Weather
function weatherStyling(icon) {
  $("body").attr("class","");
  $("body").addClass(icon + "-light");
  $("#header").attr("class","clearfix");
  $("#header").addClass(icon + "-text " + icon + "-light");
  $("#page-title input").attr("class","location");
  $('#page-title input').addClass(icon + "-dark " + icon + "-accent-text");
  $(".info").attr("class","info text-center");
  $('.info').addClass(icon + "-dark " + icon + "-accent-text");
  $(".temp-scale-button").attr("class","temp-scale-button");
  $("#fahr").attr("class","temp-scale-button active");
  $(".temp-scale-button").addClass(icon + "-text " + icon + "-accent-bg " + icon + "-accent-border");
}

//Get Weather Info
function getWeatherInfo(lat, lng) {
  $.get(
    "https://api.forecast.io/forecast/4d19662895b7e88976a536601f1483a3/" + lat + "," + lng,
    function(data) {

      //Temperature
      var temp = Math.round(data.currently.temperature);
      $("#current-temp").html(temp);

      //Weather description
      var summary = data.currently.summary;
      $("#weather-desc").html(summary);

      //Change Everything depending on Weather
      var icon = data.currently.icon;
      switch (icon) {
        case 'clear-day':
          $("#weather-icon").attr('class', 'wi wi-day-sunny');
          weatherStyling(icon);
          mapStyler("#2C3E50", "#fcfcfc", "#99c8ff", "#eeefbc");
          initMap(lat, lng);
          break;
        case 'clear-night':
          $("#weather-icon").attr('class', 'wi wi-night-clear');
          weatherStyling(icon);
          mapStyler("#ffffff", "#001848", "#604878", "#bc9fbc");
          initMap(lat, lng);
          break;
        case 'rain':
          $("#weather-icon").attr('class', 'wi wi-rain');
          weatherStyling(icon);
          mapStyler("#efefef", "#333333", "#3f314a", "#566f97");
          initMap(lat, lng);
          break;
        case 'snow':
          $("#weather-icon").attr('class', 'wi wi-snow');
          weatherStyling(icon);
          mapStyler("#454545", "#cce3ff", "#ffffff", "#cccccf");
          initMap(lat, lng);
          break;
        case 'sleet':
          $("#weather-icon").attr('class', 'wi wi-sleet');
          weatherStyling(icon);
          mapStyler("#252525", "#D9DCD3", "#4A545F", "#E8F6FA");
          initMap(lat, lng);
          break;
        case 'wind':
          $("#weather-icon").attr('class', 'wi wi-strong-wind');
          weatherStyling(icon);
          mapStyler("#6b4836", "#f5ffef", "#616d63", "#dcbb8d");
          initMap(lat, lng);
          break;
        case 'fog':
          $("#weather-icon").attr('class', 'wi wi-fog');
          weatherStyling(icon);
          mapStyler("#2d4140", "#edf8f0", "#888a8c", "#bddae0");
          initMap(lat, lng);
          break;
        case 'cloudy':
          $("#weather-icon").attr('class', 'wi wi-cloudy');
          weatherStyling(icon);
          mapStyler("#000000", "#787878", "#474444", "#8f8f8f");
          initMap(lat, lng);
          break;
        case 'partly-cloudy-day':
          $("#weather-icon").attr('class', 'wi wi-day-cloudy');
          weatherStyling(icon);
          mapStyler("#454545", "#fcfcfc", "#dddddd", "#0085ff");
          initMap(lat, lng);
          break;
        case 'partly-cloudy-night':
          $("#weather-icon").attr('class', 'wi wi-night-alt-cloudy');
          weatherStyling(icon);
          mapStyler("#000044", "#C0C0C0", "#003366", "#6699CC");
          initMap(lat, lng);
          break;
      }

    }, "jsonp");
}

//INIT Map Function
function initMap(lat, lng) {
  //Initialize Map
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {
      lat: lat,
      lng: lng
    },
    styles: currentMapStyles,
    zoom: 12
  });
}

$(document).ready(function() {
  //Select Input Text on Focus
  $("input:text").focus(function() { $(this).select(); } );

  //Check if GeoLocation is available.
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        var latlng = {
          lat,
          lng
        };
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'location': latlng
          },
          function(results) {
            var format_address = results[2].formatted_address;
            //Change Location Text to User Location
            $(".location").attr("value", format_address);
          });
        getWeatherInfo(lat, lng);

      });
  } else {
    console.log("Geolocation Not Available");
    $(".location").attr("value", "Not Available");
  }
});


//Search for new city on enter
$(".location").keyup(function(e) {
  var loc = $(".location")[0].value;
  if (e.keyCode == 13) {
    $(".location").blur();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': loc
      },
      function(results) {
        var format_address = results[0].formatted_address;
        console.log(format_address);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();

        getWeatherInfo(lat, lng);
      }
    );
  }
});

//Change Between C & F Buttons
$("#fahr").click(function(e) {
  e.preventDefault();
  if ($(this).hasClass('active')) {
    //Do Nothing
  } else {
    var fT = $("#current-temp").html();
    var cT = Math.round(fT * (9 / 5) + 32);
    $("#current-temp").html(cT);
    $("#cels").removeClass('active');
    $(this).addClass('active');
  }
});

$("#cels").click(function(e) {
  e.preventDefault();
  if ($(this).hasClass('active')) {
    //Do Nothing
  } else {
    var cT = $("#current-temp").html();
    var fT = Math.round((cT - 32) * (5 / 9));
    $("#current-temp").html(fT);
    $("#fahr").removeClass('active');
    $(this).addClass('active');
  }
});