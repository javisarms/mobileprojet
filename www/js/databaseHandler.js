//readTransaction and transaction
var databaseHandler = {
	db:null,
	createDatabase: function() {
		this.db = window.openDatabase("products.db", "1.0","product database", 1000000);
		
	}
}