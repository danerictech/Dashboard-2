**********************************************************
						DASHBOARD
**********************************************************

*Frameworks used:*

### The Client
Angular JS  - Front end MVC.
	Everything is injected in, which means there is low coupling of dependencies. Additionally, Angular has a great separation between views, models and controllers.

React JS - Front end dynamic UI rendering.
	Since, there exists large UI rendering on dynamic data change, React JS is perfect
	to maintain the change of the required data only instead of the whole page render.

### The Server
Node JS - Back end API creation.

Description : The application intends to create a dashboard having multiple tabs. On selection of each tabs, the user is provided with a view in respective to the corresponding tab.

Currently aiming to create the following tabs: 
	1. Dynamic data change from API is reflected onto the view.
	2. Chat application using Node JS.

## Directory Layout

```
Dashboard/                    --> all of the source files for the application
  assets
  	jsons                          --> contains the json files
  	images                          --> contains the images files
  directives                     --> contains the directives used in the app
    dynamic-charts-directives.js --> the directive for chart rendering
  css/               --> contains all the styles required in the tabs
  
  views/                --> contains all the views
  js 					--> contains all the controllers and directives
	app.js                --> main application module
	controllers 		  --> contains all the controllers
	directives 		  --> contains all the directives
  index.html            --> app layout file (the main html template file of the app)
```
For more information on AngularJS please check out http://angularjs.org/
