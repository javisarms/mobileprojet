 $(document).ready(function() {
 	var url="http://localhost:8888/Valacro/readParticipants.php";
 	var urlE="http://localhost:8888/Valacro/readEvents.php";
 	var uid = localStorage.getItem('uid');
 	var arrOfEID = [];

 	//Get events IDs based on User ID
 	$.getJSON(url,function(result) {
		 //console.log(result);
		 $.each(result, function(i, field) {
		 	var euid = field.user_id;
		 	var eid = field.id_evenement_participant;
		 	if (euid == uid) {
		 		arrOfEID.push(eid);
		 	}
	 	});
 	});

 	//Show the events based on event ID
 	$.getJSON(urlE,function(result) {
		 $.each(result, function(i, field) {
		 	var id = field.id_evenement;
		 	for (var i = 0; i < arrOfEID.length; i++) {
		 	    if (id == arrOfEID[i]) {
	 	    		var u = "page" + id + ".html";
	 	    		var u2 = "`"+ "page" + id + ".html`";
	 	    		var title = field.name;
	 	    		var date = field.date_debut;
	 	    		var dateEnd = field.date_fin;
	 	    		var time = field.heure_deb;
	 	    		var timeEnd = field.heure_fin;
	 	    		var desc = field.description;
	 	    		var lieu = field.lieu;
	 	    		var card = "<div class='baraha'> <div class='card' onclick='push(" + u2 + ")'><center><img class='poster' src='img/poster.jpg'></center> <h2 class='card__title'>" + title + " | "  + date +"</h2> <div class='card__content'> <p class='card__txt'>" + desc + "</p></div></div></div>";
	 	    		var event = "<template id='" + u + "'><ons-page id='" + id + "'><ons-toolbar><div class='left'><button class='iconz' onclick='fn.pop()'><i class='fas fa-chevron-left'></i>&nbsp;Back</button></div></ons-toolbar><center><div class='card'><h4 class='card__title'>" + title + "</h4><div class='card__content'><p class='card__txt'>De:</p><p class='card__txt'>Date de debut: " + date + "</p><p class='card__txt'>Date de fin: " + dateEnd + "</p><p class='card__txt'>Addresse: " + lieu + "</p><div class='line'></div><br><p class='card__txt'>" + desc + "</p></div></div></center></ons-page></template>";	 	    	 	$("#eventCards").append(card);
	 	    		$(document.body).append(event);
		 	    }
		 	}
	 	});
 	});
 });
