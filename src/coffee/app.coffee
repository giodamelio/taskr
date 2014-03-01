taskr = angular.module('taskr', ['ngRoute'])

$ = (id) -> document.getElementById(id) 

taskr.config(['$routeProvider',($routeProvider) ->
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
    .otherwise(($location) ->
        $location.path('/')
    )
])

taskr.controller('appbarCtrl', ($scope) ->  
    $scope.exit = () -> window.close() 
)

taskr.controller('companiesCtrl', ($scope, $location) ->
    
    $scope.companies = db.query('companies')

    $scope.show_form = () -> 
        $('hidden-form').setAttribute('class', 'show')
        $('new-company-name').setAttribute('class', '')


    $scope.hide_add = () ->
        $('hidden-form').setAttribute('class', '')
        $('new-company-name').setAttribute('class', 'kinda-hidden')


    $scope.add = () ->
        return if $scope.name.length == 0
        data = {
            name : $scope.name,
            hourly_rate : $scope.hourly_rate,
            currency : $scope.currency
        }
        id = db.insert('companies', data)
        db.commit()
        data.ID = id
        $scope.hide_add()
        $scope.companies.push(data)
)

taskr.controller('indexCtrl', ($scope, $location) ->
    #stats and shit here later
)


taskr.controller('taskCtrl', ($scope, $location, $routeParams) ->
    
    $scope.company = db.query('companies', {ID : $routeParams.companyId})[0]
    $scope.company.time_spent = 0
    $scope.tasks = db.query('tasks', {company : $routeParams.companyId})

    $scope.time_spent = (entry, denomination) ->
        start = new Date(entry.started_at)
        end = new Date(entry.ended_at)
        time = (end - start) / 1000 / 60
        time = time / 60 if denomination == "hours"
        time

    $scope.total_time = (task) ->
        entries = db.query('entries', {task: task.ID})
        time = 0
        for entry in entries
            time += $scope.time_spent entry, 'minutes'
        time

    $scope.revenue = (task) ->
        $scope.company.hourly_rate * $scope.total_time(task) / 60

    $scope.total_revenue = () ->
        revenue = 0
        for task in $scope.tasks
            revenue += $scope.revenue(task)
        revenue
    
    $scope.add = () ->
        return if $scope.title.length == 0
        data = {
            company: $routeParams.companyId,
            title: $scope.title,
            description: $scope.description,
            complete: false,
        }
        $('new-task-title').value = ''
        id = db.insert('tasks', data)
        db.commit()
        data.ID = id
        data.entries = []
        data.start_time = null
        $scope.tasks.push(data)

    $scope.completed = () ->
        task.complete ? "completed" : "incomplete"

    $scope.toggle_timer = (task) ->
        if task.start_time == null
            task.start_time = new Date()
            task.active = 'active'
        else
            task.end_time = new Date()
            entry_data = {task: task.ID, started_at: task.start_time, ended_at: task.end_time}
            task.start_time = null
            task.active = false
            db.insert('entries', entry_data)
            db.commit()
            task.entries.push(entry_data)

    $scope.toggle_complete = (task) ->
        task.complete = !task.complete;
        db.update('tasks', {ID : task.ID}, (row) ->
            row.complete = task.complete;
            row
        )
        db.commit()

    for task in $scope.tasks
        task.active = 'inactive'
        task.entries = db.query('entries', {task: task.ID})
        task.start_time = null
        $scope.company.time_spent += $scope.total_time task
)

taskr.controller('settingsCtrl', ($scope) ->
    $scope.reset = () ->
        db.drop()
        window.location = "/app.html"
)
