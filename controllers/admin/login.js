var userModel = require('../../models').Users;
var adminModel = require('../../models').Admins;

module.exports = {
	/*LOGIN PAGE FIRST LOAD*/
     index: function(req, res){
          var url = require('url');
          var url_parts = url.parse(req.url, true);
          var query = url_parts.query;
          
           if(req.session.success && req.session.admin){
        	res.redirect('../../admin/home');
        }
        // //If session is success but privlege is user, redirect to 401
        // else if(req.session.success && req.session.user){
        	   // res.redirect('../401');
        // }
        /*IF THERE IS NOT SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
        else{
            // res.redirect('/admin/login/?error=1');
          res.render('admin/login',{title: 'Admin - Login', heading: 'Home Page', blankBar: true, ackMessage: true});
       	}

},


     access: function(req, res){
         	
                         var data = req.body.data;
                        var data = JSON.parse(req.body.data);

// 							Checks for the user email
							adminModel.findOne({"email": data.email}, function(err, admin){
							if (err){
								console.log(err);
							}
							else {//if not found, alert user not found
								if(admin === null){
									res.send("admin not found");
								}
								else{// else if found, check for encrypted password
									var bcrypt = require('bcrypt');
									bcrypt.compare(data.password, admin.password, function(err, success){
										if (err){
											console.log(err);
										}
										else if (success) {// if found, create session 
											req.session.regenerate(function(err){												
												if (err){
													console.log(err);
												}
												//IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY AND REDIRECT TO ADMIN HOME PAGE
                   								else{//if session creation successful, send access approved
                   									console.log("success");
                         							req.session.success = 'access approved';
                         							req.session.admin = 'success';
                         							var data = {};
													                         							
                         							//send user ID for addess and for inclusing in cart submit 
                         							data._id = admin._id;
                         							res.send(data);	
                         							}
											})
										}
										else {// password not found
											res.send("admin not found");		
										}
									})
								}
							}
						});
     }, 


    /*THIS IS THE LOGOUT PAGE WHERE THE SESSION IS DESTROYED*/
	logout: function(req, res){
     	
	 	//If there is only an admin session, destroy the entire session object
		if (req.session.success && req.session.admin && !req.session.user){
     		
      		req.session.destroy(function(err){
				if(err){
            	    console.log(err);
 	      		}
               	
               	else{
                    res.redirect('/');
               }
         	});

		}
		//If there is an admin and a user session, delete the admin session 
		else if(req.session.success && req.session.admin && req.session.user){
			delete req.session.admin(function(err){
				if(err){
					console.log(err);
				}
				else{
					res.redirect('/');
				}
				console.log('deleted admin');
			});
		}
     	
     }

}
