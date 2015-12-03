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

var categorySchema = new Schema({
	categoria: String
});

var personSchema = new Schema({
	nombre: String,
	apellido: String,
	sexo: String,
	fechanacimiento: Date,
	email: String,
	usuario: Number
});

/*

*/

var billSchema = new Schema({
	total: Number,
	fecha: Date,
	cliente: Number,
	tarjeta: Number
});

var detailBillSchema = new Schema({
	factura: Number,
	articulo: Number,
	cantidad: Number,
	precioVenta: Number
});

var articleSchema = new Schema({
	nombre: String,
	descripcion: String,
	precio: Number,
	existencia: Number,
	categoria: Number
});

var offerSchema = new Schema({
	articulo: Number,
	porc_descuento: Number,
	fecha_inicio: Date,
	fecha_vencimiento: Date,
	tipo: String
});

userSchema.plugin(autoIncrement.plugin, 'User');
categorySchema.plugin(autoIncrement.plugin, 'Category');
personSchema.plugin(autoIncrement.plugin, 'Person');
billSchema.plugin(autoIncrement.plugin, 'Bill');
detailBillSchema.plugin(autoIncrement.plugin, 'DetailBill');
articleSchema.plugin(autoIncrement.plugin, 'Article');
offerSchema.plugin(autoIncrement.plugin, 'Offer');


var User = connection.model('User', userSchema);
var Category = connection.model('Category', categorySchema);
var Person = connection.model('Person', personSchema);
var Bill = connection.model('Bill', billSchema);
var DetailBill = connection.model('DetailBill', detailBillSchema);
var Article = connection.model('Article', articleSchema);
var Offer = connection.model('Offer', offerSchema);

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
				Person.findOne({usuario: response.id}, function callback(error, person) {
					if(!error) {
						res.status(200).json({
							person: person
						});
					}
				});
			}
			
		}
	});
});

router.get('/clothes', function clothes(req, res) {
	Article.find({}, function callback(error, clothes) {
		if(error) {
			res.status(404).json({
				error: error
			});
		}
		else {
			Offer.find({}, function offer(error, offers) {
				if(!error) {
					
					var offers_articles = [];

					clothes.forEach(function each(cloth, index) {
						for(var i = 0 ; i < offers.length ; i++) {
							if(offers[i].articulo == cloth._id) {
								offers_articles.push({article: cloth, offer: offers[i]});
								clothes.splice(index, 1);
							}
						}
					});
					var articles = {
						tejidos: [],
						cueros: [],
						mostacilla: [],
						bolsos: [],
						carteras: [],
						ropas: []
					};
					clothes.forEach(function each(cloth, index) {
						if(cloth.categoria == 0) { //Si es un tejido
							if(articles.tejidos.length != 3) {
								articles.tejidos.push(cloth);
							}
						}
						else if(cloth.categoria == 1) { //Si es un cuero
							if(articles.cueros.length != 3) {
								articles.cueros.push(cloth);
							}
						}
						else if(cloth.categoria == 2) { //si es un mostacilla
							if(articles.mostacilla.length != 3) {
								articles.mostacilla.push(cloth);
							}
						}
						else if(cloth.categoria == 3) { //Si es un bolso
							if(articles.bolsos.length != 3) {
								articles.bolsos.push(cloth);
							}
						}
						else if(cloth.categoria == 4) { //Si es un cartera
							if(articles.carteras.length != 3) {
								articles.carteras.push(cloth);
							}
						}
						else if(cloth.categoria == 5) { //Si es una ropa
							if(articles.ropas.length != 3) {
								articles.ropas.push(cloth);
							}
						}
					});

					res.status(200).json({
						clothes: articles,
						offers: offers_articles
					});
				}
			});
		}
	});
});

app.listen(process.env.PORT || 5000);