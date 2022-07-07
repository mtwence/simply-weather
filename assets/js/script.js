var apiKey = "a98fb38cc5281d895fed558ea81f6eeb"
var form = $("#form");
var search = $("#search");
var searchList = $("#searchesList");
// variables for current weather section 
var currentCity =$("#current-city");
var currentDate = $("#current-date");
var currentIcon = $("#current-icon");
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumidity = $("#current-humid");
var currentUV = $("#current-uv");

// moment date formatting 
var formattedDate = moment().format("dddd, MMMM Do, YYYY");


var searchHistory = [];

// Runs when form is submitted 
form.on("submit", function (x) {
    x.preventDefault();
    var searchInput = search.val();
    console.log(searchInput);
    fetchData(searchInput);
    //    for when searching with no input 
    if (searchInput === "") {
        return;
    }
    // add search to search history array and add to local storage 
    if (!searchHistory.includes(searchInput)) {
        searchHistory.push(searchInput);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        search.val("");
    }

// function to append searches to a list 
    var searchHistoryList = function (city) {
        var cityList = $("<li>")
        cityList.addClass("prev-search")
        cityList.text(city)
        cityList.on("click", function (x) {
            x.preventDefault();
            searchInput = x.target.innerHTML;
            // console.log(x.target.innerHTML)
           fetchData(searchInput);
        });
        cityList.appendTo(searchList);
    };
    searchHistoryList(searchInput);
});


// if (searchHistory.length > 0) {
//     // compare previous searches from local storage 
//     var priorSearches = localStorage.getItem("searchHistory", JSON.stringify(searchHistory));
//     searchSaved = JSON.parse(priorSearches);
//     console.log(searchSaved);
// }
// // If search is a new unique one this will push it to the search history array
// else {
//     search.val("");
    // ;
// }
// searchHistoryList(searchInput)


// Function for search history to persist 
// var searchHistoryPersist = function () {
//     var savedCity = localStorage.getItem("searchHistory");
//     savedCity = JSON.parse(savedCity)
//     console.log(savedCity);
//     if (savedCity) {
//         for (var i = 0; i < savedCity.length; i++) {
//             searchHistoryList(savedCity[i])
//         }
//     }
// }
// searchHistoryPersist();

// Fetch current weather data 
var fetchData = function fetchCurrentWeather(searchInput) {
    // Turn city into lat & lon 
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&units=imperial&appid=" + apiKey)
        // get response and turn it into json objects
        .then(function (res) {
            // console.log(res.json());
            return res.json();

        }).then(function (data) {
            console.log(data);
            currentCity.text(data[0].name);
            var cityLon = data[0].lon;
            var cityLat = data[0].lat;

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon +
                "&exclude=hourly,minutely,alerts&units=imperial&appid=" + apiKey)
        .then(function(res) {
            return res.json();
        }).then(function(data){
            console.log(data);
            displayData(data);
        })
        
 })}

var displayData = function displayData(data) {
  currentDate.text(formattedDate);
  currentIcon.attr( "src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
  currentTemp.text("Temperature: " + data.current.temp + "°");
  currentHumidity.text("Humidity: " + data.current.humidity + "%");
  currentWind.text("Wind Speed: " + data.current.weather.wind_speed + "mph");
  var uvi = data.current.uvi;
  currentUV.text(uvi);
  if (uvi <= 2) {
    currentUV.css("background-color", "green");
  }
  if (uvi > 2 && uvi <= 5) {
    currentUV.css("background-color", "yellow");
  }
  if (uvi > 5 && uvi <= 7) {
    currentUV.css("background-color", "orange");
  }
  if (uvi > 7 && uvi <= 10) {
    currentUV.css("background-color", "red");
  }
  if (uvi > 10) {
    currentUV.css("background-color", "purple");
  }

}