var fs = require('fs');

/**
* Save file
*/
function saveFile(file,data){
	fs.writeFile(file, data, function(err){
		if(err){
			console.log( err );
			throw err;
		}
	});
};

/*
* Writes out a CSS file
*/
exports.write_css = function(filename){
	var content = ['div.img {',
				'    margin: 1px;',
				'    padding: 0px;',
				'    float: left;',
				'    text-align: center;',
				'}',	
				'div.img img {',
				'    display: inline;',
				'    margin: 0px;',
				'    border: 0px solid #ffffff;',
				'}',
				'h3 {',
				'	text-align: center;',
				'}',
				'i {', 
				'    font-style: normal;',
				'}',
				'.mpaa_rating {',
				'	font-family: serif;',
				'	border-style: solid;',
				'	border-width: 2px;',
				'	border-radius: 5px;',
				'	background-color: white;',
				'	padding: 0px 3px 0px 3px;',
				'	font-size: 20px;',
				'}',
				'.rt_rating {',
				'	position: relative;',
				'}',
				'.rating {',
				'	font-family: serif;',
				'	position: absolute;',
				'	top: 70%;',
				'	left: 25%;',
				'	color: white;',
				'	background-color: gray;',
				'	border-style: solid;',
				'	border-width: 0px;',
				'	border-radius: 25px;',
				'	padding: 0px 2px 0px 2px;',
				'}',
				'.tagline{',
				'	width:100%;',
				'    text-align:center;',
				'    margin: 5px;',
				'}',
				'.container{',
				'	width:100%;',
				'    text-align:center;',
				'}',
				'.left {',
				'	float: left;',
				'}',
				'.right {',
				'	float: right;',
				'}',
				'.center {',
				'	margin:0 auto;',
				'	width:100px;',
				'}'].join('\n');
	
		
	saveFile(filename,content);
};

exports.writeHTML = function(filename,html_body){
	var html_start = ['<!DOCTYPE html>',
					'<html>',
					'	<head>',
					'		<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">',
					'		<link rel="stylesheet" type="text/css" href="mystyle.css">',
					'		<meta charset="utf-8">',
					'		<!-- jQuery (necessary for Bootstraps JavaScript plugins) -->',
					'		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>',
					'		<!-- Latest compiled and minified CSS -->',
					'		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">',
					'		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">',
					'		<!-- Latest compiled and minified JavaScript -->',
					'		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>',
					'	</head>',
					'	<body>'].join('\n');
		
	var html_end = '</body></html>';
		
	var page = [];
	page.push(html_start);
	page.push(html_body);
	page.push(html_end);
	saveFile(filename,page.join('\n'));
};