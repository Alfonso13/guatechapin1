var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var router = express.Router();
var cookieParser = require('cookie-parser');
var connection = mongoose.createConnection("mongodb://chapin:chapin2015@ds061954.mongolab.com:61954/guatechapin");


var apiKey = "key-965b394996e9633c0bacd9d5a9d6f47d";
var domain = "sandbox735f530aa31d40e9b346877f11a9b08c.mailgun.org";
var mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});

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
	cliente: Number
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
							articles.tejidos.push(cloth);
						}
						else if(cloth.categoria == 1) { //Si es un cuero
							articles.cueros.push(cloth);
						}
						else if(cloth.categoria == 2) { //si es un mostacilla
							articles.mostacilla.push(cloth);
						}
						else if(cloth.categoria == 3) { //Si es un bolso
							articles.bolsos.push(cloth);
						}
						else if(cloth.categoria == 4) { //Si es un cartera
							articles.carteras.push(cloth);
						}
						else if(cloth.categoria == 5) { //Si es una ropa
							articles.ropas.push(cloth);
						}
					});

					res.status(200).json({
						clothes: articles
					});
				}
			});
		}
	});
});

router.get('/buy/:information', function buy(req, res) {
	var params = JSON.parse(req.params.information);
	var card = params.card;
	var products = params.products;
	var date = params.date.join("/");
	var user = params.user;
	var email = params.email;
	var name = params.name;

	var total = 0;

	products.forEach(function each(product, index) {
		total += (Number(product.product.precio) * Number(product.product.cantidad));
	});



	var bill = {
		total: total,
		fecha: date,
		cliente: user
	};
	

	var newBill = new Bill(bill);

	var counter = 0;
	newBill.save(function e(error){
		if(!error) {
			Bill.find({}).sort({_id: 'desc'}).limit(1).exec(function a(error, docs){
				if(!error) {
					var detail_bill = [];
					var details = [];
					for(var i = 0 ; i < products.length ; i++) {
						detail_bill.push('<tr><td style="padding:10px 16px;">'+ products[i].product.nombre +'</td> <td style="padding:10px 16px;">'+ products[i].product.cantidad +'</td><td style="padding:10px 16px;">Q. ' + products[i].product.precio + '</td><td style="padding:10px 16px;">Q. '+ (Number(products[i].product.precio) * Number(products[i].product.cantidad)) +'</td></tr>');
						var newDetailBill = new DetailBill({
							factura: docs[0]._id ,
							articulo: products[i].product._id,
							cantidad: products[i].product.cantidad,
							precioVenta: products[i].product.precio
						});
						details.push(newDetailBill);
					}
					details.forEach(function each(detail, index) {
						detail.save(function save(error) {
							if(!error) {
								Article.findOne({_id: detail.articulo}, function find(error, single_product) {
									if(!error) {
										var actual_stock = single_product.existencia - detail.cantidad;
										Article.findOneAndUpdate({_id: detail.articulo}, {$set: {existencia: actual_stock}}, function c(error) {
											if(!error) {
												if((index+1)  == details.length) {
													var html_email = '<div style="background:#eee;padding:16px;text-align:left;font-family:;"><h1 style="color:#03A9F4;">GUATECHAPIN</h1> <h3 style="font-weight:300;">Guatechapin te felicita por haber confiado en nosotros al adquirir nuestros productos de alta calidad.  Desde ahora eres parte de la familia de Guatechapin.</h3> <hr> <div> <h3 style="font-size:18px;color:#333;">INFORMACIÓN DE FACTURACIÓN</h3> <div style="border-left:2px solid;padding-left:16px;"> <h2 style="font-size:16px;font-weight:300;">FACTURA No. <span>'+ docs[0]._id +'</span></h2><h2 style="font-size:16px;font-weight:300;">NOMBRE: <span>'+ name +'</span></h2><h2 style="font-size:16px;font-weight:300;">FECHA: <span>'+ date +'</span></h2> <h2 style="font-size:16px;font-weight:300;">TOTAL: <span>Q. 100</span></h2> </div> <h3 style="font-weight:700;color:#444;">DETALLE</h3> <table style="text-align:center;"> <thead> <tr> <th style="padding:10px 16px;">Producto</th> <th style="padding:10px 16px;">Cantidad</th> <th style="padding:10px 16px;">Precio</th> <th style="padding:10px 16px;">Subtotal</th> </tr> </thead> <tbody> ' + detail_bill.join("") + '</tbody> </table> </div> </div>';
													var data = {
														from: "Guatechapin <mailgun@sandbox735f530aa31d40e9b346877f11a9b08c.mailgun.org>",
														to: email, 
														subject: 'Información de Facturación',
														html: html_email
													};
													mailgun.messages().send(data, function l(error, body) {
														if(!error) {
															res.status(200).json({message: 'success'});
														}
														else {
															res.status(200).json({message: 'error'});
														}
													});
												}
											}
										});
									}
								});
							}
						});
					});
				}
			});
		}
	});


});

app.listen(process.env.PORT || 5000);