 var url="http://localhost:8888/Valacro/readGroup_Mem.php";
 var urlDesc="http://localhost:8888/Valacro/readGroupe_Desc.php";
 var urlUser="http://localhost:8888/Valacro/readUser.php";
 var urlCoach="http://localhost:8888/Valacro/readCoachs_Groupe.php";
 var urlTrain="http://localhost:8888/Valacro/readEntrainement.php";


 $(document).ready(function() {
 	genereateCards();
 	//generateTemplates();
 });

 function genereateCards() {
 	//generates the group cards

 	var uid = localStorage.getItem('uid');
 	var arrOfGID = [];

 	//Get Group IDs based on logged in User's ID
 	$.getJSON(url,function(result) {
		//console.log(result);
		$.each(result, function(i, field) {
		 	var guid = field.user_id;
		 	var gid = field.id_groupe;
		 	if (guid == uid) {
		 		arrOfGID.push(gid);
		 	}
	 	});
 	});

 	//Get group based on group ID
 	$.getJSON(urlDesc,function(result) {
		 $.each(result, function(i, field) {
		 	var id = field.id_groupe;
		 	var cid;
		 	for (var i = 0; i < arrOfGID.length; i++) {
		 	    if (id == arrOfGID[i]) {
		 	    	cid = getCoach(id);
		 	    	getCoachProfile(cid);
	 	    	 	var coachProf = getCoachProfile(cid);
	 	    	 	//Final step
 	    	 	 	$.getJSON(urlUser,function(result) {
 	    	 	 		var cNom;
    	 	 			var cPN;
	    	 	 		if (coachProf != null) {
	    	 	 			cNom = coachProf[0].nom;
	    	 	 			cPN = coachProf[0].prenom;
	    	 	 		}
	    	 	 		else {
	    	 	 			cNom = "None";
	    	 	 			cPN = "";
	    	 	 		}
 	    	 	 		var u2 = "`"+ "page" + id + ".html`";
 	    	 	 		var nom = field.nom;
 	    	 	 		var gCard = "<div class='card' onclick='goToGroup(" + id + ")'><h2 class='card__title'>" + nom + "</h2><div class='card__content'></div><p class='card__txt'>Coach: <b>" + cPN + " " + cNom + "</b></p><p class='card__txt'>Entraînement: </p><b id='entrain'></b></div>";
 	    	 	 		$("#groupCards").append(gCard);
 	    	 	 		getTraining(id);
 	    	 	 	});
		 	    }
		 	}
	 	});
 	});
 }

 function getCoach(id) {
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

 	return cid;
 }

 function getTraining(id) {
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

 function getCoachProfile(cid) {
 	var coachProf = [];

 	//get the Coach profile
 	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
		 	var uid = field.user_id;
		 	if (cid[0] == uid) {
		 		coachProf.push(field);
		 	}
	 	});
 	});

 	return coachProf;
 }

 //Link to group
 function goToGroup(id) {
 	localStorage.setItem('gid', id);
 	window.location.href = "groupe.html";
 }