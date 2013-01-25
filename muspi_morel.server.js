var express = require('express');
try{
  var moment = require('moment');
}
catch(e){
}

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

var app = express(express.logger());

app.get('/', function(req, res){
	res.send("Usage ie: /size/13 \n /paragraph/2 \n /date/yyyy-mm-dd", { 'Content-Type': 'text/plain' }, 200)
});

app.get('/size/:size', function(req, res){
	var query_size = parseInt(req.params.size);

	if(isNaN(query_size)){
		res.send("huh? why you gotta break stuff?\n make sure you are using a number.\n", 400);
	}

  if(query_size > 9999){
    res.send("huh? are you insane...\n look you do not really want that many words I promise.\n", 400)
  }

 	shuffle(core_text);

	if(query_size > 0 && query_size <= core_text.length ){
		var text = core_text.slice(0, query_size);
		res.send(text.join(' ') , 200);
    text = null;
	}
	
  if(query_size > core_text.length ){
		var originalSize = core_text.length;
    while(core_text.length < query_size){
			core_text = core_text.concat(core_text);
			console.log("new length = " + core_text.length);
		}
	
		var text = core_text.slice(0, query_size)
		res.send(text.join(' ') , 200);
    
    core_text = core_text.slice(0, originalSize);
    text = null;
	}	
});

app.get('/paragraph/:count', function (request, response){
	paragraph_count = request.params.count;

	if(isNaN(paragraph_count)){
		response.send("huh? why you gotta break stuff?\n make sure you are using a number, Jeff\n", 400);
	}
 
  if(paragraph_count > 30){
    response.send("huh? are you insane...\n look you do not really want that many paragraphs I promise.\n", 400)
  }

	var result = '';
	for(var i = 0; i < paragraph_count; i++){
		shuffle(core_text);
		result += core_text.join(' ') + '\r\n\r\n';
	}

	response.send(result, 200);
});

app.get('/date/:format', function (request, response){
	var month = Math.random() *11; //months are zero based.... yeah i know i cryed too 
	var day = Math.random() *31;
	var year = Math.random() *50
       	
	if(month == 1 && day > 28){
		day = 28;
	}

	if(parseInt(Math.random()*10%2) == 0 ){
 		year += 2000;	
	}
	else{
		year = 2000 - year;
	}


	console.log(moment);
  if(moment){
	  var the_date = moment(new Date(year,month,day));
    response.send(moment(the_date).format(request.params.format.toUpperCase()),	200);
  }
  else{
    response.send("01/01/0001", 200);
  }
});


app.listen(port, function(){
	console.log("OKay I hooked you up with a server.... don't break anything");
});
