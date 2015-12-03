var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var router = express.Router();
var cookieParser = require('cookie-parser');
var connection = mongoose.createConnection("mongodb://chapin:chapin2015@ds061954.mongolab.com:61954/guatechapin");

autoIncrement.initialize(connection);

var userSchema = new Schema({
	nombre: String,
	password: String
});

userSchema.plugin(autoIncrement.plugin, 'User');
var User = connection.model('User', userSchema);

function createUser(user){
	var newUser = new User(user);
	return newUser;
};

function updateUserById(id, user) {
	User.findOneAndUpdate({_id: id}, user, {}, function a() {});
};


app.use(cookieParser());
app.use('/api', router);
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(bodyParser.json({}));

app.get('/', function init(req, res) {
	
});


//API REST
router.get('/auth/:user', function auth(req, res) {
	var user = JSON.parse(req.params.user);
	
	User.findOne(user, function (error, response) {
		
		if(error) {
			res.status(500).json({
				message: "No se encontró el usuario"
			});
		}
		else {
			if(!response) {
				res.status(500).json({
					message: "No se encontró el usuario"
				});
			}
			else {
				res.status(200).json({});
			}
			
		}
	});
});


app.listen(process.env.PORT || 5000);