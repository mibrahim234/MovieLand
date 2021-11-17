var userFormEl = document.querySelector("#user-form");
var movieSearchInputEl = document.querySelector("#movie-search");

// var moviePosterOneEl = document.querySelector("movie-poster-one"); DO WE NEED THIS?
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
    fetch(omdbApiUrl)
        .then(function(response) {
        return response.json();
        })
        .then(function(response) {
        // pass response into dom function

        // MOVIE ONE

        // NEED HELP GETTING POSTER INTO DOM
        // var moviePoster = document.createElement("img");
        // img.src = response.Search[0].Poster
        // movieContainerOneEl.appendChild(moviePoster);

        var movieTitle1 = document.createElement("h4");
        movieTitle1.textContent = "Title: " + response.Search[0].Title
        movieContainerOneEl.appendChild(movieTitle1);

        var movieYear1 = document.createElement("h4");
        movieYear1.textContent = "Year: " + response.Search[0].Year
        movieContainerOneEl.appendChild(movieYear1);
        
        // MOVIE TWO
        var movieTitle2 = document.createElement("h4");
        movieTitle2.textContent = "Title: " + response.Search[1].Title
        movieContainerTwoEl.appendChild(movieTitle2);

        var movieYear2 = document.createElement("h4");
        movieYear2.textContent = "Year: " + response.Search[1].Year
        movieContainerTwoEl.appendChild(movieYear2);

        // MOVIE THREE
        var movieTitle3 = document.createElement("h4");
        movieTitle3.textContent = "Title: " + response.Search[2].Title
        movieContainerThreeEl.appendChild(movieTitle3);

        var movieYear3 = document.createElement("h4");
        movieYear3.textContent = "Year: " + response.Search[2].Year
        movieContainerThreeEl.appendChild(movieYear3);

        // MOVIE FOUR
        var movieTitle4 = document.createElement("h4");
        movieTitle4.textContent = "Title: " + response.Search[3].Title
        movieContainerFourEl.appendChild(movieTitle4);

        var movieYear4 = document.createElement("h4");
        movieYear4.textContent = "Year: " + response.Search[3].Year
        movieContainerFourEl.appendChild(movieYear4);

        // MOVIE Five
        var movieTitle5 = document.createElement("h4");
        movieTitle5.textContent = "Title: " + response.Search[4].Title
        movieContainerFiveEl.appendChild(movieTitle5);

        var movieYear5 = document.createElement("h4");
        movieYear5.textContent = "Year: " + response.Search[4].Year
        movieContainerFiveEl.appendChild(movieYear5);

        // MOVIE Six
        var movieTitle6 = document.createElement("h4");
        movieTitle6.textContent = "Title: " + response.Search[5].Title
        movieContainerSixEl.appendChild(movieTitle6);

        var movieYear6 = document.createElement("h4");
        movieYear6.textContent = "Year: " + response.Search[5].Year
        movieContainerSixEl.appendChild(movieYear6);

        // MOVIE Seven
        var movieTitle7 = document.createElement("h4");
        movieTitle7.textContent = "Title: " + response.Search[6].Title
        movieContainerSevenEl.appendChild(movieTitle7);

        var movieYear7 = document.createElement("h4");
        movieYear7.textContent = "Year: " + response.Search[6].Year
        movieContainerSevenEl.appendChild(movieYear7);  
        
        // MOVIE Eight
        var movieTitle8 = document.createElement("h4");
        movieTitle8.textContent = "Title: " + response.Search[7].Title
        movieContainerEightEl.appendChild(movieTitle8);

        var movieYear8 = document.createElement("h4");
        movieYear8.textContent = "Year: " + response.Search[7].Year
        movieContainerEightEl.appendChild(movieYear8);
    
        // MOVIE Nine
        var movieTitle9 = document.createElement("h4");
        movieTitle9.textContent = "Title: " + response.Search[8].Title
        movieContainerNineEl.appendChild(movieTitle9);

        var movieYear9 = document.createElement("h4");
        movieYear9.textContent = "Year: " + response.Search[8].Year
        movieContainerNineEl.appendChild(movieYear9);

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
