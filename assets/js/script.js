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

// add it to local Storage 
localStorage.setItem("searchHistory", JSON.stringify(searchHistroy));

fetchData();
})
 