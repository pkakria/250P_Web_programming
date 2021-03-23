var fs = require("fs");
const url = require("url");

require("http").createServer((inRequest, inResponse)=> {
	var path = url.parse(inRequest.url).pathname;
	console.log(path);
	switch(path){
		case '/':
		console.log("inside /");
			fs.readFile(__dirname+ '/static/mainpage.html', function (error, data){
				inResponse.writeHead(200, {'Content-Type':'text/html'});
				inResponse.write(data);
				inResponse.end();
			});
			break;
		case '/introduction.html':
			inResponse.writeHead(200, {'Content-type': 'text/html'});
			const readStream = fs.createReadStream(__dirname+'/static/introduction.html');
			readStream.pipe(inResponse);
			//inResponse.end();
			break;
		case '/images/allu-parantha_290_220.jpg':
			console.log('fetch allu parantha');
			fs.readFile(__dirname+ '/static/images/allu-parantha_290_220.jpg', function(error, data){
				if (error){
					inResponse.writeHead(404);
					inResponse.write(error);
					inResponse.end();
				}else{
					inResponse.writeHead(200, {'Content-Type':'image/jpeg'});
					inResponse.write(data);
					inResponse.end();
				}
			});
			break;
		case '/images/bhelpuri_290_220.jpg':
			console.log('inside bhelpuri');
			fs.readFile(__dirname+ '/static/images/bhelpuri_290_220.jpg', function(error, data){
				if (error){
					inResponse.writeHead(404);
					inResponse.write(error);
					inResponse.end();
				}else{
					inResponse.writeHead(200, {'Content-Type':'image/jpeg'});
					inResponse.write(data);
					inResponse.end();
				}
			});
			break;
			case '/images/logo_small.jpg':
				console.log('logo')
			fs.readFile(__dirname+ '/static/images/logo_small.jpg', function(error, data){
				if (error){
					inResponse.writeHead(404);
					inResponse.write(error);
					inResponse.end();
				}else{
					inResponse.writeHead(200, {'Content-Type':'image/jpeg'});
					inResponse.write(data);
					inResponse.end();
				}
			});
			break;
			default:
				inResponse.writeHead(404);
				inResponse.write("this doesen't exist");
				inResponse.end();
				break;
	}
	//const readStream = fs.createReadStream('./static/mainpage.html');
	//readStream.pipe(inResponse);
	//inResponse.writeHead(200, {'Content-Type': 'text/html'});
	//readStream.pipe(inResponse);
	//inResponse.writeHead(200, {'Content-Type': 'image/jpeg'})
	//fs.createReadStream('./static/images/allu-parantha_290_220.jpg').pipe(inResponse);
	//fs.createReadStream('./static/images/bhelpuri_290_220.jpg').pipe(inResponse);
	//fs.createReadStream('./static/images/logo_small.jpg').pipe(inResponse);

	//require("fs").readFile(__dirname + '/static/mainpage.html', function(err, data){
		//inResponse.write(data);
	//inResponse.end();
	}).listen(80);