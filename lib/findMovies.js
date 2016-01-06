
var fs = require('fs');                         // read files


function getMovies(path){
	var f = fs.readdirSync(path);
	return f;
};

function findMovies(path){
	var f = getMovies(path);
	// console.log( 'outside' + f );
	for(var i=0; i<f.length ; i++){
		console.log( 'file: ' + f[i] );
	}

	// keep only movies and remove file extension
	var movie_list = f.filter(function(e) { return e.search('.m4v')>0; });

	for(var i=0;i<movie_list.length;i++){
		var movie_name = '';
		var yr = '';
		// fixme: grab year if there
		movie_name = movie_list[i].toLowerCase().replace('.m4v','');
		if(movie_name.indexOf('(') > -1){
			yr = movie_name.split('(')[1].replace(')','');
			movie_name = movie_name.split('(')[0];
		}
		movie_name = movie_name.replace(/[\W_]+/g, " ");
		movie_list[i] = {movie: movie_name, file: movie_list[i], year: yr}; 
	}
	
	return movie_list;
}

module.exports = findMovies;