 var url="http://localhost:8888/Valacro/readGroup_Mem.php";
 var urlDesc="http://localhost:8888/Valacro/readGroupe_Desc.php";
 var urlUser="http://localhost:8888/Valacro/readUser.php";
 var urlCoach="http://localhost:8888/Valacro/readCoachs_Groupe.php";
 var urlTrain="http://localhost:8888/Valacro/readEntrainement.php";
 var is_coach = localStorage.getItem('iscoach');
 var is_parent = localStorage.getItem('isparent');
 var is_adherent = localStorage.getItem('isadherent');
 var is_comite = localStorage.getItem('iscomite');
 var is_admin = localStorage.getItem('isadmin');


$(document).ready(function() {
	setTimeout(function() {
		hideItems();
 		if (is_comite == 1 || is_admin == 1) {
 			showAllGroups();
 		}
 		else {
 			generateCards();
 		}
 	}, 5);
});


function hideItems() {
	var uid = localStorage.getItem('uid');
	if (is_admin == 0) {
		document.getElementById("editCoachButton").style.display = "none";
		document.getElementById("deleteButton").style.display = "none";
	}
}

function generateCards() {
 	//generates the group cards

 	var uid = localStorage.getItem('uid');
 	var pid = localStorage.getItem('pid');
 	var arrOfGID = [];

 	//Get Group IDs based on logged in User's ID
 	$.getJSON(url,function(result) {
		$.each(result, function(i, field) {
		 	var guid = field.user_id;
		 	var puid = field.profil_id;
		 	var gid = field.id_groupe;
		 	if (guid == uid && puid == pid) {
		 		arrOfGID.push(gid);
		 	}
	 	});
 	});


 	//Get group based on group ID
 	$.getJSON(urlDesc,function(result) {
 		if (arrOfGID === undefined || arrOfGID.length == 0) {
 			var gCard = "<div class='card'><center><h3 class='card__title'>You have no groups</h3></center></div>";
 			$("#groupCards").prepend(gCard);
 		}
		 $.each(result, function(i, field) {
		 	var id = field.id_groupe;
		 	var cid;
		 	for (var i = 0; i < arrOfGID.length; i++) {
		 	    if (id == arrOfGID[i]) {
	 	    	 	//Final step
 	    	 	 	$.getJSON(urlUser,function(result) {
 	    	 	 		var u2 = "`"+ "page" + id + ".html`";
 	    	 	 		var nom = field.nom;
 	    	 	 		var gCard = "<div class='card' onclick='goToGroup(" + id + ")'><h2 class='card__title'>" + nom + "</h2><div class='card__content'></div><p class='card__txt'>Coach: <b id='coach" + id +"'>None</b></p><p class='card__txt'>Entraînement: <b id='entrain" + id + "'>None</b></p></div>";
 	    	 	 		$("#groupCards").append(gCard);
 	    	 	 		getTraining(id);
 	    	 	 		getCoach(id);
 	    	 	 	});
		 	    }
		 	}
	 	});
 	});
}

function showAllGroups() {
	$.getJSON(urlDesc,function(result) {
 		if (result == null) {
 			var gCard = "<div class='card'><center><h3 class='card__title'>There are no groups</h3></center></div>";
 			$("#groupCards").prepend(gCard);
 		}

		$.each(result, function(i, field) {
		 	var id = field.id_groupe;
		 	var cid;
 	 		var u2 = "`"+ "page" + id + ".html`";
 	 		var nom = field.nom;
 	 		var gCard = "<div class='card' onclick='goToGroup(" + id + ")'><h2 class='card__title'>" + nom + "</h2><div class='card__content'></div><p class='card__txt'>Coach: <b id='coach" + id +"'>None</b></p><p class='card__txt'>Entraînement: <b id='entrain" + id + "'>None</b></p></div>";
 	 		$("#groupCards").append(gCard);
 	 		getTraining(id);
 	 		getCoach(id);
	 	});
 	});
}

function getCoach(id) {
 	var cid = [];
 	var cpid = [];
 	var el = "#coach" + id;
 	var elv2 = "coach" + id;

 	//get the coaches' user and profile ID of the group
 	$.getJSON(urlCoach,function(result) {
		$.each(result, function(i, field) {
		 	var gid = field.id_groupe;
		 	var c = field.coach_user_id;
		 	var p = field.coach_profil_id;
		 	if (gid == id) {
		 		cid.push(c);
		 		cpid.push(p);
		 	}
	 	});
 	});

 	//get the Coach profile
 	$.getJSON(urlUser,function(result) {
 		var counter = 0;
		$.each(result, function(i, field) {
		 	var uid = field.user_id;
		 	var pid = field.profil_id;
		 	for (var i = 0; i < cid.length; i++) {
		 		if (cid[i] == uid && cpid[i] == pid) {
 			 		if (counter == 0) {
 						document.getElementById(elv2).innerHTML = "";
 						counter++;
 					}
		 			var nom = field.nom;
		 			var prenom = field.prenom;
		 			var name = prenom + " " + nom + " ";
		 			$(el).append(name);
		 		}
		 	}
	 	});
 	});
}

function getTraining(id) {
 	var el = "#entrain" + id;
 	var elv2 = "entrain" + id;
 	//get the Trainings
 	$.getJSON(urlTrain,function(result) {
 		var counter = 0;
		$.each(result, function(i, field) {
		 	var eid = field.id_groupe_entrainement;
		 	if (eid == id) {
		 		if (counter == 0) {
					document.getElementById(elv2).innerHTML = "";
					counter++;
				}
		 		present = true;
		 		var day = field.day;
		 		var start = field.heure_debut;
		 		var end = field.heure_fin;
		 		var lieu = field.lieu;
		 		var training = day + " " + start + "-" + end + " " + lieu + "<br>";
		 		$(el).append(training);
		 	}
	 	});
 	});
}

//Link to group
function goToGroup(id) {
 	localStorage.setItem('gid', id);
 	window.location.href = "admin_groupe.html";
}