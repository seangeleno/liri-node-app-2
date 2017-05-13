console.log('this is loaded');

exports.twitterKeys = {
  consumer_key: 'wJBFo5zaO4W8b0r4ZXPkLvJFi',
  consumer_secret: 'kZtQBkwRoH1CnilMzHzJrXdNdKW66mgFZFKiUjBu5utOcgH8WW',
  access_token_key: '860242137966813184-iM2aWxwmc648Z6IlcAbxc4Ru18n7cKs',
  access_token_secret: 'PQW2XQ8dUlUsaVrMXYLOvUIEOdQoYvDy9eCm47vRLZTOM'
};

exports.twitterKeys = {
    consumer_key: 'wJBFo5zaO4W8b0r4ZXPkLvJFi',
    consumer_secret: 'kZtQBkwRoH1CnilMzHzJrXdNdKW66mgFZFKiUjBu5utOcgH8WW',
    access_token_key: '860242137966813184-iM2aWxwmc648Z6IlcAbxc4Ru18n7cKs',
    access_token_secret: 'PQW2XQ8dUlUsaVrMXYLOvUIEOdQoYvDy9eCm47vRLZTOM'
};


//

// // Run the test
// if (my_tweets === "my-tweets") {

//     // Print equality.
//     console.log(true);
// } else {
//     console.log(false);
// }

// if (spotify_this_song === "spotify-this-song") {
//     console.log(true);
// } else {
//     console.log(false);
// }

// if (movie_this === "movie-this") {
//     console.log(true);
// } else {
//     console.log(false);
// }

// if (do_what_it_says === "do-what-it-says") {
//     console.log(true);
// } else {
//     console.log(false);
// }



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