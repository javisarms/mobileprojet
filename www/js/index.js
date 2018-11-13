 $(document).ready(function()
 {
 var url="http://localhost:8888/Valacro/readEvents.php";
 $.getJSON(url,function(result) {
 console.log(result);
 $.each(result, function(i, field) {
	 var id = field.id_evenement;
	 var u = "page" + id + ".html";
	 var u2 = "`"+ "page" + id + ".html`";
	 var title = field.name;
	 var date = field.date_debut;
	 var dateEnd = field.date_fin;
	 var time = field.heure_debut;
	 var timeEnd = field.heure_fin;
	 var desc = field.description;

	 var card = "<div class='baraha'> <div class='card' onclick='push(" + u2 + ")'><center><img class='poster' src='img/poster.jpg'></center> <h2 class='card__title'>" + title + " | "  + date +"</h2> <div class='card__content'> <p class='card__txt'>" + desc + "</p></div></div></div>";
	 var event = "<template id='" + u + "'><ons-page id='" + id + "'></ons-page></template>";
 	 $("#eventCards").append(card);
	 $(document.body).append(event);
	 var trial = document.getElementById("eventCards");
	 console.log(document.body);
	 	});
 	});
 });