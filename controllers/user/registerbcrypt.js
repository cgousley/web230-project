/*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
var userModel = require('../../models').Users;
var fs = require('fs');
var js = '<script src="/public/js/Ajax.js"></script>';
js += '<script src="/public/js/main.js"></script>';

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
          res.render('user/register',{title: 'Shopping Cart - Registration', heading: 'Home Page', nav: true, state: stateList, userHead: true, ackMessage: true});
 	},
 	
 	/*THIS IS CALLED THEN THEY CLICK THE "ACCESS ADMIN AREA BUTTON"*/
     registerUser: function(req, res){
     	//grab data on page
	     	var data = JSON.parse(req.body.data);
			// var data = req.body.data;
		
		console.log(data);
		console.log(data.email);
		// console.log(data.email);
		
		var bcrypt = require('bcrypt');
        var saltRounds = 10;
        var documentData = {}
        
        bcrypt.hash(data.password, saltRounds, function(err, hash){
        	if(err){
        		console.log(err);
        	}
        	else{
        		data.password = hash;
        		
        					//check to see if email is taken
			userModel.find({"email": data.email}).
						select({_id: 1}).
						exec(function(err, user) {
							if (err) {
						  	console.log(err);
						  }
						  // if completed successfully
						  else{
							// if no email is found submit data
						  	if (user.length == 0){
						  		var account = new userModel(data);
								account.save(function(err){
									if(err){
						        		res.send('error');
						        	}
						        	else{
						        		 res.send('success');
									}
								});	
						  	}
						  	// if email is found
						  	else {
						  		res.send("We're sorry, we already have someone with that email address. Please try another.");
						  		
						  	}
						}		
});
        	}
        })



}

}
		
		
		
		
		
		
		
		
		

		
		// var account = new userModel(data);
		// // console.log("account = new userModel(accountData) is "+account);
		// account.save(function(err){
			// if(err){
        		// res.send('error');
        	// }
        	// else{
        		 // res.send('success');
			// }
		// });
		
	
		//PRIOR TO COPYING 7.0 for 4.0 OVER!!!!!!!!!!
		// var account = new userModel(formData);
// 		
		// // {fname: fname}, {lname: lname}, {address: address}, {city: city}, {state: state}, {zip: zip}, {phone: phone}, {email: email}, {password: password},
// 		
		// account.save(function(err){
			// if(err){
        		// res.send('error');
        	// }
        	// else{
        		 // res.send('success');
			// }
		// });	
			
			//userModel.findOne({}, {email: data.email, password: password.email}), function(err, doc) {
				
				/*PAUSED HERE*/
					
		// var registrationData = {};
		// registrationData.fname = req.body.fname;
		// registrationData.lname = req.body.lname;
		// registrationData.address = req.body.address;
		// registrationData.city = req.body.city;
		// registrationData.state = req.body.state;
		// registrationData.zip = req.body.zip;
		// registrationData.phone = req.body.phone;
		// registrationData.email = req.body.email;
		// registrationData.password = req.body.password;
// 		
// 		
		// var account = new userModel(registrationData);
		// account.save(function(err){
				        	// if(err){
				        		// res.send('error');
				        	// }
				        	// else{
				        		 // res.send('success');
				        		 // //res.render('user/checkout', {title: 'Shopping Cart - Checkout', heading: 'Home Page', nav: true, userHead: true});
				        	// }
				        // });
	                         // res.redirect('../checkout');
	                    // }
		
          
         //if(req.body.password === 'ASDFasdf1!'){
         	
               // req.session.regenerate(function(err){
                    // if(err){
                         // console.log(err)
                    // }
                    // /*IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY AND REDIRECT TO ADMIN HOME PAGE*/
                    // else{
                         // req.session.success = 'access approved';
                         // var data = JSON.stringify(req.body);
                         // data = JSON.parse(data);
//     	THIS IS THE SESSION
	    				// /* NEED TO PUT DATA INTO A NAMEMODEL OBJECT AND THEN SAVE IT */
				    	// var user = new userModel(data);
				        // user.save(function(err){
				        	// if(err){
				        		// console.log(err);
				        	// }
				        	// else{
				        		 // res.render('user/checkout', {title: 'Shopping Cart - Checkout', heading: 'Home Page', nav: true, userHead: true});
				        	// }
				        // });
	                         // // res.redirect('../checkout');
	                    // }
