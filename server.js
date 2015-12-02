var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
	extended:true,
	limit:'30mb'
}));

app.use(bodyParser.json({
	limit:'30mb'
}));

app.get('/', function init(req, res) {
	
});

app.listen(3000);