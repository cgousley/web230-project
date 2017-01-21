/*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
var userModel = require('../../models').Users;
var fs = require('fs');
var js = '<script src="/public/js/Ajax.js"></script>';
js += '<script src="/public/js/main.js"></script>';

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE REGISTER PAGE*/
    index: function(req, res){
          res.render('user/register',{title: 'Shopping Cart - Registration', heading: 'Register Page', nav: true, state: stateList, userHead: true, ackMessage: true});
 	},
 	
registerUser: function(req, res){
	     	var data = JSON.parse(req.body.data);
		
        		
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
										console.log(err);
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
