$(document).ready(function() {
	$("#studentLoginSubmit").on("click", function(e) {
		e.preventDefault();
		console.log("clicked");
		console.log($("input#studentUsername.form-control").val());
		console.log($("input#studentPassword.form-control").val());
		$.ajax({
			url: "/auth/login",
			type: "POST",
			credentials: "include",
			data: {
				username: $("input#studentUsername.form-control").val(),
				password: $("input#studentPassword.form-control").val(),
				domain: "student",
			},
			success: function(response) {
				if (response["message"] === "loginSuccess") {
					window.location.href = response.redirect;
				} else {
                    alert("Error: " + response["message"]);
                }
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Exception:" + errorThrown);
			},
		});
    });
    
    $("#teacherLoginSubmit").on("click", function(e) {
		e.preventDefault();
		console.log("clicked");
		console.log($("input#teacherUsername.form-control").val());
		console.log($("input#teacherPassword.form-control").val());
		$.ajax({
			url: "/auth/login",
			type: "POST",
			credentials: "include",
			data: {
				username: $("input#teacherUsername.form-control").val(),
				password: $("input#teacherPassword.form-control").val(),
				domain: "teacher",
			},
			success: function(response) {
				if (response["message"] === "loginSuccess") {
					window.location.href = response.redirect;
				} else {
                    alert("Error: " + response["message"]);
                }
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Exception:" + errorThrown);
			},
		});
    });
    
    $("#register-redirect").on("click", function(e) {
        e.preventDefault();
        window.location.href = "/auth/register";
    });
});
