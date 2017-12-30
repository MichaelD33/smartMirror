
$(document).ready(function() {
  getLocation();
  getNews();


function getLocation() {
  var location;
  $.ajax({
    format: "jsonp",
    dataType: "jsonp",
    url: "http://ip-api.com/json",
    success: function(data) {
      location = (data.lat + "," + data.lon);
      $("#weather-location").html(data.city + ", " + data.region);
      getURL(location)
    },
    error: function() {
      httpsLocation();
    },
    method: "GET"
  });

  function httpsLocation() {
    if (navigator.geolocation) {
      var location;
      navigator.geolocation.getCurrentPosition(passLocation);
    }
  }

  function passLocation(position) {
    location = position.coords.latitude + ", " + position.coords.longitude;
    setCity(location);
    getURL(location);
  }
}

function setCity(latLon) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLon + "&sensor=true";
  url = url.replace(/\s/g,"");
  $.ajax({
    format: "json",
    dataType: "json",
    url: url,
    success: function(data) {
      $('#weather-location').html(data.results[0].address_components[2].long_name);
    },
    method: "GET"
  });
}

function getURL(location, tempSetting) {
  var url = ("https://api.darksky.net/forecast/86f4344a7cee02d594dd374098256f81/" + location);
  //console.log(url);
  getJson(url);
}

function getJson(url) {
  //console.log("started getJson with this url: " + url);
  $.ajax({
      format: "jsonp",
      dataType: "jsonp",
      url: url,
      success: function(json) {
        //console.log("great success");
        $("#weather-current").html(Math.round(json.currently.temperature)+"°");
        $("#weather-high").html("High: "+Math.round(json.daily.data[0].temperatureMax)+"°");
        $("#weather-low").html("Low: "+Math.round(json.daily.data[0].temperatureMin)+"°");
        //setBackground(json.currently.icon);
      }

    })

  }




function getNews(){
  var newsSource = {
  //  CHOOSE YOUR PREFERED NEWS SOURCES FROM NEWS API SITE
          "business-insider":1,
          "buzzfeed":2,
          "techcrunch":3,
          "cnn":4,
          "the-verge":5,
  };

  for (var key in newsSource) {
  //console.log(newsSource[key]);
  var order = "latest";
  //test API KEY
  //var newsUrl = ("https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=e3aadcf138c842cc8fb14e4461cd4fdd");
  var newsUrl = ("https://newsapi.org/v1/articles?source="+key+"&sortBy="+order+"&apiKey=e3aadcf138c842cc8fb14e4461cd4fdd");
  console.log(key);
  getNewsJson(newsUrl);
  }
}

function getNewsJson(newsUrl) {
  //console.log("started getJson with this url: " + newsUrl);
  var article = Math.floor((Math.random() * 10) + 1);
  console.log(article)
  $.ajax({
      format: "json",
      dataType: "json",
      url: newsUrl,
      success: function(json) {
        //console.log("great success");
        $("#publisher").html(json.source);
        $("#title").html(json.articles[article].title);
        $("#description").html(json.articles[article].description);
      }

    })

}

setInterval(function () {
    getNews();
}, 10000);
})
