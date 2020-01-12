$(document).ready(function() {
	$('#studentLoginSubmit').on('click', function(e) {
        e.preventDefault();
		console.log("clicked");
		console.log($("input#studentUsername.form-control").val());
		console.log($("input#studentPassword.form-control").val());
		$.ajax({
			url: '/auth/login',
            type: 'POST',
			data: {
				username: $("input#studentUsername.form-control").val(),
				password: $("input#studentPassword.form-control").val(),
				domain: "student",
			},
			success: function (data) {
				console.log(data);
				if (data["message"] === "loginSuccess") {
					console.log(data);
					window.location.href = "/home"
				}
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Exception:'+ errorThrown);
            }
		});
	});
});
