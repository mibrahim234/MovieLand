// const { Json } = require("sequelize/types/lib/utils");
// const { get } = require("../../controllers/home-routes");

var userFormEl = document.querySelector("#user-form");
var movieSearchInputEl = document.querySelector("#movie-search");

var movieContainerOneEl = document.querySelector("#movie-container-one");
var movieContainerTwoEl = document.querySelector("#movie-container-two");
var movieContainerThreeEl = document.querySelector("#movie-container-three");
var movieContainerFourEl = document.querySelector("#movie-container-four");
var movieContainerFiveEl = document.querySelector("#movie-container-five");
var movieContainerSixEl = document.querySelector("#movie-container-six");
var movieContainerSevenEl = document.querySelector("#movie-container-seven");
var movieContainerEightEl = document.querySelector("#movie-container-eight");
var movieContainerNineEl = document.querySelector("#movie-container-nine");

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var movie = movieSearchInputEl.value.trim();

    if (movie) {
        // window.location.replace("/moviessearch/" + movie)
        getMovieData(movie);
        movieSearchInputEl = "";
    } else {
        alert("Please enter a Movie");
    }
};

var getMovieData = function(movie) {
    // format the OMDB API URL
    var omdbApiUrl = "http://www.omdbapi.com/?s=" + movie + "&apikey=83d6dc1f"

    // make a request to the OMDB API URL
    // fetch(`movies/${search}`, {
    //     method: 'GET',
    //     body: JSON.stringify({

    //     })
    // })
    fetch(omdbApiUrl)
        .then(function(response) {
        return response.json();
        })
        .then(function(response) {
        // pass response into dom function

        // MOVIE ONE       
        var moviePoster1 = document.createElement("img");
        moviePoster1.setAttribute("src", response.Search[0].Poster)
        moviePoster1.className = "movie-poster"
        moviePoster1.setAttribute("data-id", response.Search[0].imdbID)
        movieContainerOneEl.appendChild(moviePoster1);

       
        // MOVIE TWO
        var moviePoster2 = document.createElement("img");
        moviePoster2.setAttribute("src", response.Search[1].Poster)
        moviePoster2.className = "movie-poster"
        moviePoster2.setAttribute("data-id", response.Search[1].imdbID)
        movieContainerTwoEl.appendChild(moviePoster2);


        // MOVIE THREE
        var moviePoster3 = document.createElement("img");
        moviePoster3.setAttribute("src", response.Search[2].Poster)
        moviePoster3.className = "movie-poster"
        moviePoster3.setAttribute("data-id", response.Search[2].imdbID)
        movieContainerThreeEl.appendChild(moviePoster3);


        // MOVIE FOUR
        var moviePoster4 = document.createElement("img");
        moviePoster4.setAttribute("src", response.Search[3].Poster)
        moviePoster4.className = "movie-poster"
        moviePoster4.setAttribute("data-id", response.Search[3].imdbID)
        movieContainerFourEl.appendChild(moviePoster4);

        // MOVIE Five
        var moviePoster5 = document.createElement("img");
        moviePoster5.setAttribute("src", response.Search[4].Poster)
        moviePoster5.className = "movie-poster"
        moviePoster5.setAttribute("data-id", response.Search[4].imdbID)
        movieContainerFiveEl.appendChild(moviePoster5);

        // MOVIE Six
        var moviePoster6 = document.createElement("img");
        moviePoster6.setAttribute("src", response.Search[5].Poster)
        moviePoster6.className = "movie-poster"
        moviePoster6.setAttribute("data-id", response.Search[5].imdbID)
        movieContainerSixEl.appendChild(moviePoster6);

        // MOVIE Seven
        var moviePoster7 = document.createElement("img");
        moviePoster7.setAttribute("src", response.Search[6].Poster)
        moviePoster7.className = "movie-poster"
        moviePoster7.setAttribute("data-id", response.Search[6].imdbID)
        movieContainerSevenEl.appendChild(moviePoster7);
        
        // MOVIE Eight
        var moviePoster8 = document.createElement("img");
        moviePoster8.setAttribute("src", response.Search[7].Poster)
        moviePoster8.className = "movie-poster"
        moviePoster8.setAttribute("data-id", response.Search[7].imdbID)
        movieContainerEightEl.appendChild(moviePoster8);
    
        // MOVIE Nine
        var moviePoster9 = document.createElement("img");
        moviePoster9.setAttribute("src", response.Search[8].Poster)
        moviePoster9.className = "movie-poster"
        moviePoster9.setAttribute("data-id", response.Search[8].imdbID)
        movieContainerNineEl.appendChild(moviePoster9);

        //END MOVIE SEARCH RESULTS
    })
};


// ** OLD CODE - PREVIOUSLY USED TO SEARCH JUST FOR ONE MOVIE AT A TIME **

// var userFormEl = document.querySelector("#user-form");
// var movieSearchInputEl = document.querySelector("#movie-search")
// var movieContainerOneEl = document.querySelector("#movie-container-one");

// var formSubmitHandler = function(event) {
//     event.preventDefault();

//     // get value from input element
//     var movie = movieSearchInputEl.value.trim();

//     if (movie) {
//         getMovieData(movie);
//         movieSearchInputEl = "";
//     } else {
//         alert("Please enter a Movie");
//     }
// };



// var getMovieData = function(movie) {
//     // format the OMDB API URL
//     var omdbApiUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=83d6dc1f"

//     // make a request to the OMDB API URL
//     fetch(omdbApiUrl)
//         .then(function(response) {
//         return response.json();
//         })
//         .then(function(response) {
//         // pass response into dom function

//         var movieTitle = document.createElement("h4");
//         movieTitle.textContent = "Title: " + response.Title
//         movieContainerOneEl.appendChild(movieTitle);

//         var movieActors = document.createElement("h4");
//         movieActors.textContent = "Actor(s): " + response.Actors
//         movieContainerOneEl.appendChild(movieActors);

//         var movieGenre = document.createElement("h4");
//         movieGenre.textContent = "Genre: " + response.Genre 
//         movieContainerOneEl.appendChild(movieGenre);

//         var moviePlot = document.createElement("h4");
//         moviePlot.textContent = "Plot: " + response.Plot
//         movieContainerOneEl.appendChild(moviePlot);

//         })
// };

userFormEl.addEventListener("submit", formSubmitHandler);

// var displayMovie = function (movie) {
//     console.log(movie)

//     // clear old content
//     movieContainerOneEl.textContent = "";
//     searchedLocationEl.textContent = location;
// };

// getMovieData();

document.addEventListener("click", function(event) {
    if (event.target.classList.value === "movie-poster") {
        console.log(event)
        const id = event.target.dataset.id
        // navigate to /movie/:id
        window.location.replace("/movie/" + id)

        // On our backend, we set up that dynamic route for /movie/:id
        // Make an API request to OMDB querying by req.params.id
        // Fill in a Handlebars template with data returned
    }
})