const express = require('express')
var bodyParser   =  require("body-parser");
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  

app.get("/api/exercise",function(request, response){
    var params = request.query
	
	response.writeHead(200, {"Content-Type": "application/json"});
	
	console.log("GET " + request.path);
    
	response.write(JSON.stringify(params));
	
	Object.keys(params).forEach(function(key) {
		console.table(key + ": " + params[key])
	})
	
});

 
app.post('/api/exercise',function(request,response){
	//response.set('Content-Type', 'text/html');
	var htmlString = "<h1>Hello from Express!</h1>";
	htmlString += "<h2>POST parameters</h2>"
	htmlString += "<p>I received these parameters: </p>"
	htmlString += "<ul>"
	var params = request.body
	Object.keys(params).forEach(function(key) {
		htmlString += "<li>"
		htmlString += (key + ": " + params[key])
		htmlString += "</li>"
	})
	htmlString += "</ul>"
	if(request.body.firstname ==""|| request.body.lastname ==""){
		response.status(400).send("Oh uh, something went wrong");
		return;
	}
	console.log(request.body)
	
	response.send(Buffer.from(htmlString));
	
	
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))