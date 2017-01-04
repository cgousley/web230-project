var userModel = require('../../models').Users;
var adminModel = require('../../models').Admins;

module.exports = {
	
	/*LOGIN PAGE FIRST LOAD*/
     index: function(req, res){
          var url = require('url');
          var url_parts = url.parse(req.url, true);
          var query = url_parts.query;
          
          
          if(req.session.success && req.session.user){
             res.redirect('../../checkout');
          } 
           /*IF THERE IS AN ERROR PARAMETER PASSED WITH THE VALUE OF 1 THEN DISPLAY AN ERROR MESSAGE AND SHOW THE LOGIN PAGE.*/
           else if (query.error == 1){
              // error = "You do not have access to the admin area";
              res.render('user/login',{title: 'Shopping Cart - Login', heading: 'Login Page', nav: true, userHead: true, ackMessage: true});
           }
           else{
             /*JUST THE DEFAULT LOGIN PAGE NO ERRORS.  THIS WILL BE CALLED WHEN
             THEY FIRST ACCESS THE LOGIN PAGE. THE ERROR IS SET TO AN EMPTY STRING TO CLEAR OUT ANY PAST ERROR MESSAGE.*/
             // error = '';
             res.render('user/login',{title: 'Shopping Cart - Login', heading: 'Login Page', nav: true, userHead: true, ackMessage: true});
          }
                   
},


     access: function(req, res){
         	
                        var data = JSON.parse(req.body.data);

							userModel.findOne({"email": data.email}, function(err, user){
							if (err){
								console.log(err);
							}
							else {//if not found, alert user not found
								if(user === null){
									res.send("user not found");
								}
								else{
									var bcrypt = require('bcrypt');
									bcrypt.compare(data.password, user.password, function(err, success){
										if (err){
											console.log(err);
										}
										else if (success) {
											
											req.session.regenerate(function(err){												
												if (err){
													console.log(err);
												}
												//IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY AND REDIRECT TO ADMIN HOME PAGE
                   								else{
                   									console.log("success");
                         							req.session.success = 'access approved';
                         							req.session.user = {
                         								name : user.fname+' '+user.lname,
                         								address1 : user.address,
                         								address2 : user.city+', '+user.state+' '+user.zip,
                         								
                         							};
                         							
                         							console.log('session made');
                         							
                         							res.cookie('name', JSON.stringify(user._id));
                         							
                         							res.render('user/checkout');
                         							console.log('login render made');
                         							}
											})
                 							
										}
										else {
											res.send("user not found");		
										}
									})
								}
							}
						});
     }, 


     /*THIS IS THE LOGOUT PAGE WHERE THE SESSION IS DESTROYED*/
     logout: function(req, res){
          req.session.destroy(function(err){
               if(err){
                    console.log(err);
               }
               else{
                    
                    res.redirect('/');
               }
          });
     }

}