$(document).ready(function() {
	$('#studentLoginSubmit').on('click', function(e) {
        e.preventDefault();
		console.log("clicked");
		console.log($("input#studentUsername.form-control").val());
		console.log($("input#studentPassword.form-control").val());
		$.ajax({
			url: '/auth/login',
			type: 'POST',
			credentials: 'include',
			data: {
				username: $("input#studentUsername.form-control").val(),
				password: $("input#studentPassword.form-control").val(),
				domain: "student",
			},
			success: function (response) {
				if (response["message"] === "loginSuccess") {
					window.location.href = response.redirect;
				}
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Exception:'+ errorThrown);
            }
		});
	});
});
