var apiKey = "a98fb38cc5281d895fed558ea81f6eeb"
var form = $("#form");
var search = $("#search")
var searchList =$(#"searchesList")

// event listener for form submission
form.on("submit", function(x) {
    x.preventDefault();
    // takes input value from the users submission
   var searchInput = search.val();
//    console.log(searchInput);
//    for when searching with no input 
   if (searchInput == "") {
    return;
   }

var searchHistory = [];

// If search is a new unique one this will push it to the search history array
if (!searchHistory.includes(searchInput)) {
    searchHistory.push(searchInput);
}
// clears search window 
search.val("");
// add to list by calling searchList function 
searchList (searchInput, searchHistory.indexOf(cityInput) )

// add it to local Storage 
localStorage.setItem("searchHistory", JSON.stringify(searchHistroy));

fetchWeather();
})
 function searchList (search, i) {
    var search = cityHistory[i];
    var li = $("<li>")
      .text(search)
      .attr(i)
      .on("click", function (x) {
        x.preventDefault();
        searchInput = x.target.innerHTML;
        fetchWeather();
      });
    li.appendTo(searchList);
  };