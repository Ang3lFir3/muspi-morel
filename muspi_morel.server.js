var http = require('http');
var url = require('url');

var core_text = "Lorem ipsum dolar".split(' ');

http.createServer(function (req, res) {
	var question = url.parse(req.url, true);

	res.writeHead(200, {'Content-Type': 'text/plain'});
	if(question.query.size > 0 )
	{
		var text = core_text.slice(0, question.query.size);
		res.end(text.join(' ') + "\n");
	}
	else
	{
		 res.end("why you gotta break stuff?\n");
	}

}).listen(1337, "127.0.0.1");



console.log("OKay I hooked you up with a server.... don't break anything");
