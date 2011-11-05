var express = require('express');

var core_text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');


var port = process.env.PORT || 1337;
console.log("ur port is " + port);

var shuffle = function(words){
	var length = words.length;
	while(length > 1){
		length = length -1;
		var randLoc = parseInt(Math.random() *length);
		var lefthand = words[length];
		var righthand = words[randLoc];

		words[randLoc] = lefthand;
		words[length] = righthand; 
	}
}

var app = express.createServer(express.logger());

app.get('/', function(req, res){
	res.send("Usage ie: /size/13 \n", { 'Content-Type': 'text/plain' }, 200)
});

app.get('/size/:size', function(req, res){
	var query_size = parseInt(req.params.size);
	console.log("I found a query for size : " + query_size + " of type" + typeof(query_size));
	
	shuffle(core_text);

	if(isNaN(query_size)){
		res.send("huh? why you gotta break stuff?\n make sure you are using a number, Jeff\n", 400);
	}

	if(query_size > 0 && query_size <= core_text.length ){
		var text = core_text.slice(0, query_size);
		res.send(text.join(' ') + "\n", 200);
	}
	if(query_size > core_text.length ){
		while(core_text.length < query_size){
			core_text = core_text.concat(core_text);
			console.log("new length = " + core_text.length);
		}
		
		var text = core_text.slice(0, query_size)
		res.send(text.join(' ') + "\n", 200);
	}	
});


app.listen(port, function(){
	console.log("OKay I hooked you up with a server.... don't break anything");
});