// 	 
               // });
          //}
          /* IF INCORRECT PASSOWORD WAS GIVEN RENDER LOGIN PAGE WITH ERROR MESSAGE*/
          //else{
            //  res.render('user/login',{error: 'Incorrect Password'});
         // }
     // };


 var stateList = [

		{
			"state" : "AL"
		},
		{
			"state": "AK"
		},
		{
			"state": "AZ"
		},
		{
			"state": "AR"
		},
		{
			"state": "CA"
		},
		{
			"state": "CO"
		},
		{
			"state": "CT"
		},
		{
			"state": "DE"
		},
		{
			"state": "DC"
		},
		{
			"state": "FL"
		},
		{
			"state": "GA"
		},
		{
			"state": "HI"
		},
		{
			"state": "ID"
		},
		{
			"state": "IL"
		},
		{
			"state": "IN"
		},
		{
			"state": "IA"
		},
		{
			"state": "AK"
		},
		{
			"state": "AZ"
		},
		{
			"state": "AR"
		},
		{
			"state": "CA" 
		},
		{
			"state": "CO"
		},
		{
			"state": "CT"
		},
		{
			"state": "DE"
		},
		{
			"state": "DC"
		},
		{
			"state": "FL"
		},
		{
			"state": "GA"
		},
		{
			"state": "HI"
		},
		{
			"state": "ID"
		},
		{
			"state": "IL"
		},
		{
			"state": "IN"
		},
		{
			"state": "IA"
		},
		{
			"state": "KS"
		},
		{
			"state": "KY"
		},
		{
			"state": "LA"
		},
		{
			"state": "ME"
		},
		{
			"state":"MD"
		},
		{
			"state": "MA"
		},
		{
			"state": "MI"
		},
		{
			"state": "MN"
		},
		{
			"state": "MS"
		},
		{
			"state": "MO"
		},
		{
			"state": "MT"
		},
		{
			"state": "NE"
		},
		{
			"state": "NV"
		},
		{
			"state": "NH"
		},
		{
			"state": "NJ"
		},
		{
			"state": "NM"
		},
		{
			"state": "NY"
		},
		{
			"state": "NC"
		},
		{
			"state": "ND"
		},
		{
			"state": "OH"
		},
		{
			"state": "OK"
		},
		{
			"state": "OR"
		},
		{
			"state": "PA"
		},
		{
			"state": "RI"
		},
		{
			"state": "SC"
		},
		{
			"state": "SD"
		},
		{
			"state": "TN"
		},
		{
			"state": "TX"
		},
		{
			"state": "UT"
		},
		{
			"state": "KS"
		},
		{
			"state": "KY"
		},
		{
			"state": "LA"
		},
		{
			"state": "ME"
		},
		{
			"state": "MD"
		},
		{
			"state": "MA"
		},
		{
			"state": "MI"
		},
		{
			"state": "MN"
		},
		{
			"state": "MS"
		},
		{
			"state": "MO"
		},
		{
			"state": "MT"
		},
		{
			"state": "NE"
		},
		{
			"state": "NV"
		},
		{
			"state": "NH"
		},
		{
			"state": "NJ"
		},
		{
			"state": "NM"
		},
		{
			"state": "NY"
		},
		{
			"state": "NC"
		},
		{
			"state": "ND"
		},
		{
			"state": "OH"
		},
		{
			"state": "OK"
		},
		{
			"state": "OR"
		},
		{
			"state": "PA"
		},
		{
			"state": "RI"
		},
		{
			"state": "SC"
		},
		{
			"state": "SD"
		},
		{
			"state": "TN"
		},
		{
			"state": "TX"
		},
		{
			"state": "UT"
		},
		{
			"state": "VT"
		},
		{
			"state": "VA"
		},
		{
			"state": "WA"
		},
		{
			"state": "WV"
		},
		{
			"state": "WI"
		},
		{
			"state": "WY"
		}
]

