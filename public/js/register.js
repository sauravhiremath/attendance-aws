$(document).ready(function() {
	$('#registerSubmit').on('click', function(e) {
        e.preventDefault();

		$.ajax({
			url: '/auth/register',
			type: 'POST',
			credentials: 'include',
			data: {
				username: $("input#studentUsername.form-control").val(),
                password: $("input#studentPassword.form-control").val(),
                email: $("input#studentEmail.form-control").val(),
				domain: $(".domain:checked").val(),
			},
			success: function (data) {
				if (data["message"] === "registrationSuccess") {
					window.location.href = "/auth/login"
				} else {
                    alert("Error: " + data["message"]);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Exception:'+ errorThrown);
            }
		});
	});

	$( ".btn-danger" ).click(function() {
		// $(this).removeClass('btn-danger');
		$(this).toggleClass('btn-danger');
		$(this).toggleClass('btn-success');
	  });
});
