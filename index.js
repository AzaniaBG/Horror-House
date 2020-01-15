'use strict'

//store API keys in global variables to access for API calls
const omdbKey = "cb95d063"
//const tmdbKey = "b81d09aa5f188c95ba4dc2e4336459b4"
//const YouTubeKey = "AIzaSyD9L4wcH4JuIUXlNkavwNEQl-kH2_MsIOg"

//save API base URLs to modify according to search
const omdbURL = "http://img.omdbapi.com/?apikey=cb95d063"
//const tmdbURL = "https://api.themoviedb.org/3/"
//config for ID: https://api.themoviedb.org/3/configuration?api_key=b81d09aa5f188c95ba4dc2e4336459b4
//const YouTubeURL = "https://www.googleapis.com/youtube/v3/"
//https://www.googleapis.com/youtube/v3/videos?&part=snippet&fields=items(snippet)&key=AIzaSyD9L4wcH4JuIUXlNkavwNEQl-kH2_MsIOg
//test variables


//format query parameters
    function formatOmdbQueryParams(params) {

    }
    
    function formatQueryParams(params) {
    //create an array of keys from the PARAMS `object` argument and, for each key, create a formatted key-pair value string
        const searchQueryItems = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`);
    //return a string of each key-pair value separated by &s
        return searchQueryItems.join("&");

    //format YouTube parameters for SEARCH endpoint


    //format YouTube parameters for VIDEOS endpoint

    }
//find similar movies and list results according to maxResults specified
    function getSimilarMovies(query, maxResults) {
        

        // const params = {
        //     q: query,
        //     maxNum: maxResults,
        //     part: "snippet",
        //     type: "video", 
        //     fields: fieldsParams,
        //     key: YouTubeKey
        // }
    }
//GET movie images
    function getMovieId(query) {

        const params = {
            query: query,
            language: "en-US",
            api_key: tmdbKey,
            page: 1,
            include_adult: false,
            //external_source: "imdb_id",
            //append_to_response: "images",
        }
        //let multiRequest = "&append_to_response=images"
        const queryString = formatQueryParams(params);
        const idURL = tmdbURL + `search/movie?`+ queryString;
        //GET movie ID with fetch
        fetch(idURL).then(response => response.json()).then(responseJson => getMovieImages(responseJson));      
    }

    function getMovieImages(responseJson) {
// console.log(`responseJson is`);
// console.log(responseJson);
        let movieID = responseJson.results[0]["id"];

        const params = {
            language: "en-US",
            api_key: tmdbKey,
            page: 1,
            include_adult: false,
            //external_source: "imdb_id",
            append_to_response: "images",
        }
        //GET movie image with movie ID
        const queryString = formatQueryParams(params);
        const idURL = tmdbURL + `movie/`+ `${movieID}?` + queryString;
console.log(`idURL is ${idURL}`)
        fetch(idURL).then(response => response.json()).then(responseJson => {
console.log(responseJson)
        
        displayMovieImages(responseJson)
        });
    }

    function displayMovieImages(responseJson) {
        let size = 'w400'
console.log(responseJson)
        let posterPath = responseJson["poster_path"]
        let imageURL = "https://image.tmdb.org/t/p/";
        //let movieID = ;
        
        const idURL = imageURL + size + posterPath;
console.log(`idURL is ${idURL}`)
        $("h1").append(`<img src="${idURL}"/>`);

    }
//GET movie info
//     function getMovieSnippets(query) {
//         let fieldsParams = "items(snippet, id/videoId)"
//         let trailerQuery = query + ",trailer"
// console.log(`trailerQuery is ${trailerQuery}`)
//         const params = {
//             q: trailerQuery,
//             part: "snippet",
//             type: "video", 
//             fields: fieldsParams,
//             key: YouTubeKey
//         }
//         const queryString = formatQueryParams(params);
//         const snippetURL = YouTubeURL + `search?` + queryString;
// console.log(`snippetURL is ${snippetURL}`)
//         fetch(snippetURL).then(response =>response.json()).then(responseJson => {
//             displayMovieInfo(responseJson);
//             displaySimilarMovies(responseJson);
//             getVideos(responseJson);

//         //responseJson returns ITEMS array, containing ID and snippet objects 
// console.log(responseJson)
//         //for each item in the ITEMS Array, return an array of string IDs, titles, and images
//         })
       
//     }

// //call the YouTube API to retrieve video players/trailers and video info
//     function getVideos(vidId) {
//         let fieldParams = "items(etag, player)"
//         const params = {
//             id: vidId,
//             part: "player",
//             fields: fieldParams,
//             key: YouTubeKey
//         }
//         const queryString = formatQueryParams(params);
//         const vidURL = YouTubeURL + `videos?` + queryString;
// console.log(`vidURL is ${vidURL}`)
//         fetch(vidURL).then(response => response.json()).then(responseJson => console.log(responseJson));

//     }
// //embed video for user to play
//     function embedVideo() {
//         //get video player details
//         //set video player size
//         //include video controls
//         //display message if video unavailable
//         //display message if video player not supported

//     }
//     function displayTrailers(vidId) {
// //console.log(`displayTrailers ran`)
        
//         return `<video id="${vidId}" src="${vidId}" class="js-trailer">Trailer: ${vidId}</video>`;

//     }
    
// //display information related to search results for one movie
//     function displayMovieInfo(responseJson) {
// console.log(responseJson)
// //         responseJson.items.map(item => {
// //             let vidIds = item.id["videoId"];
// //             getVideos(vidIds);
// //             let titles = item.snippet["title"];
            
// //             let images = item.snippet.thumbnails;
// //             displayMovieInfo(titles, images);       
// // //console.log(`titles is ${titles}`)
// //             });
//     //display movie name and year
// console.log(`<h3>${titles}</h3>`)    
//     //display rating

//     //display additional information (e.g., articles/reviews)   
//     }

// //list similar movies based on search results
//     function displaySimilarMovies() {
//         responseJson.items.map(item => {
//         let vidIds = item.id["videoId"];
//         getVideos(vidIds);
//         let titles = item.snippet["title"];
        
//         let images = item.snippet.thumbnails;
//         displayMovieInfo(titles, images);       
// //console.log(`titles is ${titles}`)
//         });
//     //display movie name and year
//     //display movie information
//     //user can click on result and view information with displayMovieInfo function
//     }
//watch the form and get user input
    function watchForm() {   
    //when a user searches for one movie, get the value, include that value in GET request
        $("form").on("submit", event => {
            event.preventDefault();
            let searchTerm = $("#js-one-movie-search").val();
    //capture the values of the user's input and pass those values to the GET function
        getMovieId(searchTerm);
            //getMovieSnippets(searchTerm);
//console.log(`searchTerm is ${searchTerm}`)
            }
    //when a user searches for similar movies and max Results, get the value, include those values in GET request

    //capture user's input values and pass them to the GET function: getSimilarMovies(query, maxResults)

        )

    

    }
    
//ACTIVATE APP--call j$ and pass in a callback function to run when the page loads
$(watchForm)