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

		//Generate Modals
		showCoaches();
		showGymn();
 	}, 100);
});

function hideItems() {
	var uid = localStorage.getItem('uid');
 	var is_coach = localStorage.getItem('iscoach');
 	var is_parent = localStorage.getItem('isparent');
 	var is_adherent = localStorage.getItem('isadherent');
 	var is_comite = localStorage.getItem('iscomite');
 	var is_admin = localStorage.getItem('isadmin');


	//Hide buttons
 	if (is_admin == 0 && is_comite == 0) {
 		document.getElementById("messagesSide").style.display = "none";
 		document.getElementById("editCoachButton").style.display = "none";
 		document.getElementById("removeCoachButton").style.display = "none";
 		document.getElementById("deleteButton").style.display = "none";
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
 	var cid = [];
 	var cpid = [];

	//get the coaches' user and profile ID of the group
 	$.getJSON(urlCoach,function(result) {
		$.each(result, function(i, field) {
		 	var id = field.id_groupe;
		 	var c = field.coach_user_id;
		 	var p = field.coach_profil_id;
		 	if (id == gid) {
		 		cid.push(c);
		 		cpid.push(p);
		 	}
	 	});
 	});

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
				var id = field.id_entrainement;
		 		var day = field.day;
		 		var start = field.heure_debut;
		 		var end = field.heure_fin;
		 		var lieu = field.lieu;
		 		var training = day + " " + start + "-" + end + " " + lieu + "<br>";
		 		$("#entrain").append(training);

		 		//for deletion modal
		 		var line = "<input type='radio' name='day' value='" + id + "'>&nbsp;&nbsp;" + training + "<br><br>";
		 		$("#deleteTraining").prepend(line);
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
 		if (arrUID[0] == null) {
 			line = "<p class='list-group-item list-group-item-action'>There are no members</p>";
 			$("#putMembers").append(line);
 		}

		$.each(result, function(i, field) {
			for (var i = 0; i < arrUID.length; i++) {
				if(field.user_id == arrUID[i] && field.profil_id == arrPID[i]) {
					idLine = field.user_id + "," + field.profil_id
					nom = field.nom;
					prenom = field.prenom;
					line = "<p class='list-group-item list-group-item-action' onclick='viewMember(" + idLine + ")'>" + prenom + " " + nom + "</p>";
					$("#putMembers").append(line);

					var line2 = "<input type='radio' name='gymnast' value='" + idLine + "'>&nbsp;&nbsp;" + prenom + " " + nom + "<br><br>";
					$("#deleteGymn").prepend(line2);
				}
			}
	 	});
 	});
}

//Generate the Modals
//Shows all coaches
function showCoaches() {
 	var cid = [];
 	var cpid = [];

	//get the coaches' user and profile ID of the group
 	$.getJSON(urlCoach,function(result) {
		$.each(result, function(i, field) {
		 	var id = field.id_groupe;
		 	var c = field.coach_user_id;
		 	var p = field.coach_profil_id;
		 	if (id == gid) {
		 		cid.push(c);
		 		cpid.push(p);
		 	}
	 	});
 	});

	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
			var id = field.user_id;
			var pid = field.profil_id;
			var nom = field.nom;
			var prenom = field.prenom;
			var value = id + "," + pid;

			if (field.is_coach == 1) {
				if (cid.length == 0) {
					var line = "<input type='radio' name='coach' value='" + value + "'>&nbsp;&nbsp;" + prenom + " " + nom + "<br><br>";
					$("#coachForm").prepend(line);
				}

				else {
					for (var i = 0; i < cid.length; i++) {
						if (field.user_id == cid[i] && field.profil_id == cpid[i]) {
							var line = "<input type='radio' name='coach' value='" + value + "'>&nbsp;&nbsp;" + prenom + " " + nom + "<br><br>";
							$("#deleteCoach").prepend(line);
						}
						else {
							var line = "<input type='radio' name='coach' value='" + value + "'>&nbsp;&nbsp;" + prenom + " " + nom + "<br><br>";
							$("#coachForm").prepend(line);
						}
					}
				}
			}
	 	});
 	});
}

//Show all adherents
function showGymn() {
	arrUID = []
	arrPID = []

	arrUDone = [];
	//get the IDs of the members
	$.getJSON(url,function(result) {
		$.each(result, function(i, field) {
			if (field.id_groupe == gid) {
				arrUID.push(field.user_id);
				arrPID.push(field.profil_id);
			}
	 	});
 	});

	$.getJSON(urlUser,function(result) {
		$.each(result, function(i, field) {
			if (field.profil_adherent == 1) {
				var id = field.user_id;
				var pid = field.profil_id;
				var nom = field.nom;
				var prenom = field.prenom;
				var value = id + "," + pid;
				var line = "<input type='radio' name='gymnast' value='" + value + "'>&nbsp;&nbsp;" + prenom + " " + nom + "<br><br>";
				$("#gymnForm").prepend(line);
			}
			
	 	});
 	});
}

