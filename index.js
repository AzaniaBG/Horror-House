'use strict'

//store API keys in global variables to access for API calls
const omdbKey = "cb95d063"
const tmdbKey = "b81d09aa5f188c95ba4dc2e4336459b4"
//const YouTubeKey = "AIzaSyD9L4wcH4JuIUXlNkavwNEQl-kH2_MsIOg"

//save API base URLs to modify according to search
const omdbSearchURL = "http://www.omdbapi.com/?"//use to get movie ID
const tmdbSearchURL = "https://api.themoviedb.org/3/movie/"//use for ratings, etc.
//config for ID: https://api.themoviedb.org/3/configuration?api_key=b81d09aa5f188c95ba4dc2e4336459b4
const YouTubeURL = "https://www.googleapis.com/youtube/v3/"
//https://www.googleapis.com/youtube/v3/videos?&part=snippet&fields=items(snippet)&key=AIzaSyD9L4wcH4JuIUXlNkavwNEQl-kH2_MsIOg
//test variables


//format query parameters
    function formatOmdbQueryParams(params) {
    //return an array of keys in the `params` object and, from that array, create a string from each property: key=value, and join the key/value properties with &
        const imageQueryItems = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`);

        return imageQueryItems.join("&");
    }
    function formatTmdbQueryParams(params) {
        const videoQueryItems = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`);
console.log(`videoQueryItems is ${videoQueryItems}`)
        return videoQueryItems.join("&");
    }

    function getOmdbMovieInfo(query) {
//console.log(`query is: ${query}`)
        const params = {
            apikey: omdbKey,
            type: "movie",
            s: query,
            page: 1,
        }
        const queryString = formatOmdbQueryParams(params);
        const searchURL = omdbSearchURL + queryString;
//console.log(`searchURL is ${searchURL}`)
        fetch(searchURL)
           .then(response => response.json())
           .then(responseJson => {
//console.log(`omdbSearchURL returns`, responseJson)
                displayMovieInfo(responseJson, query);
            });
    }

    function getYtId(imdbID) {
//console.log(`getYtId ran`)
                const params = {
                api_key: tmdbKey,
                language: "en-US",
                append_to_response: "videos",
            }
            const queryString = formatTmdbQueryParams(params);
            const videoURL = tmdbSearchURL + `${imdbID}/videos?` + queryString;
console.log(`tmdb videoURL is ${videoURL}`)
            fetch(videoURL).then(response => response.json()).then(responseJson => {

                let videos = responseJson.results;
//console.log(`getYtId responseJson:`, videos)
                let ytMatch = videos.filter(video => video["site"] === "YouTube");
console.log(`ytMatch returns`, ytMatch)
                //let ytID = ytMatch[0]["id"]
                let ytID = ytMatch[0]["key"]
                // let poster = ytMatch[0][]
                //let poster = "https://m.media-amazon.com/images/M/MV5BMTUyNzkwMzAxOF5BMl5BanBnXkFtZTgwMzc1OTk1NjE@._V1_SX300.jpg"
//console.log(`ytID is`, ytID)
                displayVideoTrailer(ytID);
//console.log(`TMDb responseJson`, responseJson)
            })
    }

    
//find similar movies and list results according to maxResults specified
//     function getSimilarMovies(query, maxResults) {
        
    function getSimilarMovies(movieID) {
//console.log(`getSimilarMovies ran`)
console.log(`getSimilar response data:`, movieID)
        const parameters = {
            api_key: tmdbKey,
            language: "en-US",
            page: 1,
        }
        const queryString = formatTmdbQueryParams(parameters);
        const similarURL = tmdbSearchURL + `${movieID}/similar?` + queryString;
console.log(`similarURL is ${similarURL}`)
        fetch(similarURL).then(response => response.json()).then(responseJson => {
            let results = responseJson.results;
console.log(`results is`, results)
            //for each result, display them in a list item
            displaySimilarMovies(results);
        })
    }

//display information related to search results for one movie
    function displayMovieInfo(responseJson, query) {
console.log(`displayMovieInfo json data:`, responseJson)
        let movieInfo;
        let movieData = responseJson.Search;
        let movieMatch = movieData.filter(item => query === item["Title"])           
//console.log(`movieMatch is`, movieMatch)
        movieMatch.map(detail => {
            let movieTitle = detail["Title"];
            let movieYear = detail["Year"]
            let movieImg = detail["Poster"];
            let movieId = detail["imdbID"];
console.log(`movieId is ${movieId}`)
            getYtId(movieId);
            getSimilarMovies(movieId);
            movieInfo = generateElementString(movieTitle, movieYear, movieImg, movieId);
        });
//console.log(`movieInfo is ${movieInfo}`)    
        
    //display movie name and year
       $("#one-movie").html(movieInfo);
    //display rating
    //display additional information (e.g., articles/reviews) 
    //let exactMatch = checkForExactMatch(responseJson, query)
//console.log(`exactMatch is ${exactMatch}`)
    }
    function displayVideoTrailer(ytID) {
//console.log(`ytID from displayVideoTrailer is:`, ytID)       
//console.log(`vidID is ${vidID}`)
        let trailer = `https://www.youtube.com/embed/${ytID}?enablejsapi=1&origin=https://m.media-amazon.com/images/M/MV5BMTUyNzkwMzAxOF5BMl5BanBnXkFtZTgwMzc1OTk1NjE@._V1_SX300.jpg`
        let iFrameElement = `<iFrame id="iFrame-player" type="text/html" width="480" height="400"src="${trailer}"></iFrame>`
//console.log(`displayVideoTrailer trailer is ${trailer}`)
        $("#iFrame-player").html(iFrameElement);    
    }

    function displaySimilarMovies(results) {
//console.log(`results is ${results}`)
         let movieList = results.map(movie => {
             let title = movie["title"];
console.log(`title is ${title}`)
            $("ul").append(`<li>${title}</li>`)
            //generateSimilarsElementString(title);
         });
// console.log(`movieList is ${movieList}`, typeof movieList)
//         $("ul").appendTo(movieList);
    }
    function generateElementString(title, year, image, id) {
        return `<h3 class="one-movie-results">${title} (${year})</h3>
        <img id="${id}" src="${image}" alt="${title} movie poster.">`
    }
    function generateSimilarsElementString(movie) {
        return `<li class="similar-movies">${movie}</li>`
    }
    function handleSearchButtons() {
        $("#js-search-one").on("click", event => {
            event.preventDefault();
            $("#one-movie-search").show();
            $("#js-search-one").hide();
            $("#js-multiSearch").hide();
        });
        $("#js-multiSearch").on("click", event => {
            event.preventDefault();
            $("#similar-movies-search").show();
            $("#js-multiSearch").hide();
            $("#js-search-one").hide();
        });
    }
//watch the form and get user input
    function watchForm() {   
        handleSearchButtons();
    //when a user searches for one movie, get the value, include that value in GET request
        $("form").on("submit", event => {
            event.preventDefault();          
            let searchTerm = $("#js-one-movie-search").val();
            let multiSearchTerm = $("#js-similar-movies").val();
//console.log(`multiSearchTerm is ${multiSearchTerm}`);
//console.log(`searchTerm is ${searchTerm}`)
            getOmdbMovieInfo(searchTerm);
            getOmdbMovieInfo(multiSearchTerm);
        });

    }
    
//ACTIVATE APP--call j$ and pass in a callback function to run when the page loads
$(watchForm)