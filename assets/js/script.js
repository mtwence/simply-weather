var apiKey = "a98fb38cc5281d895fed558ea81f6eeb"
var form = $("#form");
var search = $("#search");
var searchList = $("#searchesList");


var searchHistory = [];

// Runs when form is submitted 
form.on("submit", function (x) {
    x.preventDefault();
    var searchInput = search.val();
    console.log(searchInput);
    fetchCurrentWeather(searchInput);
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
           fetchCurrentWeather(searchInput);
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
function fetchCurrentWeather(searchInput) {
    // Turn city into lat & lon 
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&units=imperial&appid=" + apiKey)
        // get response and turn it into json objects
        .then(function (res) {
            // console.log(res.json());
            return res.json();

        }).then(function (data) {
            var cityLon = data[0].lon;
            var cityLat = data[0].lat;

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon +
                "&exclude=hourly,minutely,alerts&units=imperial&appid=" + apiKey)
        .then(function(res) {
            return res.json();
        }).then(function(data){
            console.log(data);
        })
 })}


        Set variables for lat and lon responses
        .then(function (data) {
            console.log(data);

