// Simple GET PUT
// ----------------
// curl -i -X GET http://tardis.local:8001/api 
// curl -i -X PUT http://localhost:8001/api --data '{"name":"tom", "age":45.77}' -H "Content-Type: application/json"
// curl -i -X GET http://tardis.local:8001/test.html

var process = require('process');
var mdb = require('moviedb')(process.env.TMDB);

var http_debug = require('debug')('kevin:http') // debug
var http = require('http');                     // http-server
var program = require('commander');             // command line args
var fs = require('fs');                         // read files
var server;                                     // actual server

var pck = require('./package.json');

program
	.version(pck.version)
	.description('Movie server')
	.option('-p, --port <port>','Http server port number',parseInt,8000)
	.option('-m, --movies <path>','Location of movies','./')
	.option('-w, --web <path>','Location of webpage','./')
	.parse( process.argv );

var spawn = require('child_process').exec;

// run media
// spawn('ls', function (err, stdout, stderr) {
//     console.log(stdout);
// });

console.log('Server started on localhost',program.port);
// console.log('cli: ',program.movies, program.web);


function getMovies(path){
// 	var ls = spawn('ls -alh');
// 	console.log( ls );
// 	ls.stdout.on('data', function(data){
// 		console.log(JSON.stringify(data));
// 	});

	var f = fs.readdirSync(path);
// 	console.log( 'inside', f );
	return f;
};

var f = getMovies('./movies');
// console.log( 'outside' + f );
for(var i=0; i<f.length ; i++){
	console.log( 'file: ' + f[i] );
}

// keep only movies and remove file extension
var movie_list = f.filter(function(e) { return e.search('.m4v')>0; });

for(var i=0;i<movie_list.length;i++){
	movie_list[i] = {movie: movie_list[i].replace('.m4v','').replace('_',' ').toLowerCase(), file: movie_list[i]}; 
}
console.log(movie_list);


function getMovieInfo(movie_name){
	console.log('sending '+movie_name);
	return new Promise(function(resolve,reject){
		mdb.searchMovie({query: movie_name, adult: false }, function(err, res){resolve( res );});
	});
}

function getAllMovieInfo(list){
	for(var i=0;i<list.length;i++){
		getMovieInfo(list[i].movie).then( function(response){
			console.log(': '+ JSON.stringify(response.results[0])+'\n\n');
		});
	}
}

//  http://api.themoviedb.org/3/search/movie/{query:'alien',api_key:'f3213fa916c74e9d3b01358e2a11945a'}

getAllMovieInfo(movie_list);

// getMovieInfo('alien').then( function(response){
// 	console.log('resp: '+response);
// });

/*
movie name
movie file
popularity
tag line
poster (original or smaller)
backdrop (original or smaller)
run time
----------------

0. read file on start up
1. scan folder
2. create new db with folder info
3. transfer movie info from old db to new db
4. get missing info from tmdb.org
5. create pages
6. save info to file 
7. serve files and wait to re-scan
*/

// use adult false n search
// base_url: mdb.configuration(function(err, res){console.log(res);});
// url = <base_url> + <max_size> + <rel_path>
// tag line/run time/imdb number: mdb.movieInfo({id: '348'}, function(err, res){console.log(res);});
//mdb.searchMovie({query: 'alien', year:'1979' }, function(err, res){console.log( res );});

///////////////////////////////////

server = http.createServer(function(req, res){
    var path = req.url; 
    http_debug( path );
    
	if (path == '/api'){
		if (req.method == 'PUT') {
			spawn('ls', function (err, stdout, stderr) {
				console.log(stdout);
			});
			res.writeHead(200, "OK", {'Content-Type': 'text/html'});
			res.write('Re-scanning media\n\n');
			res.end(); 
		}
		else if (req.method == 'GET') { 
			fs.readFile(program.web + 'movie.json', function(err, data){
                if (err){ 
                    return send404(res);
                }
                res.writeHead(200, {'Content-Type':'text/json'});
                res.write(data, 'utf8');
//                 res.write(JSON.stringify( data ));
                res.end();
            });
		}
		// force users to use GET/PUT
		else {
			http_debug("Wrong method " + req.method)
			res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
			res.write("Wrong method: use GET/PUT\n");
			res.end();
		}
	}
	else if (path == '/movie.html' || path == '/mystyle.css'){
// 		fs.readFile(__dirname + path, function(err, data){
		fs.readFile(program.web + path, function(err, data){
                if (err){ 
                    return send404(res);
                }
                res.writeHead(200, {'Content-Type': path == '/mystyle.css' ? 'text/css' : 'text/html'});
//                 res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data, 'utf8');
                res.end();
            });
	}
	else {
		// force users to /api or /movie.html
		http_debug("Wrong path " + path)
		res.writeHead(404, "Not Found", {'Content-Type': 'text/html'});
		res.write("Wrong path: use http://localhost:"+program.port+"/api or http:localhost:"+program.port+"/movie.html\n");
		res.end(); 
	}
});

server.listen(program.port);
