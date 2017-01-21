module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
    	// If user logged in, load view cart page with shopping cart nav bar
    	if(req.session.success && req.session.user){
				 res.render('user/viewcart',{title: 'Shopping Cart - View Cart', heading: 'View Cart', cart: true, productDescriptions: true, userHead: true});
           	}
  		// If user not logged in, load home page with standard nav bar
           	else{
           		 res.render('user/viewcart',{title: 'Shopping Cart - View Cart', heading: 'View Cart', nav: true, productDescriptions: true, userHead: true});
           	}
          
 	}
};
