function initialize() {
	var xhr = $.get('/api/clothes');
	xhr.done(function done(response, http_message, http) {
		if(http.status == 200) {
			var clothes = response.clothes;

			var html_tejidos = [];
			var html_cueros = [];
			var html_mostacilla = [];
			var html_bolsos = [];
			var html_carteras = [];
			var html_ropas = [];

			if($.cookie("persona") && $.cookie("user")) {
				clothes.tejidos.forEach(function each(cloth, index) {
					html_tejidos.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/tejidos/"+ cloth.nombre +".jpg'><figcaption><div><span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div></div></figcaption></figure> </article>");				
				});
				clothes.cueros.forEach(function each(cloth, index) {
					html_cueros.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/cueros/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure> </article>");					
				});

				clothes.mostacilla.forEach(function each(cloth, index) {
					html_mostacilla.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/mostacilla/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure> </article>");
				});

				clothes.bolsos.forEach(function each(cloth, index) {
					html_bolsos.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/bolsos/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure> </article>");				
				});

				clothes.carteras.forEach(function each(cloth, index) {
					html_carteras.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/carteras/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure> </article>");				
				});

				clothes.ropas.forEach(function each(cloth, index) {
					html_ropas.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/ropas/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> <button class='btn-information' data-idproducto='"+ cloth._id +"'>DETALLE</button></div> </div></figcaption></figure></article>");				
				});

			}
			else {
				clothes.tejidos.forEach(function each(cloth, index) {
					html_tejidos.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/tejidos/"+ cloth.nombre +".jpg'><figcaption><div><span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div></div></figcaption></figure> </article>");				
				});
				clothes.cueros.forEach(function each(cloth, index) {
					html_cueros.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/cueros/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure> </article>");					
				});

				clothes.mostacilla.forEach(function each(cloth, index) {
					html_mostacilla.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/mostacilla/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure> </article>");
				});

				clothes.bolsos.forEach(function each(cloth, index) {
					html_bolsos.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/bolsos/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure> </article>");				
				});

				clothes.carteras.forEach(function each(cloth, index) {
					html_carteras.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/carteras/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure> </article>");				
				});

				clothes.ropas.forEach(function each(cloth, index) {
					html_ropas.push("<article data-info='"+ JSON.stringify(cloth) +"' data-idproducto='"+ cloth._id +"'><figure><img src='../img/productos/ropas/"+ cloth.nombre +".jpg' > <figcaption> <div> <span>"+ cloth.descripcion +"</span> <div><button class='btn-add' data-idproducto='"+ cloth._id +"'>AGREGAR</button> </div> </div></figcaption></figure></article>");				
				});
			}
			$("#tejidos_productos .articles").html(html_tejidos.join(""));
			$("#cueros_products .articles").html(html_cueros.join(""));
			$("#mostacilla_products .articles").html(html_mostacilla.join(""));
			$("#bolsos_products .articles").html(html_bolsos.join(""));
			$("#cartas_products .articles").html(html_carteras.join(""));
			$("#ropas_products .articles").html(html_ropas.join(""));
		}
		else {

		}
	});
};

$(document).on('ready', initialize);
