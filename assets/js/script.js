var apiKey = "a98fb38cc5281d895fed558ea81f6eeb"
var form = $("#form");
var search = $("#search")
var searchList = $("#searchesList");
var searchHistory = [];

// event listener for form submission
form.on("submit", function(x) {
    x.preventDefault();
    // takes input value from the users submission
   var searchInput = search.val();
//    for when searching with no input 
   if (searchInput === "") {
    return;
   }

// If search is a new unique one this will push it to the search history array
if (!searchHistory.includes(searchInput)) {
    searchHistory.push(searchInput);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    console.log(searchHistory);
    search.val("");
}
var searchHistoryList = function (city) {

    var cityList = $("<li>")
    cityList.addClass("prev-search");
    cityList.text(city);
    cityList.appendTo(searchList);

}
searchHistoryList(searchInput);
});

// Fetch current weather data 
var currentWeather = function fetchCurrentWeather(searchInput) {
    // Turn city into lat & lon 
    fetch ("http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&units=imperial&appid=" +apiKey)
    // get response and turn it into json objects
    .then(function(response) {
        return response.json();
})
    // Set variables for lat and lon responses 
    .then(function(response) {
        var cityLon = response.coord.lon;
        var cityLat = response.coord.lat;

        fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon +
        "&exclude=hourly,minutely,alerts&units=imperial&appid=")
}


    
}

// }

// Append search to search history list 



// }

// function searchList(search, i) {
//     var search = searchHistory[i];
//     var li = $("<li>").text(search);
//     li.appendTo(searchList);
//   };
// searchList(searchInput, searchHistory.indexOf(searchInput))
// // clears search window 
// search.val("");

// // add to list by calling searchList function 

// })

