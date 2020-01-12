$(document).ready(function() {
	$("#registerSubmit").on("click", function(e) {
		e.preventDefault();

		$.ajax({
			url: "/home/editAttendance",
			type: "GET",
			credentials: "include",
			data: {
				username: $("input#studentUsername.form-control").val(),
                course: $("input#studentPassword.form-control").val(),
                date: $("input#studentPassword.form-control").val()
			},
			success: function(response) {
				if (response["success"] === "true") {
					fillStudentData(response[data]);
				} else {
					alert("Error: " + data["message"]);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Exception:" + errorThrown);
			},
		});
	});
});

function fillStudentData(response) {
	$(function() {
		$.each(response, function(i, item) {
			var $tr = $("<tr>").append(
				$("<td>").text(item.username),
				$("<td>").text(item.name),
				$("<td>").text(item.email),
			);
			console.log($tr.wrap("<p>").html());
		});
	});
}
