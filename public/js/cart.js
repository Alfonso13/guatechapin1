
function init() {
	
	if(localStorage["cart"]) {
		var storage = JSON.parse(localStorage["cart"]);
		var html = [];
		var categories = {
			0: "tejidos",
			1: "cueros",
			2: "mostacilla",
			3: "bolsos", 
			4: "carteras",
			5: "ropas" 
		};
		var subtotal = 0;
		storage.forEach(function each(store) {
			subtotal += (store.product.precio * store.product.cantidad);
			html.push("<li class='relative' data-id='"+ store.product._id +"'><a href='#' class='btn-delete-item'>ELIMINAR</a><figure class='no-margin'> <img src='../img/productos/"+  categories[store.product.categoria] +"/"+ store.product.nombre +".jpg' class='image-responsive' style='height: 178px;'> </figure> <div> <h2 class='no-margin'>"+ store.product.nombre +"</h2> <h3>"+ store.product.descripcion +"</h3> <h3>Precio: Q<span> "+ store.product.precio +"</span></h3> <h3>Existencias: <span>"+ store.product.existencia +"</span></h3> <div> <p>Cantidad:</p > <input type='number' min='1' max='"+ store.product.existencia +"' class='input-cantidad' value='"+ store.product.cantidad +"' /> </div> </div> </li>");
		});
		$("#subtotal").text(subtotal);
		$("#list-cart").html(html.join(""));
	}
	document.form_card.addEventListener('invalid', function invalid(a) {
		var target = a.target;
		$(target).css({borderBottom: "2px solid red"});
	}, true);
	document.form_card.addEventListener('input', function input(a) {
		var target = a.target;
		$(target).css({borderBottom: "1px solid #CACACA"});
	}, false);
	$("#btn-pagar").on('click', function click(e) {
		e.preventDefault();
		var validity = document.form_card.checkValidity();
		
		if(validity) {
			if( localStorage.cart && JSON.parse(localStorage.cart).length != 0 ) {
				var serialize = $("#form-card").serializeObject();
				var storage = JSON.parse(localStorage.cart);
				var date = ((new Date()).toLocaleDateString()).split("/");
				var user = JSON.parse(localStorage.person).usuario;
				var email = JSON.parse(localStorage.person).email;
				var name = JSON.parse(localStorage.person).nombre + " " + JSON.parse(localStorage.person).apellido;
				var stringify = JSON.stringify({card: serialize, products: storage, date: date, user: user, email: email, name: name});

				$(this).addClass('hidden');
				$(".comprobation").css({opacity: 0}).removeClass('hidden').animate({opacity: 1}, "800", "linear", function () {
					$(".progress").animate({width: "100%"}, 5000, "linear", function () {
						var xhrbuy = $.get("/api/buy/"+stringify);
						xhrbuy.done(function done(response, message_http, http) {
							if(response.message && response.message ==  'success') {
								$("#ModalPago").removeClass('no-visibility').addClass('visibility');
								localStorage.removeItem("cart");
							}
						});
					});
				});
			}
			else {
				alert("No se han agregado productos a la cesta");
			}
			
		}
	});

	$(".input-cantidad").on('change', function change() {
		var storage = JSON.parse(localStorage.cart);
		var parent = $(this).parents("li").attr('data-id');
		var actual = this.value;
		var total = 0;
		for(var i = 0 ; i < storage.length ; i++) {
			if(storage[i].product._id == parent) {
				storage[i].product.cantidad = actual;
				localStorage["cart"] = JSON.stringify(storage);
			}
			total += (storage[i].product.precio * storage[i].product.cantidad);
		}
		$("#subtotal").text(total);
	});
	$("#btn-end-pay").on('click', function click(e) {
		e.preventDefault();
		window.location.href = "../index.html";
	});
	$(document).on('click', '.btn-delete-item', function a(e) {
		e.preventDefault();
		var item = $(this).parents("li").attr('data-id');
		var storage = JSON.parse(localStorage.cart);
		for(var i = 0 ; i < storage.length ; i++) {
			if(storage[i].product._id == item) {
				storage.splice(i, 1);
			}
		}
		localStorage["cart"] = JSON.stringify(storage);
		window.location.reload();
	});
};

$(document).on('ready', init);
