'use strict'

//store API keys in global variables to access for API calls
const omdbKey = "cb95d063"
const tmdbKey = "b81d09aa5f188c95ba4dc2e4336459b4"

//save API base URLs to modify according to search
const omdbSearchURL = "http://www.omdbapi.com/?"//use to get movie ID
const tmdbSearchURL = "https://api.themoviedb.org/3/movie/"//use for ratings, etc.
//config for ID: https://api.themoviedb.org/3/configuration?api_key=b81d09aa5f188c95ba4dc2e4336459b4
const YouTubeURL = "https://www.googleapis.com/youtube/v3/"

//format query parameters
    function formatOmdbQueryParams(params) {
    //return an array of keys in the `params` object and, from that array, create a string from each property: key=value, and join the key/value properties with &
        const imageQueryItems = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`);

        return imageQueryItems.join("&");
    }
    function formatTmdbQueryParams(params) {
        const videoQueryItems = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`);
        return videoQueryItems.join("&");
    }

    function getOmdbMovieInfo(query, num) {
        
        const params = {
            apikey: omdbKey,
            t: query,
            type: "movie",            
            page: num,
        }
        const queryString = formatOmdbQueryParams(params);
        const searchURL = omdbSearchURL + queryString;

        fetch(searchURL)
           .then(response => response.json())
           .then(responseJson => {
                parseMovieInfo(responseJson, query);
                let info = responseJson.Search;
                let imdbID = info[0]["imdbID"];
            });
    }

    function  getDetailsWithId(id) {
        const params = {
            apikey: omdbKey,
            i: id,
        }
        let queryIdString = formatOmdbQueryParams(params);
        let omdbIdSearchURL = `http://www.omdbapi.com/?` + queryIdString;
        fetch(omdbIdSearchURL).then(response => response.json()).then(responseJson => {
        })

    }
    function getYtId(imdbID) {
                const params = {
                api_key: tmdbKey,
                language: "en-US",
                append_to_response: "videos",
            }
            const queryString = formatTmdbQueryParams(params);
            const videoURL = tmdbSearchURL + `${imdbID}/videos?` + queryString;
            fetch(videoURL).then(response => response.json()).then(responseJson => {
                let videos = responseJson.results;
                let ytMatch = videos.filter(video => video["site"] === "YouTube");
                let ytID = ytMatch[0]["key"]
                displayVideoTrailer(ytID);
            })
    }

//find similar movies and list results according to maxResults specified
    function getSimilarMovies(searchInput, maxResults) {

        const parameters = {
            api_key: tmdbKey,
            language: "en-US",
            query: searchInput,
            page: 1,
        }
        const queryString = formatTmdbQueryParams(parameters);
        const tmdbSearchURL = "https://api.themoviedb.org/3/search/movie/?"
        const similarURL = tmdbSearchURL + queryString;
        fetch(similarURL).then(response => response.json()).then(responseJson => {
            let results = responseJson.results;
            let titles = results.map(item => item["title"]);
            //for each result, display the title per the displaySimilarMovies function them in a list item
            displaySimilarMovies(titles, maxResults)            
        })
    }
    function parseMovieInfo(responseJson, query) {

        let movieTitle = responseJson["Title"];
        let movieYear = responseJson["Year"];
        let moviePlot = responseJson["Plot"];
        let imdbRating = responseJson["imdbRating"];
        let imdbID = responseJson["imdbID"];
        displayMovieInfo(movieTitle, movieYear, moviePlot, imdbRating);
        getYtId(imdbID);
        getDetailsWithId(imdbID);       
}

//display information related to search results for one movie
    function displayMovieInfo(title, year, plot, rating) {
        let movieInfoString = `<h3>${title} (${year})</h3><p> IMDB Rating: ${rating}</p>
        <aside>${plot}</aside>`;
        $("#one-movie-description").html(movieInfoString);
    }

    function displayVideoTrailer(ytID) {

        let trailer = `https://www.youtube.com/embed/${ytID}?enablejsapi=1&origin=https://m.media-amazon.com/images/M/MV5BMTUyNzkwMzAxOF5BMl5BanBnXkFtZTgwMzc1OTk1NjE@._V1_SX300.jpg`
        let iFrameElement = `<iFrame id="iFrame-player" type="text/html" width="480" height="400"src="${trailer}"></iFrame>`
        $("#iFrame-player").html(iFrameElement);    
    }

    function displaySimilarMovies(movies, maxResults) {
        $("li").detach();
        for(let i = 0; i < maxResults; i++) {
            let movie = `<li>${movies[i]}</li>`;
            $("ul").append(movie);         
        }
    }

    function handleSearchButtons() {
        $("#js-search-one").on("click", event => {
            event.preventDefault();
            $("#one-movie-search").show();
            $("#js-search-one").hide();
            $("#js-multiSearch").toggleClass("hidden");
        });
        $("#js-multiSearch").on("click", event => {
            event.preventDefault();
            $("#similar-movies-search").show();
            $("#js-multiSearch").hide();
            $("#js-search-one").hide();
        });
    }
    function handleSubmitButtons() {
        $("#js-one-movie-button").on("submit", event => {
            event.preventDefault();
            $("#one-movie-search").show();
            $("#similar-movies-search").hide();
            
        });
        $("#js-multi-search-button").on("submit", event => {
            event.preventDefault();
            $("#js-similar-movie-results").show();
            
        })
    }
    
//watch the form and get user input
    function watchForm() {   
        handleSearchButtons();
        handleSubmitButtons();
    //when a user searches for one movie, get the value, include that value in GET request
        $("form").on("submit", event => {
            event.preventDefault();          
            let searchTerm = $("#js-one-movie-search").val();
            let multiSearchTerm = $("#js-similar-movies").val();
            let maxResults = $("#js-max-results").val();
//console.log(`MaxResults are ${maxResults}`);
//console.log(`multiSearchTerm is ${multiSearchTerm}`);
//console.log(`searchTerm is ${searchTerm}`)
            getOmdbMovieInfo(searchTerm, 10);
            //getOmdbMovieInfo(multiSearchTerm, maxResults);
            getSimilarMovies(multiSearchTerm, maxResults);
            searchTerm.val("");
            multiSearchTerm.val("");
            maxResults.val("");
        });

    }
    
//ACTIVATE APP--call j$ and pass in a callback function to run when the page loads
$(watchForm)