require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
//API KEY
var key;
// used as movie input
var subject;
// used as switch command
var command = process.argv[2];
// spotify API keys
var Spotify = require("node-spotify-api");

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})


switch (command) {
    case "concert-this":
        console.log("concert");
        findConcert();
        break;

    case "spotify-this-song":
        console.log("spotify");
        findSong();
        break;

    case "movie-this":
        console.log("movie");
        console.log(process.argv.length)
        if (process.argv.length === 3) {
            subject = "mr+nobody";
            findMovie();
        } else {
            findMovie();
        }
        break;

    case "do-what"://-it-says
        console.log("doing what is says");
        doWhat();
        break;
};

function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        console.log(data);
        var dataArray = data.split(",");

        command = dataArray[0];
        if (command === "spotify-this-song") {
            song = dataArray[1].slice(1, -1);
            findSong(song);
        }

    })
}


function findConcert() {
    var artist = process.argv.splice(3).join("%20");
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function (response) {

            var artistRes = response.data[0];
            var date = artistRes.datetime

            var concertInfo = "Concert Info for " + artistRes.artist.name +
                "\nVenue name: " + artistRes.venue.name +
                "\nVenue location: " + artistRes.venue.city + ", " + artistRes.venue.region + ", " + artistRes.venue.country +
                "\nDate of event: " + moment(date).format("MM/DD/YYYY") + "\n";
            console.log(concertInfo);

            fs.appendFile("log.txt", "\n" + concertInfo, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("content added to log.txt")
                }

            })

            console.log("--------------------");

        })

}

function findSong(song) {
    var song = process.argv.splice(3).join("")
    spotify.search({ type: 'track', query: song, limit: 1 })
        .then(function (response) {

            var songInfo = "Song Info for " + response.tracks.items[0].name +
                "\nArtist: " + response.tracks.items[0].artists[0].name +
                "\nSong Name: " + response.tracks.items[0].name +
                "\nAlbum Name: " + response.tracks.items[0].album.name +
                "\nPreview URL: " + response.tracks.items[0].preview_url + "\n";
            console.log(songInfo)
            fs.appendFile("log.txt", "\n" + songInfo, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("content added to log.txt")
                }

            })
        }).catch(function (err) {
            console.log(err)
        });
};




function findMovie() {
    key = keys.omdb.id;
    subject = process.argv.splice(3).join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + subject + "&y=&plot=short&apikey=" + key;

    //need help on this?? how to get the subject to be undefined?
    axios.get(queryUrl).then(
        function (response) {

            //response
            movieInfo = "Movie Title: " + response.data.Title +
                "\nRelease Year: " + response.data.Year +
                "\nIMDB Rating: " + response.data.Rating +
                "\nRatings: " + JSON.stringify(response.data.Ratings[1]) +
                "\nThe movie was made in: " + response.data.Country +
                "\nThe language is: " + response.data.Language +
                "\nThe Plot is: " + response.data.Plot +
                "\nThe Actors are: " + response.data.Actors + "\n";
            console.log(movieInfo);
            fs.appendFile("log.txt", "\n" + movieInfo, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("content added to log.txt")
                }

            })

        })
        .catch(function (err) {
            console.log(err);
        });
}
/*if (process.argv.length < 4) {
    subject = "mr+nobody"
    axios.get("http://www.omdbapi.com/?t=" + subject + "&y=&plot=short&apikey=" + key).then(
        function (response) {
            console.log("no entry");
            //response
            var movieInfo = "Movie Title: " + response.data.Title +
                "\nRelease Year: " + response.data.Year +
                "\nIMDB Rating: " + response.data.Rating +
                "\nRatings: " + JSON.stringify(response.data.Ratings[1]) +
                "\nThe movie was made in: " + response.data.Country +
                "\nThe language is: " + response.data.Language +
                "\nThe Plot is: " + response.data.Plot +
                "\nThe Actors are: " + response.data.Actors + "\n";
            console.log(movieInfo);
            fs.appendFile("log.txt", "\n" + movieInfo, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("content added to log.txt")
                }

            })
        })
        .catch(function (err) {
            console.log(err);
        });
};
*/