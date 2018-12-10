//Get the Information
$(document).ready(function() {
	setTimeout(function() {
		showInfo();
 	}, 5);
});

function goBack() {
	localStorage.removeItem('puid');
	localStorage.removeItem('ppid');
	window.history.back();
}

function showInfo() {
	var uid = localStorage.getItem('puid');
	var pid = localStorage.getItem('ppid');
	var urlUser="http://localhost:8888/Valacro/readUser.php";
	var urlCon="http://localhost:8888/Valacro/readConnexion.php";

	$.getJSON(urlCon,function(result) {
		$.each(result, function(i, field) {
			if (field.user_id == uid && field.profil_id == pid) {
				var email = field.login;
				if (email == null) {
					email = "None";
				}
				$("#myEmail").append(email);
			}
	 	});
 	});


 	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
			if (field.user_id == uid && field.profil_id == pid) {
				var nom = field.nom;
				var prenom = field.prenom;
				var bday = field.birthday;

				//Contact
				var contact = field.phone_number;
				if (contact == null) {
					contact = "None";
				}
				
				//Status
				var is_coach = field.is_coach;
				var is_parent = field.profil_parent;
				var is_adherent = field.profil_adherent;
				var is_comite = field.in_comite;
				var is_admin = field.is_admin;
				var status = "";
				if (is_parent == 0 && is_adherent == 1) {
					status = "Child";
				}
				if (is_admin == 1) {
					status += "Admin ";
				}
				if (is_comite == 1) {
					status += "Comite ";
				}
				if (is_coach == 1) {
					status += "Coach ";
				}
				if (is_parent == 1) {
					status += "Parent ";
				}				
				if (is_adherent == 1 && status != "Child") {
					status += "Adherent ";
				}

				$("#myName").append(prenom + " " + nom);
				$("#myContact").append(contact);
				$("#myBday").append(bday);
				$("#myStatus").append(status);
			}
	 	});
 	});
}