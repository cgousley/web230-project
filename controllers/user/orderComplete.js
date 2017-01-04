module.exports = {
	// This provides the content for the orders complete page
	index: function(req, res){
          req.session.destroy(function(err){
               if(err){
                    console.log(err);
               }
               else{
                    
                   res.render('user/orderComplete',{title: 'Shopping Cart - Orders Complete', heading: 'Orders Complete', nav: true, userHead: true});
               }
          });
     }
};