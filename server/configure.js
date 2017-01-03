/* PULL IN THE DEPENDENCIES */
var routes = require('./routes'),
	exphbs = require('express-handlebars'),
	express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	session = require('express-session');
	cookieParser = require('cookie-parser');
	
module.exports = function(app){
	/*SET UP BODYPARSER	*/
	// app.use(bodyParser.urlencoded({'extended':false}));
	app.use(bodyParser.urlencoded({'extended':true}));//this is from Ajax 3 serverjs
	app.use(bodyParser.json());//this is from Ajax 3 serverjs
	app.use(cookieParser('asecretthisis'));
	/*SET UP THE SESSION*/
	app.use(session({
		secret: 'thisisasecret',
		resave: false,
		saveUninitialized: false,
		// cookie: {
	  		// secure: true,
// 	  		
  		// } 
	}));
	//app.use(express.cookieParser());
	
	/* PUT APP INTO ROUTES CONSTRUCTOR */
	routes(app);

	/* MAKE THE PUBLIC FOLDER STATIC SO WE CAN GET AND USE OUR JS, CSS, ETC FILES */
	app.use('/public/', express.static(path.join(__dirname,'../public')));

	/* SET UP HANDLEBARS AS YOUR TEMPLATE ENGINE */
	app.engine('handlebars', exphbs.create({
		defaultLayout: 'main',
		layoutsDir: app.get('views') + '/layouts',
		partialDir: app.get('views') + '/partials',
	}).engine);
	app.set('view engine','handlebars');
	
	
	/*HANDLE 404*/
	app.use(function(req, res) {
	res.status(404);
	res.render('404',{nav: true, subtitle: " - Page Not Found", image: "https://httpstatusdogs.com/img/404.jpg",  text: "<p class='lead text-center top20'>The page you're looking for can't be found</br>"+"But you're not stuck! Our navigation bar is above! <!--a href='https://httpstatusdogs.com/'>check out more http error dogs</a>.</br><a href='https://http.cat/.'> Or cats</a--></p>"});
	});
	
	/*HANDLE 401*/
	app.use(function(req, res) {
	res.status(401);
	res.render('401',{nav: true, subtitle: " - Page Not Found", image: "https://httpstatusdogs.com/img/401.jpg",  text: "<p class='lead text-center top20'>You're not authorized to view this page.</br>"+"But you're not stuck! Our navigation bar is above!</p>"});
	});

	/*HANDLE 500*/
	app.use(function(error, req, res, next) {
	res.status(500);
	res.render('404',{nav: true, subtitle: " - Internal Server Error", image: "https://httpstatusdogs.com/img/500.jpg", text: "<p class='lead text-center top20'>Internal Server Error site is down</p>"});
	});
	
	

	/* RETURN APP */
	return app;
};