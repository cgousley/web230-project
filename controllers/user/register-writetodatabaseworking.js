/*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
var userModel = require('../../models').Users;


module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
          res.render('user/register',{title: 'Shopping Cart - Registration', heading: 'Home Page', nav: true, state: stateList, errorMessage: true, userHead: true});
 	},
 	
 	/*THIS IS CALLED THEN THEY CLICK THE "ACCESS ADMIN AREA BUTTON"*/
     registerUser: function(req, res){
     	
          
         //if(req.body.password === 'ASDFasdf1!'){
         	
               req.session.regenerate(function(err){
                    if(err){
                         console.log(err)
                    }
                    /*IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY AND REDIRECT TO ADMIN HOME PAGE*/
                    else{
                         req.session.success = 'access approved';
                         var data = JSON.stringify(req.body);
                         data = JSON.parse(data);
    	
	    				/* NEED TO PUT DATA INTO A NAMEMODEL OBJECT AND THEN SAVE IT */
				    	var user = new userModel(data);
				        user.save(function(err){
				        	if(err){
				        		console.log(err);
				        	}
				        	else{
				        		 res.render('user/checkout', {title: 'Shopping Cart - Checkout', heading: 'Home Page', nav: true, userHead: true});
				        	}
				        });
	                         // res.redirect('../checkout');
	                    }
	 
               });
          //}
          /* IF INCORRECT PASSOWORD WAS GIVEN RENDER LOGIN PAGE WITH ERROR MESSAGE*/
          //else{
            //  res.render('user/login',{error: 'Incorrect Password'});
         // }
     },
} 	
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