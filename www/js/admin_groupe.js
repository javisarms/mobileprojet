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
	
	//Generate Modals
	showCoaches();
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

//Show all possible coaches
function showCoaches() {
	var cid = getCoach();

	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
			if (field.is_coach == 1) {
				var id = field.user_id;
				var nom = field.nom;
				var prenom = field.prenom;
				var line = "<input type='radio' name='coach' value='" + id + "'>&nbsp;&nbsp;" + prenom + " " + nom + "<br><br>";
				// for (var i = 0; i < cid.length; i++) {
				// 	if(id == cid[i]) {
				// 		line = "<input type='radio' name='coach' value='" + id + "' checked>&nbsp;&nbsp;" + prenom + " " + nom + "<br><br>";
				// 	}
				// }
				$("#coachForm").prepend(line);
			}
	 	});
 	});
}

function goBack() {
	localStorage.removeItem('gid');
	window.location.href = "admin_groupes.html";
}

//Editing Info
function editTraining() {
	var url = "http://localhost:8888/Valacro/editTraining.php";

	//Get info
	//Check which day is checked
	var day;

	if (document.getElementById('d1').checked) {
  		day = $.trim($("#d1").val());
	}

	else if (document.getElementById('d2').checked) {
		day = $.trim($("#d2").val());
	}

	else if (document.getElementById('d3').checked) {
		day = $.trim($("#d3").val());
	}

	else if (document.getElementById('d4').checked) {
		day = $.trim($("#d4").val());
	}

	else if (document.getElementById('d5').checked) {
		day = $.trim($("#d5").val());
	}

	var time = $.trim($("#time").val());
	var timeEnd = $.trim($("#timeEnd").val());
	var lieu = $.trim($("#place").val());

	var dataString="day="+day+"&time="+time+"&timeEnd="+timeEnd+"&lieu="+lieu+"&gid="+id;

	$.ajax({
	    type: "POST",crossDomain: true, cache: false,
	    url: url,
	    data: dataString,
	    success: function(data){
	        if(data == "error") {
	            ons.notification.alert('Insufficient data.');
	        }

	        else {
	        	ons.notification.alert('Succes!');
	        	window.location.href = "admin_groupe.html";
	        }
	    }
	});

	//Close the modal
	var modal = document.querySelector('#train');
  	modal.hide({ animation: 'fade' });
}

function editCoach() {
	var url = "http://localhost:8888/Valacro/editCoach.php";

	//Get the checked value
	var newC = $("input[name='coach']:checked").val();
	var dataString = "coach=" + newC + "&gid=" + id;

	//Add to the existing coaches
	$.ajax({
	    type: "POST",crossDomain: true, cache: false,
	    url: url,
	    data: dataString,
	    success: function(data){
	        if(data == "error") {
	            ons.notification.alert('Please select a coach.');
	        }

	        else {
	        	window.location.href = "admin_groupe.html";
	        }
	    }
	});

	//Close the modal
	var modal = document.querySelector('#coach');
  	modal.hide({ animation: 'fade' });
}

function getCoachIDs() {
	var arr = [];
	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
			if (field.is_coach == 1) {
				var id = field.user_id;
				arr.push(id);
			}
	 	});
 	});
 	return arr;
}