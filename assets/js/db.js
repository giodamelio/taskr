var db = new localStorageDB('taskr', localStorage);

//db.drop();

if(db.isNew()){
	db.createTable("companies", ['name', 'hourly_rate', 'currency']);
	db.createTable('person', ['company', 'firstname', 'lastname', 'email', 'notify']);
	db.createTable("tasks", ['company', 'title', 'description', 'complete']);
	db.createTable("entries", ['task','started_at', 'ended_at']);
	
	db.insert('companies', {name: 'Clean Quality', hourly_rate: 120, currency: 'SEK'});
	db.insert('companies', {name: 'All in Office', hourly_rate: 120, currency: 'SEK'});
	db.commit();
}