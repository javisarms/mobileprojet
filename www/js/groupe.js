var url="http://localhost:8888/Valacro/readGroup_Mem.php";
var urlDesc="http://localhost:8888/Valacro/readGroupe_Desc.php";
var urlUser="http://localhost:8888/Valacro/readUser.php";
var urlCoach="http://localhost:8888/Valacro/readCoachs_Groupe.php";
var urlTrain="http://localhost:8888/Valacro/readEntrainement.php";

var gid = localStorage.getItem('gid');
var name;

//Get the Information
$(document).ready(function() {
	setTimeout(function() {
    	hideItems();
    		
		//Generate Info Card
		getName();
		getCoachProfile();
		getTraining();

		//Generate Messages

		//Generate Members
		getMembers();
 	}, 5);
});

function hideItems() {
	var uid = localStorage.getItem('uid');
 	var is_coach = localStorage.getItem('iscoach');
 	var is_parent = localStorage.getItem('isparent');
 	var is_adherent = localStorage.getItem('isadherent');
 	var is_comite = localStorage.getItem('iscomite');
 	var is_admin = localStorage.getItem('isadmin');

	//Hide sidebar
 	if (is_admin == 0 && is_comite == 0 && is_coach == 0) {
 		var x = document.getElementById("messagesSide");
 		x.style.display = "none";
 	}
}

function getName() {
	$.getJSON(urlDesc,function(result) {
		$.each(result, function(i, field) {
			if (field.id_groupe == gid) {
				name = field.nom;
				var element = document.getElementById("gName");
				element.innerHTML = name;
			}
	 	});
 	});
}

function getCoachProfile() {
	cid = getCoachUID();
	cpid = getCoachPID();

 	//get the Coach profile
 	$.getJSON(urlUser,function(result) {
 		var counter = 0;
		$.each(result, function(i, field) {
			for (var i = 0; i < cid.length; i++) {
				if(field.user_id == cid[i] && field.profil_id == cpid[i]) {
					if (counter == 0) {
						document.getElementById('putCoach').innerHTML = "";
						counter++;
					}
					cNom = field.nom;
					cPN = field.prenom;
					line = cPN + " " + cNom + " ";
					$("#putCoach").prepend(line);
				}
			}
	 	});
 	});
}

function getCoachUID() {
	var cid = [];

 	//get the coach ID of the group
 	$.getJSON(urlCoach,function(result) {
		$.each(result, function(i, field) {
		 	var mgid = field.id_groupe;
		 	var c = field.coach_user_id;
		 	if (mgid == gid) {
		 		cid.push(c);
		 	}
	 	});
 	});

 	return cid
}

function getCoachPID() {
	var cpid = [];

 	//get the coach ID of the group
 	$.getJSON(urlCoach,function(result) {
		$.each(result, function(i, field) {
		 	var mgid = field.id_groupe;
		 	var p = field.coach_profil_id;
		 	if (mgid == gid) {
		 		cpid.push(p);
		 	}
	 	});
 	});

 	return cpid
}

function getTraining() {
	//get the Trainings
	$.getJSON(urlTrain,function(result) {
		var counter = 0;
		$.each(result, function(i, field) {
		 	var eid = field.id_groupe_entrainement;

		 	if (eid == gid) {
		 		if (counter == 0) {
					document.getElementById('entrain').innerHTML = "";
					counter++;
				}
		 		var day = field.day;
		 		var start = field.heure_debut;
		 		var end = field.heure_fin;
		 		var lieu = field.lieu;
		 		var training = day + " " + start + "-" + end + " " + lieu + "<br>";
		 		$("#entrain").append(training);
		 	}
	 	});
	});
}

function getMembers() {
	arrUID = []
	arrPID = []

	//get the IDs
	$.getJSON(url,function(result) {
		$.each(result, function(i, field) {
			if (field.id_groupe == gid) {
				arrUID.push(field.user_id);
				arrPID.push(field.profil_id);
			}
	 	});
 	});

 	//Get user info
 	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
			for (var i = 0; i < arrUID.length; i++) {
				if(field.user_id == arrUID[i] && field.profil_id == arrPID[i]) {
					idLine = field.user_id + ", " + field.profil_id
					nom = field.nom;
					prenom = field.prenom;
					line = "<p class='list-group-item list-group-item-action' onclick='viewMember(" + idLine + ")'>" + prenom + " " + nom + "</p>";
					$("#putMembers").append(line);
				}
			}
	 	});
 	});
}

//Clicks
function viewMember(uid, pid) {
	localStorage.setItem('puid', uid);
	localStorage.setItem('ppid', pid);
	window.location.href = "memberinfo.html";
}

function goBack() {
	localStorage.removeItem('gid');
	window.history.back();
}