var userModel = require('../../models').Users;
var ordersModel = require('../../models').Orders;
var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
	
	// Checkout Page First load
	index: function(req, res, input){

		// Is the Person logged in already? If so, load the checkout page
		if(req.session.success && req.session.user){
			res.render('user/checkout',{title: 'Shopping Cart - Checkout', heading: 'Checkout Page', cart: true, userHead: true, ackMessage: true}
			);
		}
	
		// If person is not logged in, redirect to login
		else {
			res.redirect('../../login');
		}
	},
 
	//This sends address stored in session object to user
	//commented out section sends it as cookie
	 loadAddress: function(req,res){
		// var data = req.body.data;
		// data = JSON.parse(data);
		// var _id = new ObjectId(data);

		// userModel.find({"_id": new ObjectId(data)}).
		// select({fname: 1, lname: 1, address: 1, city: 1, state: 1, zip: 1, _id: 0}).
		// exec(function(err, user){
			// if (err){
				// console.log(err);
			// }
			// else{
				// res.send(user);
			// }
		// })

		console.log(JSON.stringify(req.session.user));
		// console.log(JSON.parse(req.session.user));

		// var addressData = JSON.parse(res.responseText);

		// console.log(JSON.stringify(req.session.user));
		res.send(req.session.user);

	}, 

	
	// This completes the checkout
	completeCheckout: function(req,res){
		var data = req.body.data;
		data = JSON.parse(data);

		var customerOrder = {};


		//separates customer order into order info and item infos
		customerOrder.orderInfo = data[0].orderInfo;
		customerOrder.itemInfo = data[0].itemInfo;

		ordersModel.collection.insert(customerOrder, onInsert);

		function onInsert(err, docs) {
			if (err) {
				res.send('error');
			}
			else {
				res.send('success');
			}
		}
	} 


}
