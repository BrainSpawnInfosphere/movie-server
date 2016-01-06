

var process = require('process');
var mdb = require('moviedb')(process.env.TMDB);



// given one movie name and optionally a year, get the movie info
function getMovieInfo(movie){
	console.log('sending '+movie.movie+' '+movie.year);
	return new Promise(function(resolve,reject){
		var q = {};
		if(movie.year == '') q = {query: movie.movie, adult: false };
		else q = {query: movie.movie, adult: false, year: movie.year };
		mdb.searchMovie(q, function(err, res){resolve( res );});
	});
}

// take a list of movies and get the info 
function getAllMovieInfo(list){
	for(var i=0;i<list.length;i++){
		getMovieInfo(list[i]).then( function(response){
// 			console.log(': '+ JSON.stringify(response.results[0])+'\n\n');
			console.log('['+ response.results[0].original_title+']');
			console.log(response.results[0].overview+'\n');
		});
	}
}

module.exports = getAllMovieInfo;