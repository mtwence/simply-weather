var apiKey = "a98fb38cc5281d895fed558ea81f6eeb"
var form = $("#form");
var search = $("#search")

// event listener for form submission
form.on("submit", function(x) {
    x.preventDefault();
    // takes input value from the users submission
   var searchInput = search.val();
   console.log(searchInput);
//    for when searching with no input 
   if (searchInput == "") {
    return;
   }
})

