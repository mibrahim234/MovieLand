var userFormEl = document.querySelector("#user-form");
var movieSearchInputEl = document.querySelector("#movie-search")
var movieContainerOneEl = document.querySelector("#movie-container-one");

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var movie = movieSearchInputEl.value.trim();

    if (movie) {
        getMovieData(movie);
        movieSearchInputEl = "";
    } else {
        alert("Please enter a Movie");
    }
};



var getMovieData = function(movie) {
    // format the OMDB API URL
    var omdbApiUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=83d6dc1f"

    // make a request to the OMDB API URL
    fetch(omdbApiUrl)
        .then(function(response) {
        return response.json();
        })
        .then(function(response) {
        // pass response into dom function

        var movieTitle = document.createElement("h4");
        movieTitle.textContent = "Title: " + response.Title
        movieContainerOneEl.appendChild(movieTitle);

        var movieActors = document.createElement("h4");
        movieActors.textContent = "Actor(s): " + response.Actors
        movieContainerOneEl.appendChild(movieActors);

        var movieGenre = document.createElement("h4");
        movieGenre.textContent = "Genre: " + response.Genre 
        movieContainerOneEl.appendChild(movieGenre);

        var moviePlot = document.createElement("h4");
        moviePlot.textContent = "Plot: " + response.Plot
        movieContainerOneEl.appendChild(moviePlot);

        })
};

userFormEl.addEventListener("submit", formSubmitHandler);

// var displayMovie = function (movie) {
//     console.log(movie)

//     // clear old content
//     movieContainerOneEl.textContent = "";
//     searchedLocationEl.textContent = location;
// };

// getMovieData();
