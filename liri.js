//download the modules
var fs = require("fs");
var request = require("request");

//read the file with all the twitter keys to sync up account
fs.readFile("keys.js", "utf8", function(error, data) {
    // Then split it by commas
    var dataArr = data.split(":");
});
//user enters node liri.js THEN whatever function he wants to run ex: node liri.js my-tweets
function pickCommand(caseData, functionData) {
    switch (caseData) {
        case "my-tweets":
            twitterFunction();
            break;

        case "spotify-this-song":
            spotifyFunction();
            break;

        case "movie-this":
            getMyMoviesFunction();
            break;

        case "do-what-it-says":
            doItFunction();
            break;

        default:
            console.log("liri does not know that")
    }
}
//actually run the function
pickCommand(process.argv[2]);

//----------------twitter-------------------------
//twitter function prints 20 tweets linked up to acount in the keys.js file
function twitterFunction() {
    var Twitter = require('twitter');
    var client = new Twitter(require('./keys.js').twitterKeys);
    var params = { screen_name: 'tonysnowdenproj' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log("\n ************\n");
            }
        }
    });
};
// ----------------spotify-------------------------
//enter a song, spits out info about the song

function spotifyFunction() {
    // var spotify = require('spotify');
    var songName = "";
    var multiWordSong = ";"
    var dangerZone = "";

    //allows user to enter song with more than one word
    if (process.argv.length > 2) {
        for (var i = 3; i < process.argv.length; i++) {
            songName += process.argv[i] += "+"
            // songName= songName + process.argv[i] + process.argv[i] + '+'
            multiWordSong = songName.slice(0, -1);
        }
        spotifyQueryUrl = "https://api.spotify.com/v1/search?q=" + multiWordSong + "&type=track"
        console.log(spotifyQueryUrl);
        //the request has the console.logs which print the information we want
        request(spotifyQueryUrl, function(error, response, body) {
            console.log("Name: " + JSON.parse(body).tracks.items[0].name);
            console.log("Artist: " + JSON.parse(body).tracks.items[0].album.artists[0].name);
            console.log("Album " + JSON.parse(body).tracks.items[0].album.name);
            console.log("link: " + JSON.parse(body).tracks.items[0].external_urls.spotify);
        });
    }
    //if user does not enter a specific song, link to the danger zone song
    else if (process.argv[3] = "") {
        dangerZone = "https://api.spotify.com/v1/search?q=danger+zone&type=track"
            // console.log(dangerZone);
        //the request has the console.logs which print the information we want just for DangerZone
        request(dangerZone, function(error, response, body) {
            console.log("Name: " + JSON.parse(body).tracks.items[0].name);
            console.log("Artist: " + JSON.parse(body).tracks.items[0].album.artists[0].name);
            console.log("Album " + JSON.parse(body).tracks.items[0].album.name);
            console.log("link: " + JSON.parse(body).tracks.items[0].external_urls.spotify);
        });
    }
};
//----------------movies-------------------------
//enter movie name, get information back
function getMyMoviesFunction() {
    var request = require("request");
    // Store all of the arguments in an array
    var nodeArgs = process.argv;
    // Create an empty variable for holding the movie name
    var movieName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 2 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    // connect to omdb- the search will use the queryURL
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
    //the broken searches which need a default will use mrNobody
    var mrNobody = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json";
    request(queryUrl, function(error, response, body) {
        // If the request is successful, print the info we want:
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

            //if no movie name entered
        } if (queryUrl === "") {
            request(mrNobody, function(error, response, body) {
                console.log("your input was not valid, so here is our default suggestion:");
                console.log("\n ************\n");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            });
        }
    });
};
//----------------do it function-------------------------
//reads the random.txt file, run spotify-this-song for "i want it that way"
function doItFunction() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArray = data.split(",");

        for (var i = 0; i < dataArray.length; i++) {
            var randomCommand = dataArray[0].trim();
            var randomSongSelected = dataArray[1].trim();
            // console.log(randomSongSelected)
            if (randomCommand === "spotify-this-song") {
                queryUrl = "https://api.spotify.com/v1/search?q=" + randomSongSelected + "&type=track";
                request(queryUrl, function(error, response, body) {
                    // console log what spits out spotify info
                    console.log("Name: " + JSON.parse(body).tracks.items[0].name);
                    console.log("Artist: " + JSON.parse(body).tracks.items[0].album.artists[0].name);
                    console.log("Album " + JSON.parse(body).tracks.items[0].album.name);
                    console.log("link: " + JSON.parse(body).tracks.items[0].external_urls.spotify);
                });
                return;
            }
        }
    });
};
