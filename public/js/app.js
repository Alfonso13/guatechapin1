function init() {
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
};

$(document).on('ready', init);
