var taskr = angular.module('taskr', ['ngRoute']);

taskr.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/index.html',
		controller : 'indexCtrl'
	}).
	when('/:companyId',{
		templateUrl: 'views/tasks.html',
		controller : 'taskCtrl'
	})
	.otherwise(function($location){
		$location.path('/')
	});
}]);

taskr.controller('appbarCtrl', function($scope){

	$scope.exit = function(){
		window.close();
	}

});

taskr.controller('companiesCtrl', function($scope, $location){
	
	$scope.companies = db.query('companies');

	$scope.show_add = function(){
		document.getElementById('add_company').setAttribute('class', 'show');
	}
	$scope.hide_add = function(){
		document.getElementById('add_company').setAttribute('class', '');
	}

	$scope.add = function(){

	}
})

taskr.controller('indexCtrl', function($scope, $location){
	//stats and shit here later
});


taskr.controller('taskCtrl', function($scope, $location, $routeParams){
	
	$scope.company = db.query('companies', {ID : $routeParams.companyId})[0];

	$scope.tasks = db.query('tasks', {company : $routeParams.companyId});
	for(var i = 0; i < $scope.tasks.length; i++){
		$scope.tasks[i].entries = db.query('entries',{task: $scope.tasks[i].ID});
	}

	//FUNCTION: time_spent(Entry entry * string denomination) -> string
	//DESCRIPTION: calculate how much time was spent on this entry. The denomination can be either
	//             hours or minutes
	//PRE: entry.started_at is less than entry.ended_at
	//POST: the time difference in hours or minutes between entry.started_at and entry.ended_at 
	$scope.time_spent = function(entry, denomination){
		var start = new Date(entry.started_at);
		var end = new Date(entry.ended_at);
		var time = (end - start) / 1000 / 60;
		time = denomination == "minutes" ? time : time / 60;
		return Math.round(time);
	}

	//FUNCTION: total_time(Task task) -> Number
	//DESCRIPTION: Calculates the total amount of time (in hours) spent on task
	//PRE: 
	//POST: A number signifyin hours spent on task
	//SIDE-EFFECTS: runs a db-query
	$scope.total_time = function(task){
		var entries = db.query('entries', {task: task.ID});
		var total_time = 0;
		for(i = 0; i < entries.length; i++){
			total_time += $scope.time_spent(entries[i], 'hours');
		}
		return total_time;
	}
	
	//FUNCTION: add() -> Int
	//DESCRIPTION: Add a task to a company
	//PRE: the function is executed via a form with $scope.title and $scope.description defined
	//POST: 1 if the task is added to the database, otherwise 0
	//SIDE-EFFECTS: inserts data in to the database
	$scope.add = function(){
		db.insert('tasks', {
			company: $routeParams.companyId,
			title: $scope.title,
			description: $scope.description,
			complete: false
		});
		db.commit();
		$scope.tasks.push({title: $scope.title, description: $scope.description, complete: false});
	}
});
