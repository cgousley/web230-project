
module.exports = {
	
	// Checkout Page First load
		hal: function(req, res, input){
			
			res.render('404HAL',{nav: true, subtitle: " - Page Not Found"});
		},
		num404: function(req, res, input){
			
			res.render('404',{nav: true, subtitle: " - Page Not Found", image: "https://httpstatusdogs.com/img/404.jpg",  text: "<p class='lead text-center top20'>The page you're looking for can't be found</br>"+"But you're not stuck! Our navigation bar is above! <!--a href='https://httpstatusdogs.com/'>check out more http error dogs</a>.</br><a href='https://http.cat/.'> Or cats</a--></p>"});
		},
		
		num401: function(req, res, input){
			
			res.render('401',{nav: true, subtitle: " - Page Not Found", image: "https://httpstatusdogs.com/img/401.jpg",  text: "<p class='lead text-center top20'>You're not authorized to view this page.</br>"+"But you're not stuck! Our navigation bar is above!</p>"});
		}
		
 
 }