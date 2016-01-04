// Simple GET PUT
// ----------------
// curl -i -X GET http://tardis.local:8001/api 
// curl -i -X PUT http://localhost:8001/api --data '{"name":"tom", "age":45.77}' -H "Content-Type: application/json"
// curl -i -X GET http://tardis.local:8001/test.html

var http_debug = require('debug')('kevin:http') // debug
var http = require('http');                     // http-server
var program = require('commander');             // command line args
var fs = require('fs');                         // read files
var server;                                     // actual server

var pck = require('package.json');

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
