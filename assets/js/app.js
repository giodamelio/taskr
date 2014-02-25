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

	$scope.setCompany = function(company){

	}

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
	$scope.tasks = db.query('tasks', {company : $routeParams.companyId});
	for(var i = 0; i < $scope.tasks.length; i++){
		$scope.tasks[i].entries = db.query('entries',{company: $routeParams.companyId});
	}
	$scope.minutes_spent = function(entry){
		var start = new Date(entry.started_at);
		var end = new Date(entry.ended_at);
		return (end - start) / 1000 / 60;
	}
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
	console.log($scope.tasks);
});
