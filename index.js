'use strict'

//store API keys in global variables to access for API calls
const YouTubeKey = "AIzaSyAs4XB1Jqg3e714vdB8t4QJ4zGIurzYS8E"

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
//GET movie info
    function getMovieSnippets(query, maxResults) {
        let fieldsParams = "items(snippet, id/videoId)"

        const params = {
            q: query,
            maxNum: maxResults,
            part: "snippet",
            type: "video", 
            fields: fieldsParams,
            key: YouTubeKey
        }
        const queryString = formatQueryParams(params);
        const snippetURL = YouTubeURL + `search?` + queryString;
console.log(`snippetURL is ${snippetURL}`)
        fetch(snippetURL).then(response =>response.json()).then(responseJson => {
        //responseJson returns ITEMS array, containing ID and snippet objects 
console.log(responseJson)
        //for each item in the ITEMS Array, return an array of string IDs
        responseJson.items.map(item => getVideos(item.id["videoId"]));

        })
        
    }

//call the YouTube API to retrieve video players/trailers
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

    function displayTrailers(vidId) {
//console.log(`displayTrailers ran`)
        
        return `<video id="${vidId}" src="${vidId}" class="js-trailer">Trailer: ${vidId}</video>`;

    }
    
//display information related to search results 
    function displayMovieInfo() {
    //display movie name and year

    //display poster image for movie result(s)
    
    //display rating

    //display additional information
    
    }
//embed video for user to play
    function embedVideo() {

    }
//list similar movies based on search results
    function displaySimilarMovies() {
    //display movie name and year

    //display movie information

    }
//watch for the form submission
    function watchForm() {
        
        getMovieSnippets("Candyman", 5)

    //capture the values of the user's input and pass those values to the GET function

    }
//ACTIVATE APP--call j$ and pass in a callback function to run when the page loads
$(watchForm)