//Editing Info
function editTraining() {
	var url = "http://localhost:8888/Valacro/editTraining.php";

	//Get info
	//Check which day is checked
	var day = $("input[name='day']:checked").val();;

	var time = $.trim($("#time").val());
	var timeEnd = $.trim($("#timeEnd").val());
	var lieu = $.trim($("#place").val());

	var dataString="day="+day+"&time="+time+"&timeEnd="+timeEnd+"&lieu="+lieu+"&gid="+gid;

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
	if (newC == null) {
		ons.notification.alert('Please select a coach.');
	}

	else {
		var arr = newC.split(',');
		var uid = parseInt(arr[0]);
		var pid = parseInt(arr[1]);
		var dataString = "uid=" + uid + "&pid=" + pid + "&gid=" + gid;

		//Add to the existing coaches
		$.ajax({
		    type: "POST",crossDomain: true, cache: false,
		    url: url,
		    data: dataString,
		    success: function(data){
	        	window.location.href = "admin_groupe.html";
		    }
		});
	}
	

	//Close the modal
	var modal = document.querySelector('#coach');
  	modal.hide({ animation: 'fade' });
}

function addGymnast() {
	var url = "http://localhost:8888/Valacro/editGymnast.php";

	//Get the checked value
	var newM = $("input[name='gymnast']:checked").val();
	if (newM == null) {
		ons.notification.alert('Please select a member.');
	}

	else {
		var arr = newM.split(',');
		var uid = parseInt(arr[0]);
		var pid = parseInt(arr[1]);
		var dataString = "uid=" + uid + "&pid=" + pid + "&gid=" + gid;
		console.log(uid, pid);
		//Add to the existing members
		$.ajax({
		    type: "POST",crossDomain: true, cache: false,
		    url: url,
		    data: dataString,
		    success: function(data){
		        if(data == "error") {
		            ons.notification.alert('Member is already part of the group.');
		        }

		        else {
		        	window.location.href = "admin_groupe.html";
		        }
		    }
		});
	}
	

	//Close the modal
	var modal = document.querySelector('#gymnastes');
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

//Remove
function deleteCoach() {
	var url = "http://localhost:8888/Valacro/removeFromGroup.php";

	//Get the checked value
	var newC = $("input[name='coach']:checked").val();
	if (newC == null) {
		ons.notification.alert('Please select a coach to remove.');
	}

	else {
		var arr = newC.split(',');
		var uid = parseInt(arr[0]);
		var pid = parseInt(arr[1]);
		var table = 1;
		var dataString = "uid=" + uid + "&pid=" + pid + "&gid=" + gid + "&table=" + table;

		//Remove Coach
		$.ajax({
		    type: "POST",crossDomain: true, cache: false,
		    url: url,
		    data: dataString,
		    success: function(data){
	        	window.location.href = "admin_groupe.html";
		    }
		});
	}
	

	//Close the modal
	var modal = document.querySelector('#delCoach');
  	modal.hide({ animation: 'fade' });
}

function deleteGymn() {
	var url = "http://localhost:8888/Valacro/removeFromGroup.php";

	//Get the checked value
	var newM = $("input[name='gymnast']:checked").val();
	if (newM == null) {
		ons.notification.alert('Please select a member.');
	}

	else {
		var arr = newM.split(',');
		var uid = parseInt(arr[0]);
		var pid = parseInt(arr[1]);
		var table = 3;
		var dataString = "uid=" + uid + "&pid=" + pid + "&gid=" + gid + "&table=" + table;

		//Remove to the existing members
		$.ajax({
		    type: "POST",crossDomain: true, cache: false,
		    url: url,
		    data: dataString,
		    success: function(data){
		        	window.location.href = "admin_groupe.html";
		    }
		});
	}

	//Close the modal
	var modal = document.querySelector('#delCoach');
  	modal.hide({ animation: 'fade' });
}

function deleteTraining() {
	var url = "http://localhost:8888/Valacro/removeFromGroup.php";

	//Get the checked value
	var eid = $("input[name='day']:checked").val();
	if (eid == null) {
		ons.notification.alert('Please select a training to remove.');
	}

	else {
		var table = 2;
		var dataString = "eid=" + eid + "&table=" + table;
		console.log(eid);

		//Remove Coach
		$.ajax({
		    type: "POST",crossDomain: true, cache: false,
		    url: url,
		    data: dataString,
		    success: function(data){
	    		window.location.href = "admin_groupe.html";
	        	
		    }
		});
	}
	

	//Close the modal
	var modal = document.querySelector('#delTrain');
  	modal.hide({ animation: 'fade' });
}

//Clicks
function viewMember(uid, pid) {
	localStorage.setItem('puid', uid);
	localStorage.setItem('ppid', pid);
	window.location.href = "memberinfo.html";
}

function goBack() {
	localStorage.removeItem('gid');
	window.location.href = "admin_groupes.html";
}
