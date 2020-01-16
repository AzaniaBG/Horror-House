'use strict'

//store API keys in global variables to access for API calls
const omdbKey = "cb95d063"
const tmdbKey = "b81d09aa5f188c95ba4dc2e4336459b4"
//const YouTubeKey = "AIzaSyD9L4wcH4JuIUXlNkavwNEQl-kH2_MsIOg"

//save API base URLs to modify according to search

const omdbSearchURL = "http://www.omdbapi.com/?"
const tmdbVideoURL = "https://api.themoviedb.org/3/movie/"
//config for ID: https://api.themoviedb.org/3/configuration?api_key=b81d09aa5f188c95ba4dc2e4336459b4
//const YouTubeURL = "https://www.googleapis.com/youtube/v3/"
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

    function getMovieInfo(query) {
        const params = {
            apikey: omdbKey,
            type: "movie",
            s: query,
            page: 1,
        }
        const queryString = formatOmdbQueryParams(params);
        //const imageURL = omdbImgURL + queryString;
        const searchURL = omdbSearchURL + queryString;
//console.log(`imageURL is ${imageURL}`);
console.log(`searchURL is ${searchURL}`)
        fetch(searchURL)
           .then(response => response.json())
           .then(responseJson => {
               displayMovieInfo(responseJson, query);
               checkForExactMatch(responseJson, query);
               getVideoPlayer(responseJson);
            });
    }

    
//find similar movies and list results according to maxResults specified
//     function getSimilarMovies(query, maxResults) {
        

//         // const params = {
//         //     q: query,
//         //     maxNum: maxResults,
//         //     part: "snippet",
//         //     type: "video", 
//         //     fields: fieldsParams,
//         //     key: YouTubeKey
//         // }
//     }


//display information related to search results for one movie
    function displayMovieInfo(responseJson, query) {
console.log(responseJson)
        let movieData = responseJson.Search;
        movieData.map(item => {
            if(query === item["Title"]) {
console.log(`title match`)
            }
            let movieInfo =
            `<p>${item["Title"]} ${item["Year"]}</p>
            <img src="${item["Poster"]}"/>`
            $("h1").append(movieInfo);          
//console.log(movieId)
//console.log(moviePoster)
        });
    //display movie name and year
    //display rating
    //display additional information (e.g., articles/reviews) 
    //let exactMatch = checkForExactMatch(responseJson, query)
//console.log(`exactMatch is ${exactMatch}`)
    }

    function getVideoPlayer(vidID) {
        const params = {
            api_key: tmdbKey,
            language: "en-US",
        }
        const queryString = formatTmdbQueryParams(params);
        const videoURL = tmdbVideoURL + vidID + "/videos?" + queryString;
//console.log(`tmdb videoURL is ${videoURL}`)
        //let videoURL = "https://api.themoviedb.org/3/movie/tt4263482/videos?api_key=b81d09aa5f188c95ba4dc2e4336459b4"
                    https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
        fetch(videoURL).then(response => response.json()).then(responseJson => console.log(responseJson))
    }

    function checkForExactMatch(responseJson, query) {
console.log(responseJson)
        let movieInfo = responseJson.Search;
        let match = movieInfo.map(info => {
            let title = info["Title"];
            let ID = info["imdbID"]
            if(query === title) {
// console.log(`match found: ${title}`)
// console.log(`ID is ${ID}`)
            getVideoPlayer(ID);
            }  
     
        });
    }

    function displayVideoTrailer(vidID) {
console.log(`vidID is ${vidID}`)

    }
//watch the form and get user input
    function watchForm() {   
    //when a user searches for one movie, get the value, include that value in GET request
        $("form").on("submit", event => {
            event.preventDefault();
            let searchTerm = $("#js-one-movie-search").val();
    //capture the values of the user's input and pass those values to the GET function
        getMovieInfo(searchTerm);
        });
    //when a user searches for similar movies and max Results, get the value, include those values in GET request

    //capture user's input values and pass them to the GET function: getSimilarMovies(query, maxResults)

    }
    
//ACTIVATE APP--call j$ and pass in a callback function to run when the page loads
$(watchForm)