var http = require('http');
var url = require('url');

var core_text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');


var port = process.env.PORT || 1337;
console.log("ur port is " + port);

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});

	var question = url.parse(req.url, true);
	if(question.pathname == "/" && question.query.size == undefined){
		res.end(" use a query string with the size value set to some number. ie: /?size=13 \n");
	}

	var query_size = question.query.size;

	if(query_size > 0 && query_size <= core_text.length ){
		var text = core_text.slice(0, query_size);
		res.end(text.join(' ') + "\n");
	}
	if(query_size > core_text.length ){
		while(core_text.length < query_size){
			core_text = core_text.concat(core_text);
			console.log("new length = " + core_text.length);
		}
		
		var text = core_text.slice(0, query_size)
		res.end(text.join(' ') + "\n");
	}
	
	res.end("why you gotta break stuff?\n");
	
}).listen(port);

console.log("OKay I hooked you up with a server.... don't break anything");
