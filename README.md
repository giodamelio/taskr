# taskr

## About
Taskr is a time-tracking task manager. You can add projects and then add tasks to those projects and measure how much time is spent on each of these tasks. The plan is to export billables per project (each project has a hourly rate) for each month.

It's a [node-webkit](https://github.com/rogerwang/node-webkit) app so it needs to be bundled and shipped via [node-webkit](https://github.com/rogerwang/node-webkit).

It can be developed under http://localhost though as it's just vanilla JavaScript and HTML. It uses [angular](http://angularjs.org/)
to manage views and logic and [localStorageDB](http://nadh.in/code/localstoragedb/) to handle database transactions.

## Development Server
There are two ways to run the app during development (when it's released it will be packed in its own executable).

### Build script + browser

This is the suggested method for development, it allows for auto-compilation and livereload via a [livereload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)

1. Install the dependencies. **You only need to do this the first time**. 

        npm install

2. Run the build script.

        npm run dev

3. Open in your browser of choice ([http://localhost:3141/views/app.html](http://localhost:3141/views/app.html)).

4. Enable livereload in your browser and you should be good to go.



### Build script + node-webkit

1. Install the dependencies. **You only need to do this the first time**. 

        npm install

2. Run the build script.

        npm run dev

3. Run with node-webkit from your project root.

        nw .

