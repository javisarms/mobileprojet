var uid = localStorage.getItem('uid');
var pid = localStorage.getItem('pid');
var is_coach = localStorage.getItem('iscoach');
var is_parent = localStorage.getItem('isparent');
var is_adherent = localStorage.getItem('isadherent');
var is_comite = localStorage.getItem('iscomite');
var is_admin = localStorage.getItem('isadmin');

$(document).ready(function() {
	setTimeout(function() {
    	hideItems();
    	showProfile();
    	showChildren();
 	}, 5);
});


function hideItems() {
	//Hide sidebar
	if (is_admin == 0 && is_comite == 0 && is_coach == 0) {
		document.getElementById("messagesSide").style.display = "none";
	}

	//Hide if not parent
	if (is_parent == 0) {
		document.getElementById("parentz").style.display = "none";
		document.getElementById("viewEnfants").style.display = "none";
	}
}

function showProfile() {
	var urlUser="http://localhost:8888/Valacro/readUser.php";
 	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
			if (field.user_id == uid && field.profil_id == pid) {
				var nom = field.nom;
				var prenom = field.prenom;
				var email = localStorage.getItem('uemail');
				var bday = field.birthday;

				//Contact
				var contact = field.phone_number;
				if (contact == null) {
					contact = "None";
				}

				//Status
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
				if (is_adherent == 1) {
					status += "Adherent ";
				}

				$("#myName").append(prenom + " " + nom);
				$("#myEmail").append(email);
				$("#myContact").append(contact);
				$("#myBday").append(bday);
				$("#myStatus").append(status);
			}
	 	});
 	});
}

function showChildren() {
	var urlUser="http://localhost:8888/Valacro/readUser.php";
 	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
			if(field.user_id == uid && field.profil_id != pid) {
				idLine = field.user_id + ", " + field.profil_id
				nom = field.nom;
				prenom = field.prenom;
				line = "<p class='list-group-item list-group-item-action' onclick='viewMember(" + idLine + ")'>" + prenom + " " + nom + "</p>";
				$("#putEnfants").prepend(line);
			}
	 	});
 	});
}

function viewMember(uid, pid) {
	localStorage.setItem('puid', uid);
	localStorage.setItem('ppid', pid);
	window.location.href = "memberinfo.html";
}

//Editing information
function editName() {
	var url = "http://localhost:8888/Valacro/editProfileName.php";

	//Get the checked value
	var nom= $.trim($("#editNom").val());
    var prenom= $.trim($("#editPrenom").val());
	var dataString = "nom=" + nom + "&prenom=" + prenom + "&uid=" + uid + "&pid=" + pid;

	//Edit Name
	$.ajax({
	    type: "POST",crossDomain: true, cache: false,
	    url: url,
	    data: dataString,
	    success: function(data){
	        if(data == "error") {
	            ons.notification.alert('Please input proper information.');
	        }

	        else {
	        	window.location.href = "profil.html";
	        }
	    }
	});
}

function editContact() {
	var url = "http://localhost:8888/Valacro/editProfileContact.php";

	//Get the checked value
	var con = $.trim($("#editCo").val());
	var dataString = "con=" + con + "&uid=" + uid + "&pid=" + pid;

	//Edit Name
	$.ajax({
	    type: "POST",crossDomain: true, cache: false,
	    url: url,
	    data: dataString,
	    success: function(data){
	        if(data == "error") {
	            ons.notification.alert('Please input proper information.');
	        }

	        else {
	        	window.location.href = "profil.html";
	        }
	    }
	});
}

function editEmail() {
	var url = "http://localhost:8888/Valacro/editProfileEmail.php";

	//Get the checked value
	var email = $.trim($("#editEm").val());
	var dataString = "email=" + email + "&uid=" + uid + "&pid=" + pid;

	//Edit Name
	$.ajax({
	    type: "POST",crossDomain: true, cache: false,
	    url: url,
	    data: dataString,
	    success: function(data){
	        if(data == "error") {
	            ons.notification.alert('Please input proper information.');
	        }

	        else {
	        	window.location.href = "profil.html";
	        	localStorage.setItem('uemail', email);
	        }
	    }
	});
}