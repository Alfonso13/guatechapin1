var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(bodyParser.json({}));

app.get('/', function init(req, res) {
	
});

app.listen(3000);