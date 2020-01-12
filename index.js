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
//call the YouTube API to retrieve video IDs, etc.

    function getVideoIds(query, maxResults) {
        let fieldProps = `items(id/videoId)`
    //create an object of query parameters 
        const params = {
            q: query,
            maxNum: maxResults,
            part: "snippet",
            fields: fieldProps, 
            key: YouTubeKey
        }
    //format parameters according to YouTube docs
        const queryString = formatQueryParams(params);
        const searchURL = YouTubeURL + `search?` + queryString;
console.log(`searchURL is ${searchURL}`)
    //GET search results; then only retrieve body of response; then log the response data
        fetch(searchURL).then(response =>response.json()).then(responseJson => {
console.log(responseJson)
            responseJson.items.map(item => {
                let vidId = item["id"];
console.log(vidId)
                displayTrailers(vidId);
            })
        });
    }
//call the YouTube API to retrieve video players/trailers
    function getVideos(vidId) {
        const params = {
            id: vidId,
            part: "snippet,player",
            type: video, 
            key: YouTubeKey
        }
        const queryString = formatQueryParams(params);
        const vidURL = YouTubeURL + `search?` + queryString;
console.log(`vidURL is ${vidURL}`)

    }

    function displayTrailers(vidId) {
console.log(`displayTrailers ran`)
        
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
        getVideoIds("Candyman", 5);

    //capture the values of the user's input and pass those values to the GET function

    }
//ACTIVATE APP--call j$ and pass in a callback function to run when the page loads
$(watchForm)