$(document).ready(function() {
	$("#studentLoginSubmit").click(function() {
        console.log("clicked");
		$.ajax({
			url: "/auth/login",
			type: "POST",
			dataType: "json",
			data: {
				username: $("#studentUsername").val(),
				password: $("#studentPassword").val(),
				domain: "student",
			},
			success: (data) => {
                if(data.success == "true") {
                    console.log(data);
                    window.location.replace("/");
                }
            },
		});
	});
});
