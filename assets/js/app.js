// Generated by CoffeeScript 1.7.1
(function() {
  var taskr;

  taskr = angular.module('taskr', ['ngRoute']);

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
      document.getElementById('hidden-form').setAttribute('class', 'show');
      return document.getElementById('new-company-name').setAttribute('class', '');
    };
    $scope.hide_add = function() {
      document.getElementById('hidden-form').setAttribute('class', '');
      return document.getElementById('new-company-name').setAttribute('class', 'kinda-hidden');
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
    var task, _i, _len, _ref;
    $scope.company = db.query('companies', {
      ID: $routeParams.companyId
    })[0];
    $scope.tasks = db.query('tasks', {
      company: $routeParams.companyId
    });
    _ref = $scope.tasks;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      task = _ref[_i];
      task.active = 'inactive';
      task.entries = db.qery('entries', {
        task: task.ID
      });
    }
    $scope.time_spent = function(entry, denomination) {
      var end, start, time, _ref1;
      start = new Date(entry.started_at);
      end = new Date(entry.ended_at);
      time = (end - start) / 1000 / 60;
      time = (_ref1 = denomination === "minutes") != null ? _ref1 : {
        time: time / 60
      };
      return Math.round(time);
    };
    $scope.total_time = function(task) {
      var entries, entry, total_time, _j, _len1;
      entries = db.query('entries', {
        task: task.ID
      });
      total_time = 0;
      for (_j = 0, _len1 = entries.length; _j < _len1; _j++) {
        entry = entries[_j];
        total_time += $scope.time_spent(entry, 'minutes');
      }
      return total_time;
    };
    $scope.revenue = function(task) {
      return $scope.company.hourly_rate * $scope.total_time(task) / 60;
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
      id = db.insert('tasks', data);
      db.commit();
      data.ID = id;
      data.entries = [];
      $scope.tasks.push(data);
      return $scope.hide_add();
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
        db.insert('entries', entry_data);
        db.commit();
        task.entries.push(entry_data);
        task.start_time = null;
        return task.active = false;
      }
    };
    return $scope.toggle_complete = function(task) {
      task.complete = !task.complete;
      db.update('tasks', {
        ID: task.ID
      }, function(row) {
        row.complete = task.complete;
        return row;
      });
      return db.commit();
    };
  });

  taskr.controller('settingsCtrl', function($scope) {
    return $scope.reset = function() {
      db.drop();
      return window.location = "/app.html";
    };
  });

}).call(this);
