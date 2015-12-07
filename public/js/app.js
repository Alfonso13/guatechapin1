function init() {

	if(localStorage["cart"]) {
		var storage = JSON.parse(localStorage["cart"]);
		$("#contador-compras").text(storage.length);
	}


	if($.cookie("persona") && $.cookie("user")) { //existe una sesión
		var storage = JSON.parse(localStorage["person"]);
		$("#btn-login").addClass('hidden');
		/*$("#btn-register").addClass('hidden');*/
		$(".session").removeClass('hidden');
		$(".session #username").text(storage.username);
		$("#container-mis-compras").removeClass('hidden');

		var page = $(".nav").children().children().children().filter(".item-menu-selected").text();

		if(page.toLowerCase() == "productos") {
			$("#btn-carrito").attr('href', 'carrito.html');
		}
		else {
			$("#btn-carrito").attr('href', 'views/carrito.html');
		}

	}
	else {
		$("#container-mis-compras").addClass('hidden');
	}
	var categories = {
		0: "tejidos",
		1: "cueros",
		2: "mostacilla",
		3: "bolsos", 
		4: "carteras",
		5: "ropas" 
	};

	var xhr = $.get("/api/clothes");
	xhr.done(function done(response, message_http, http) {
		if(http.status == 200) {

			var clothes = response.clothes;

			var html_tejidos = [];
			var html_cueros = [];
			var html_mostacilla = [];
			var html_bolsos = [];
			var html_carteras = [];
			var html_ropas = [];
			if($.cookie("persona") && $.cookie("user")) {

				clothes.tejidos.every(function each(cloth, index) {
					if(html_tejidos.length != 3) {
						html_tejidos.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/tejidos/"+ cloth.nombre +".jpg'><figcaption><div><span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div></div></figcaption></figure> </article>");				
						return true;
					}
					else {
						return false;
					}
				});
				clothes.cueros.every(function each(cloth, index) {
					if(html_cueros.length != 3) {
						html_cueros.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/cueros/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure> </article>");					
						return true;
					} 
					else {
						return false;
					}
				});

				clothes.mostacilla.every(function each(cloth, index) {
					if(html_mostacilla.length != 3) {
						html_mostacilla.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/mostacilla/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure> </article>");
						return true;
					}
					else {
						return true;
					}
				});

				clothes.bolsos.every(function each(cloth, index) {
					if(html_bolsos.length != 3) {
						html_bolsos.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/bolsos/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure> </article>");				
						return true;
					}
					else {
						return false;
					}
				});

				clothes.carteras.every(function each(cloth, index) {
					if(html_carteras.length != 3) {
						html_carteras.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/carteras/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure> </article>");
						return true;
					}
					else {
						return false;
					}
				});

				clothes.ropas.every(function each(cloth, index) {
					if(html_ropas.length != 3) {
						html_ropas.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/ropas/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure></article>");				
						return true;
					}
					else {
						return false;
					}
				});

			}
			else {
				clothes.tejidos.every(function each(cloth, index) {
					if(html_tejidos.length != 3) {
						html_tejidos.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/tejidos/"+ cloth.nombre +".jpg'><figcaption><div><span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div></div></figcaption></figure> </article>");				
						return true;
					}
					else {
						return false;
					}
				});
				clothes.cueros.every(function each(cloth, index) {
					if(html_cueros.length != 3) {
						html_cueros.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/cueros/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure> </article>");					
						return true;
					}
					else {
						return false;
					}
				});

				clothes.mostacilla.every(function each(cloth, index) {
					if(html_mostacilla.length != 3) {
						html_mostacilla.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/mostacilla/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure> </article>");
						return true;
					}
					else {
						return false;
					}
				});

				clothes.bolsos.every(function each(cloth, index) {
					if(html_bolsos.length != 3) {
						html_bolsos.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/bolsos/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure> </article>");				
						return true;
					}
					else {
						return false;
					}
				});

				clothes.carteras.every(function each(cloth, index) {
					if(html_carteras.length != 3) {
						html_carteras.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/carteras/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure> </article>");				
						return true;
					}
					else {
						return false;
					}
				});

				clothes.ropas.every(function each(cloth, index) {
					if(html_ropas.length != 3) {
						html_ropas.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/ropas/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure></article>");				
						return true;
					}
					else {
						return false;
					}
				});
			}
			$("#tejidos .articles").html(html_tejidos.join(""));
			$("#cueros .articles").html(html_cueros.join(""));
			$("#mostacilla .articles").html(html_mostacilla.join(""));
			$("#bolsos .articles").html(html_bolsos.join(""));
			$("#carteras .articles").html(html_carteras.join(""));
			$("#ropas .articles").html(html_ropas.join(""));
		}
		else {

		}
	});

	$("#btn-login").on('click', function login() {
		$("#ModalLogin").removeClass('no-visibility').addClass('visibility');
	});


	$('#btn-auth').on('click', function auth(e) {
		e.preventDefault();
		var serialize = $("#form-auth").serializeObject();
		var xhr = $.get('/api/auth/'+JSON.stringify(serialize));

		xhr
		.done(function (response, message_http, http) {
			if(http.status == 200) {
				var person = response.person;
				person.username = serialize.nombre;
				$.cookie("persona", person._id);
				$.cookie("user", person.usuario);
				localStorage["person"] = JSON.stringify(person);
				window.location.reload();
			}
			else {
				alert("No existe el usuario");
			}
		})
		.error(function (e) {
			alert("No se encontró el usuario");
		});

	});



	$("section.modal .close").on({
		click: function click() {
			$(this).parent().parent().removeClass('visibility').addClass('no-visibility');
			$('body').css({overflow: 'auto'});
			$("section.modal #container-form-service span").removeClass('field-error');
		}
	});

	$(document).on('click', '.btn-add', function click(e) {
		e.preventDefault();
		if($.cookie("persona") && $.cookie("user")) {
			var product = JSON.parse($(this).parents("article").attr('data-info'));

			if(localStorage["cart"]) {
				var storage = JSON.parse(localStorage["cart"]);
				var exists = false;


				for(var i = 0 ; i < storage.length ; i++) {
					if(storage[i].product._id == product._id) {
						exists = true;
						break;
					}
				}

				if(exists) {
					alert("Este producto ya está agregado a la cesta");
				}
				else {
					product.cantidad = 1;
					storage.push({
						product: product
					});
					localStorage["cart"] = JSON.stringify(storage);
					$("#contador-compras").text(storage.length);
				}
			}
			else {
				var shop = [];
				product.cantidad = 1;
				shop.push({
					product: product
				});
				$("#contador-compras").text("1");
				localStorage["cart"] = JSON.stringify(shop);
			}
		}
		else {
			alert("No puedes agregar un producto si no te has autenticado");
		}
	});

	$(document).on('click', '.btn-information', function click(e) {
		e.preventDefault();
		var parent = JSON.parse($(this).parents("article").attr('data-info'));
		var categoria = categories[parent.categoria];

		var page = $(".nav").children().children().children().filter(".item-menu-selected").text();
		if(page.toLowerCase() == "productos") {
			var html = "<div><div class='left'> <div id='price' class='align-left'> <span>Precio</span> <h2 class='no-margin'>Q."+ parent.precio +"</h2> </div> <div id='name-product' class='align-left'> <span>Nombre</span> <h3 class='no-margin'>"+ parent.nombre +"</h3> </div> <div id='description-product' class='align-left'> <span>Descripción</span> <h4 class='no-margin'>"+ parent.descripcion +"</h4> </div> <div> <button data-idproducto='"+ parent._id +"' class='btn-add'>AGREGAR</button> </div> </div> <div class='right'> <figure class='no-margin'> <img src='../img/productos/"+ categoria +"/"+ parent.nombre +".jpg' class='image-responsive' alt='' /></figure></div></div>";
		}
		else {
			var html = "<div><div class='left'> <div id='price' class='align-left'> <span>Precio</span> <h2 class='no-margin'>Q."+ parent.precio +"</h2> </div> <div id='name-product' class='align-left'> <span>Nombre</span> <h3 class='no-margin'>"+ parent.nombre +"</h3> </div> <div id='description-product' class='align-left'> <span>Descripción</span> <h4 class='no-margin'>"+ parent.descripcion +"</h4> </div> <div> <button data-idproducto='"+ parent._id +"' class='btn-add'>AGREGAR</button> </div> </div> <div class='right'> <figure class='no-margin'> <img src='img/productos/"+ categoria +"/"+ parent.nombre +".jpg' class='image-responsive' alt='' /></figure></div></div>";
		}

		$("#ModalInformacion #informacion").html(html);
		$("#ModalInformacion").removeClass('no-visibility').addClass('visibility');
	});

	$("#btn-logout").on('click', function click(e) {
		e.preventDefault();
		$.removeCookie("persona");
		$.removeCookie("user");
		localStorage.clear();
		setTimeout(function () {
			window.location.reload();
		}, 1000);
	});

};

$(document).on('ready', init);