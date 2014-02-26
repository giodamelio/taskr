#taskr

##About
Taskr is a time-tracking task manager. You can add projects and then add tasks to those projects and measure how much time is spent on each of these tasks. The plan is to export billables per project (each project has a hourly rate) for each month.

It's a [node-webkit](https://github.com/rogerwang/node-webkit) app so it needs to be bundled and shipped via [node-webkit](https://github.com/rogerwang/node-webkit).

It can be developed under http://localhost though as it's just vanilla JavaScript and HTML. It uses [angular](http://angularjs.org/)
to manage views and logic and [localStorageDB](http://nadh.in/code/localstoragedb/) to handle database transactions.

##How to run
There are two ways to run the app during development (when it's released it will be packed in its own executable).

1. Drop it in your webroot folder and view it in your chrome-browser under localhost (or any other vhosts config you want)
2. Drag and Drop the folder on the node-webkit executable for your platform (on OS X you can go open -n -a node-webkit path/to/taskr in the terminal if you installed node-webkit using npm with the -g flag)

I suggest running it via chrome during development just because the developer tools are really helpful.

(as an aside, to test database-queries run them through console.table() i.e. console.table(db.query('tasks')).
This will output a nice and readable table in the developer tools.
