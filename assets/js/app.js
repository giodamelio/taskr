// Generated by CoffeeScript 1.7.1
(function() {
  var $, taskr;

  taskr = angular.module('taskr', ['ngRoute']);

  $ = function(id) {
    return document.getElementById(id);
  };

  taskr.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: 'views/index.html',
        controller: 'indexCtrl'
      }).when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'settingsCtrl'
      }).when('/company/:companyId', {
        templateUrl: 'views/tasks.html',
        controller: 'taskCtrl'
      }).otherwise(function($location) {
        return $location.path('/');
      });
    }
  ]);

  taskr.controller('appbarCtrl', function($scope) {
    return $scope.exit = function() {
      return window.close();
    };
  });

  taskr.controller('companiesCtrl', function($scope, $location) {
    $scope.companies = db.query('companies');
    $scope.show_form = function() {
      $('hidden-form').setAttribute('class', 'show');
      return $('new-company-name').setAttribute('class', '');
    };
    $scope.hide_add = function() {
      $('hidden-form').setAttribute('class', '');
      return $('new-company-name').setAttribute('class', 'kinda-hidden');
    };
    return $scope.add = function() {
      var data, id;
      if ($scope.name.length === 0) {
        return;
      }
      data = {
        name: $scope.name,
        hourly_rate: $scope.hourly_rate,
        currency: $scope.currency
      };
      id = db.insert('companies', data);
      db.commit();
      data.ID = id;
      $scope.hide_add();
      return $scope.companies.push(data);
    };
  });

  taskr.controller('indexCtrl', function($scope, $location) {});

  taskr.controller('taskCtrl', function($scope, $location, $routeParams) {
    var task, _i, _len, _ref, _results;
    $scope.company = db.query('companies', {
      ID: $routeParams.companyId
    })[0];
    $scope.company.time_spent = 0;
    $scope.tasks = db.query('tasks', {
      company: $routeParams.companyId
    });
    $scope.time_spent = function(entry, denomination) {
      var end, start, time;
      start = new Date(entry.started_at);
      end = new Date(entry.ended_at);
      time = (end - start) / 1000 / 60;
      if (denomination === "hours") {
        time = time / 60;
      }
      return time;
    };
    $scope.total_time = function(task) {
      var entries, entry, time, _i, _len;
      entries = db.query('entries', {
        task: task.ID
      });
      time = 0;
      for (_i = 0, _len = entries.length; _i < _len; _i++) {
        entry = entries[_i];
        time += $scope.time_spent(entry, 'minutes');
      }
      return time;
    };
    $scope.revenue = function(task) {
      return $scope.company.hourly_rate * $scope.total_time(task) / 60;
    };
    $scope.total_revenue = function() {
      var revenue, task, _i, _len, _ref;
      revenue = 0;
      _ref = $scope.tasks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        task = _ref[_i];
        revenue += $scope.revenue(task);
      }
      return revenue;
    };
    $scope.add = function() {
      var data, id;
      if ($scope.title.length === 0) {
        return;
      }
      data = {
        company: $routeParams.companyId,
        title: $scope.title,
        description: $scope.description,
        complete: false
      };
      $('new-task-title').value = '';
      id = db.insert('tasks', data);
      db.commit();
      data.ID = id;
      data.entries = [];
      data.start_time = null;
      return $scope.tasks.push(data);
    };
    $scope.completed = function() {
      var _ref;
      return (_ref = task.complete) != null ? _ref : {
        "completed": "incomplete"
      };
    };
    $scope.toggle_timer = function(task) {
      var entry_data;
      if (task.start_time === null) {
        task.start_time = new Date();
        return task.active = 'active';
      } else {
        task.end_time = new Date();
        entry_data = {
          task: task.ID,
          started_at: task.start_time,
          ended_at: task.end_time
        };
        task.start_time = null;
        task.active = false;
        db.insert('entries', entry_data);
        db.commit();
        return task.entries.push(entry_data);
      }
    };
    $scope.toggle_complete = function(task) {
      task.complete = !task.complete;
      db.update('tasks', {
        ID: task.ID
      }, function(row) {
        row.complete = task.complete;
        return row;
      });
      return db.commit();
    };
    _ref = $scope.tasks;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      task = _ref[_i];
      task.active = 'inactive';
      task.entries = db.query('entries', {
        task: task.ID
      });
      task.start_time = null;
      _results.push($scope.company.time_spent += $scope.total_time(task));
    }
    return _results;
  });

  taskr.controller('settingsCtrl', function($scope) {
    return $scope.reset = function() {
      db.drop();
      return window.location = "/app.html";
    };
  });

}).call(this);
