require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");

var key;
var subject;
var command = process.argv[2];


switch (command) {
    case "concert-this":
        console.log("concert");
        break;

    case "spotify-this-song":
        console.log("spotify");
        break;

    case "movie-this":
        console.log("movie");
        findMovie();
        break;

    case "do-what-it-says":
        console.log("doing what is says");
        break;
};

var findConcert = function () {

}

function findMovie() {
    key = keys.omdb.id;
    subject = process.argv.splice(3).join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + subject + "&y=&plot=short&apikey=" + key;
    if (process.argv[3] === undefined) {
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=" + key).then(
            function (response) {
                console.log("no entry");

                //response
                console.log("The Title of the movie is " + response.data.Title +
                    "\nThe movie came out in " + response.data.Year +
                    "\nThe imdb Rating is " + response.data.Rating +
                    "\nRatings " + JSON.stringify(response.data.Ratings[1]) +
                    "\nThe movie was made in " + response.data.Country +
                    "\nThe language is " + response.data.Language +
                    "\nThe Plot is " + response.data.Plot +
                    "\nThe Actors are " + response.data.Actors);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    } else {
        axios.get(queryUrl).then(
            function (response) {
                // console.log(response);
                //response
                console.log("The Title of the movie is " + response.data.Title +
                    "\nThe movie came out in " + response.data.Year +
                    "\nThe imdb Rating is " + response.data.Rating +
                    "\nRatings " + JSON.stringify(response.data.Ratings[1]) +
                    "\nThe movie was made in " + response.data.Country +
                    "\nThe language is " + response.data.Language +
                    "\nThe Plot is " + response.data.Plot +
                    "\nThe Actors are " + response.data.Actors);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    }
}