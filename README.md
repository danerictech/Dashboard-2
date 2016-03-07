
# DASHBOARD


*Frameworks used:*

### The Client
Angular JS  - Front end MVC.
	Everything is injected in, which means there is low coupling of dependencies. Additionally, Angular has a great separation between views, models and controllers.

React JS - Front end dynamic UI rendering.
	Since, there exists large UI rendering on dynamic data change, React JS is perfect
	to maintain the change of the required data only instead of the whole page render.

### The Server
Express JS - Back end API creation.
	It's a framework based on Node JS, which provides easier server creation and manipulation methods.

Description : The application intends to create a dashboard having multiple tabs. On selection of each tabs, the user is provided with a view in respective to the corresponding tab.

Currently aiming to create the following tabs: 
	1. Dynamic data change from API is reflected onto the view.
	2. Chat application using Node JS.

## Directory Layout

```
Dashboard/                    --> all of the source files for the application
	node_modules			  --> all of the node modules are present in this file.
    public					  --> all static files within this folder
		assets
			jsons                          --> contains the json files
			images                         --> contains the images files

		css/              	  --> contains all the styles required in the tabs

		views/                --> contains all the views
		js 					  --> contains all the controllers and directives
			controllers 	  --> contains all the controllers
			directives 		  --> contains all the directives
			libraries		  --> contains all the libraries

	dashboard.js              --> main application module
	index.html                --> app layout file (the main html template file of the app)
	bower.json 				  --> bower package
	package.json 			  --> npm package
	.bowercc 				  --> bower path setting
```
For more information on AngularJS please check out http://angularjs.org/

To run the server : 
Run : node api-express.js
