var taskr = angular.module('taskr', ['ngRoute']);

taskr.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/index.html',
		controller : 'indexCtrl'
	}).
	when('/settings',{
		templateUrl: 'views/settings.html',
		controller: 'settingsCtrl'
	}).
	when('/company/:companyId',{
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
		document.getElementById('add_company_sidebar').setAttribute('class', 'show');
	}

	$scope.hide_add = function(){
		document.getElementById('add_company_sidebar').setAttribute('class', '');
	}

	$scope.add = function(){
		if($scope.name.length == 0) return;
		var data = {
			name: $scope.name,
			hourly_rate : $scope.hourly_rate,
			currency: $scope.currency
		};
		var id = db.insert('companies', data);
		db.commit();
		data.ID = id;
		$scope.hide_add();
		$scope.companies.push(data)
	}
})

taskr.controller('indexCtrl', function($scope, $location){
	//stats and shit here later
});


taskr.controller('taskCtrl', function($scope, $location, $routeParams){
	
	$scope.company = db.query('companies', {ID : $routeParams.companyId})[0];

	$scope.tasks = db.query('tasks', {company : $routeParams.companyId});
	for(var i = 0; i < $scope.tasks.length; i++){
		$scope.tasks[i].active = 'inactive';
		$scope.tasks[i].entries = db.query('entries',{task: $scope.tasks[i].ID});
	}

	$scope.time_spent = function(entry, denomination){
		var start = new Date(entry.started_at);
		var end = new Date(entry.ended_at);
		var time = (end - start) / 1000 / 60;
		time = denomination == "minutes" ? time : time / 60;
		return Math.round(time);
	}

	$scope.total_time = function(task){
		var entries = db.query('entries', {task: task.ID});
		var total_time = 0;
		for(i = 0; i < entries.length; i++){
			total_time += $scope.time_spent(entries[i], 'minutes');
		}
		return total_time;
	}
	
	$scope.add = function(){
		if($scope.title.length == 0) return;
		var data = {
			company: $routeParams.companyId,
			title: $scope.title,
			description: $scope.description,
			complete: false
		};
		var id = db.insert('tasks', data);
		db.commit();
		data.ID = id;
		data.entries = [];
		$scope.tasks.push(data);
		$scope.hide_add();
	}

	$scope.toggle_timer = function(task){
		if(task.start_time == null){
			task.start_time = new Date();
			task.active = 'active';
		}
		else{
			task.end_time = new Date();
			var entry_data = {task: task.ID, started_at: task.start_time, ended_at: task.end_time};
			db.insert('entries', entry_data);
			db.commit();
			task.entries.push(entry_data);
			task.start_time = null;
			task.active = false;
		}
	}

	$scope.show_add = function(){
		document.getElementById('modal-overlay').setAttribute('class','show');
		document.getElementById('add_task').setAttribute('class','show');
	}
	$scope.hide_add = function(){
		document.getElementById('modal-overlay').setAttribute('class','');
		document.getElementById('add_task').setAttribute('class','');
	}
	document.getElementById('modal-overlay').addEventListener('click', function(){
		$scope.hide_add();
	});
});

taskr.controller('settingsCtrl', function($scope){

});
