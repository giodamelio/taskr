taskr
=====

time tracking and task managment

Taskr is a time-tracking task manager. You can add projects and then add tasks to those projects.
The plan is to export billables per project (each project has a hourly rate) for each month.

It's a [node-webkit](https://github.com/rogerwang/node-webkit) app so it needs to be bundled and shipped via [node-webkit](https://github.com/rogerwang/node-webkit).
It can be developed under http://localhost though as it's just vanilla JavaScript and HTML. It uses [angular](http://angularjs.org/)
to manage views and [localStorageDB](http://nadh.in/code/localstoragedb/) to handle database transactions
