db = new localStorageDB("taskr", localStorage)

#db.drop(); db = new LocalStorageDB('taskr', localStorage);
#i uncomment this and run the app once to clear the database and comment it out and run the app again
if db.isNew()
    db.createTable "companies", [
        "name"
        "hourly_rate"
        "currency"
    ]
    db.createTable "person", [
        "company"
        "firstname"
        "lastname"
        "email"
        "notify"
    ]
    db.createTable "tasks", [
        "company"
        "title"
        "description"
        "complete"
    ]
    db.createTable "entries", [
        "task"
        "started_at"
        "ended_at"
    ]
    db.commit()
