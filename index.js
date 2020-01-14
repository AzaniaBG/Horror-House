'use strict'

//store API keys in global variables to access for API calls
const YouTubeKey = "AIzaSyD9L4wcH4JuIUXlNkavwNEQl-kH2_MsIOg"

//save API base URLs to modify according to search
const YouTubeURL = "https://www.googleapis.com/youtube/v3/"

//test variables


//format query parameters
    function formatQueryParams(params) {
    //create an array of keys from the PARAMS `object` argument and, for each key, create a formatted key-pair value string
        const searchQueryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
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
//GET movie info
    function getMovieSnippets(query) {
        let fieldsParams = "items(snippet, id/videoId)"

        const params = {
            q: query,
            part: "snippet",
            type: "video", 
            fields: fieldsParams,
            key: YouTubeKey
        }
        const queryString = formatQueryParams(params);
        const snippetURL = YouTubeURL + `search?` + queryString;
//console.log(`snippetURL is ${snippetURL}`)
        fetch(snippetURL).then(response =>response.json()).then(responseJson => {
            displayMovieInfo(responseJson);
            displaySimilarMovies(responseJson);
            getVideos(responseJson);

        //responseJson returns ITEMS array, containing ID and snippet objects 
console.log(responseJson)
        //for each item in the ITEMS Array, return an array of string IDs, titles, and images
        })
       
    }

//call the YouTube API to retrieve video players/trailers and video info
    function getVideos(vidId) {
        let fieldParams = "items(etag, player)"
        const params = {
            id: vidId,
            part: "player",
            fields: fieldParams,
            key: YouTubeKey
        }
        const queryString = formatQueryParams(params);
        const vidURL = YouTubeURL + `videos?` + queryString;
console.log(`vidURL is ${vidURL}`)
        fetch(vidURL).then(response => response.json()).then(responseJson => console.log(responseJson));

    }
//embed video for user to play
    function embedVideo() {
        //get video player details
        //set video player size
        //include video controls
        //display message if video unavailable
        //display message if video player not supported

    }
    function displayTrailers(vidId) {
//console.log(`displayTrailers ran`)
        
        return `<video id="${vidId}" src="${vidId}" class="js-trailer">Trailer: ${vidId}</video>`;

    }
    
//display information related to search results for one movie
    function displayMovieInfo(responseJson) {
        responseJson.items.map(item => {
            let vidIds = item.id["videoId"];
            getVideos(vidIds);
            let titles = item.snippet["title"];
            
            let images = item.snippet.thumbnails;
            displayMovieInfo(titles, images);       
//console.log(`titles is ${titles}`)
            });
    //display movie name and year
console.log(`<h3>${titles}</h3>`)    
    //display rating

    //display additional information (e.g., articles/reviews)   
    }

//list similar movies based on search results
    function displaySimilarMovies() {
        responseJson.items.map(item => {
        let vidIds = item.id["videoId"];
        getVideos(vidIds);
        let titles = item.snippet["title"];
        
        let images = item.snippet.thumbnails;
        displayMovieInfo(titles, images);       
//console.log(`titles is ${titles}`)
        });
    //display movie name and year
    //display movie information
    //user can click on result and view information with displayMovieInfo function
    }
//watch the form and get user input
    function watchForm() {   
    //when a user searches for one movie, get the value, include that value in GET request
        $("form").on("submit", event => {
            event.preventDefault();
            let searchTerm = $("#js-one-movie-search").val();
    //capture the values of the user's input and pass those values to the GET function
            getMovieSnippets(searchTerm);
//console.log(`searchTerm is ${searchTerm}`)
            }
    //when a user searches for similar movies and max Results, get the value, include those values in GET request

    //capture user's input values and pass them to the GET function: getSimilarMovies(query, maxResults)

        )

    

    }
    
//ACTIVATE APP--call j$ and pass in a callback function to run when the page loads
$(watchForm)