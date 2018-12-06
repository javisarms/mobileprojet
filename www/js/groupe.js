var url="http://localhost:8888/Valacro/readGroup_Mem.php";
var urlDesc="http://localhost:8888/Valacro/readGroupe_Desc.php";
var urlUser="http://localhost:8888/Valacro/readUser.php";
var urlCoach="http://localhost:8888/Valacro/readCoachs_Groupe.php";
var urlTrain="http://localhost:8888/Valacro/readEntrainement.php";

var id = localStorage.getItem('gid');
var name;

//Get the Information
$(document).ready(function() {
	//Generate Info Card
	getName();
	getCoachProfile();
	getTraining();

	//Generate Messages

	//Generate Members
});

function getName() {
	$.getJSON(urlDesc,function(result) {
		$.each(result, function(i, field) {
			if (field.id_groupe == id) {
				name = field.nom;
				var element = document.getElementById("gName");
				element.innerHTML = name;
			}
	 	});
 	});
}

function getCoachProfile() {
	cid = getCoach();
 	var coachProf = [];

 	//get the Coach profile
 	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
			for (var i = 0; i < cid.length; i++) {
				if(field.user_id == cid[i]) {
					cNom = field.nom;
					cPN = field.prenom;
					line = "<p class='card__txt'>Coach: <b>" + cPN + " " + cNom + "</b></p>";
					$("#cContent").append(line);
				}
			}
	 	});
 	});
}

function getCoach() {
	var cid = [];
 	//get the coach ID of the group
 	$.getJSON(urlCoach,function(result) {
		$.each(result, function(i, field) {
		 	var gid = field.id_groupe;
		 	var c = field.coach_user_id;
		 	if (gid == id) {
		 		cid.push(c);
		 	}
	 	});
 	});
 	return cid
}

function getTraining() {
	//get the Trainings
	$.getJSON(urlTrain,function(result) {
		if (result == "") {
			$("#entrain").append("None");
		}

		else {
		$.each(result, function(i, field) {
		 	var eid = field.id_groupe_entrainement;

		 	if (eid == id) {
		 		var day = field.day;
		 		var start = field.heure_debut;
		 		var end = field.heure_fin;
		 		var lieu = field.lieu;
		 		var training = day + " " + start + "-" + end + " " + lieu + "<br>";
		 		$("#entrain").append(training);
		 	}
	 	});
		}
	});
}



function goBack() {
	localStorage.removeItem('gid');
	window.location.href = "groupes.html";
}