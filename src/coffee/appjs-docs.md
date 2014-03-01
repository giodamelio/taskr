#taskCtrl

###add(void) -> void
Add a compnay to the list of companies

**Pre**: The function is executed via a form with hourly_rate, name and currency defined

**Post**: Id if the new company in the database

**Side-effects**: Adds a row in the companies table in the database


###time_spent(Entry entry * string denomination) -> string
calculate how much time was spent on this entry. The denomination can be either hours or minutes

**Pre**: entry.started\_at is less than entry.ended\_at. denomination is either "hours" or "minutes"

**Post**: the time difference in hours or minutes between entry.started\_at and entry.ended\_at

**Side-effects**: None


###total_time(Task task) -> Number
Calculates the total amount of time (in hours) spent on task

**Pre** None

**Post** A number signifyin hours spent on task

**Side-Effects** runs a db-query


#companyCtrl
###add() -> Int
Add a task to a company

**Pre**: the function is executed via a form with $scope.title and $scope.description defined

**Post**: 1 if the task is added to the database, otherwise 0

**Side-effects**: inserts data in to the database