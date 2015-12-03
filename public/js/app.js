function init() {

	if($.cookie("persona") && $.cookie("user")) { //existe una sesión
		var storage = JSON.parse(localStorage["person"]);
		$("#btn-login").addClass('hidden');
		$(".session").removeClass('hidden');
		$(".session #username").text(storage.username);
	}

	var xhr = $.get("/api/clothes");
	xhr.done(function done(response, message_http, http) {
		if(http.status == 200) {
			
			var categories = {
				0: "tejidos",
				1: "cueros",
				2: "mostacilla",
				3: "bolsos", 
				4: "carteras",
				5: "ropas" 
			};



			var clothes = response.clothes;
			var offers = response.offers;

			var html_offer = "<figure><img src='img/productos/"+ categories[offers[0].article.categoria] +"/"+offers[0].article.nombre+".jpg' class='image-responsive'> </figure><div id='description-gallery'> <h2 class='no-margin'>"+ offers[0].offer.porc_descuento +"%</h2> <h3 class='no-margin'>DESCUENTO <br /> NAVIDEÑO</h3> <div> <button>AGREGAR</button> </div> </div>";
			$("#offer").html(html_offer);

			var html_tejidos = [];
			var html_cueros = [];
			var html_mostacilla = [];
			var html_bolsos = [];
			var html_carteras = [];
			var html_ropas = [];


			clothes.tejidos.forEach(function each(cloth, index) {
				html_tejidos.push("<article data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/tejidos/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button></div></figcaption></figure> </article>");				
			});
			clothes.cueros.forEach(function each(cloth, index) {
				html_cueros.push("<article data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/cueros/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button></div></figcaption></figure> </article>");					
			});

			clothes.mostacilla.forEach(function each(cloth, index) {
				html_mostacilla.push("<article data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/mostacilla/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button></div></figcaption></figure> </article>");					
			});

			clothes.bolsos.forEach(function each(cloth, index) {
				html_bolsos.push("<article data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/bolsos/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button></div></figcaption></figure> </article>");				
			});

			clothes.carteras.forEach(function each(cloth, index) {
				html_carteras.push("<article data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/carteras/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button></div></figcaption></figure> </article>");				
			});

			clothes.ropas.forEach(function each(cloth, index) {
				html_ropas.push("<article data-idproducto='"+ cloth._id +"'><figure><img src='img/productos/ropas/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button></div></figcaption></figure> </article>");				
			});


			$("#tejidos .articles").html(html_tejidos.join(""));
			$("#cueros .articles").html(html_cueros.join(""));
			$("#mostacilla .articles").html(html_mostacilla.join(""));
			$("#bolsos .articles").html(html_mostacilla.join(""));
			$("#carteras .articles").html(html_mostacilla.join(""));
			$("#ropas .articles").html(html_mostacilla.join(""));
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
		var idproducto = $(this).attr('data-idproducto');
		if(localStorage["cart"]) {
			var storage = JSON.parse(localStorage["cart"]);
			storage.push({
				codigo: idproducto
			});
			localStorage["cart"] = JSON.stringify(storage);
		}
		else {
			var shop = [];
			shop.push({
				codigo: idproducto
			});
			localStorage["cart"] = JSON.stringify(shop);	
		}

	});

	$("#btn-logout").on('click', function click(e) {
		e.preventDefault();
		$.removeCookie("persona");
		$.removeCookie("user");
		localStorage.clear();
		window.location.reload();
	});

};

$(document).on('ready', init);