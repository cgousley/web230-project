module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
    	
    	if(req.session.success && req.session.user){
				 res.render('user/viewcart',{title: 'Shopping Cart - View Cart', heading: 'View Cart', cart: true, productDescriptions: true, userHead: true});
           	}
  
           	else{
           		 res.render('user/viewcart',{title: 'Shopping Cart - View Cart', heading: 'View Cart', nav: true, productDescriptions: true, userHead: true});
           	}
          
 	}
};