module.exports = {
	// This ends the user session and provides the content for the orders complete page
	index: function(req, res){

  	 	//If there is only an user session, destroy the entire session object
		if (req.session.success && req.session.user && !req.session.admin){
     		
      		req.session.destroy(function(err){
				if(err){
            	    console.log(err);
 	      		}
               	
               	else{
                    //res.redirect('/');
                    res.render('user/orderComplete',{title: 'Shopping Cart - Orders Complete', heading: 'Orders Complete', nav: true, userHead: true});
               }
         	});

		}
		//If there is an admin and a user session, delete the user session 
		else if(req.session.success && req.session.admin && req.session.user){
			
			//This defines the admin session object delete function, with an err callback
			deleteUserSess=function(callback){
				delete req.session.user;
				callback();	
			};

			//If the the admin session object delete function throws an error, console.log it
			//If no error, redirect to user home 
			deleteUserSess(function(err){
				if(err){
					console.log(err);
				}
				else{
					//res.redirect('/');
					res.render('user/orderComplete',{title: 'Shopping Cart - Orders Complete', heading: 'Orders Complete', nav: true, userHead: true});
				}
			});
		}
     }

};
