var userModel = require('../../models').Users;
var ordersModel = require('../../models').Orders;
var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
	
	// Checkout Page First load
		index: function(req, res, input){
			// var url = require("url");
			// var url_parts = url.parse(req.url, true);
			// var query = url_parts.query;


	// Is the Person logged in already? If so, load the checkout page
		if(req.session.success && req.session.user){
			res.render('user/checkout',{title: 'Shopping Cart - Checkout', heading: 'Checkout Page', cart: true, userHead: true, ackMessage: true}
		);
		
		// data={};
		// data.page = '<div id="wrapper" class="container"><div class="row"><div class="container"><div class="row"> <div class="col-md-6 col-sm-7 col-xs-10"> <h1>Shopping Cart - Checkout</h1> </div><div id="cartStatus" class="col-md-1 col-md-push-5 col-sm-2 col-sm-push-3 col-xs-2"><span id="cartCount"></span><i class="glyphicon glyphicon-shopping-cart"></i> </div></div></div><div class="container"><div class="navbar navbar-inverse"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div><div class="collapse navbar-collapse"> <ul class="nav navbar-nav"> <li><a href="/">Home</a></li><li><a href="viewcart">View Cart</a></li><li><a href="/checkout">Checkout</a></li><li><a href="logout">Logout</a></li></ul> </div></div></div></div><main><div class="container"><div class="text-left"><h1 class="">Home Page</h1><p class="lead">This is the checkout page. If you want to make changes to your cart go back to the <a class="" href="viewcart">view cart page</a> and edit your cart there.</p></div><div class="row"><form class="" role="form form-inline" action="order-complete" method="post"><div class="col-md-6"><h1 class="" id="checkoutName"></h1><h1 class="" id="checkoutAddress1"></h1><h1 class="" id="checkoutAddress2"></h1></div><div class="col-md-6"><div class="form-group"><label class="" for="credit">Credit Card Number:</label><i data-toggle="popover" title="Field error" data-content="Field name cannot be blank and is not in Credit card format." data-placement="right" class="fa fa-exclamation-circle checkError" aria-hidden="true" style="display: none;"></i><input class="form-control hasError" id="credit" name="credit" placeholder=""></div><div class="form-group"><label class="" for="ccv">CCV Number:</label><i data-toggle="popover" title="Field error" data-content="Field name cannot be blank and is not in ccv format." data-placement="right" class="fa fa-exclamation-circle checkError" aria-hidden="true" style="display: none;"></i><input class="form-control hasError" id="ccv" name="ccv"></div><div class="form-group"><label class="" for="exp">Expiration Date:</label><i data-toggle="popover" title="Field error" data-content="Field name cannot be blank and is not in MM/DD/YYYY format." data-placement="right" class="fa fa-exclamation-circle checkError" aria-hidden="true" style="display: none;"></i><input class="form-control hasError" type="text" name="exp" id="exp" placeholder="mm/dd/yyyy" value=""></div></div><button type="submit" id="completeCheckout" class="btn btn-primary">Complete Checkout</button></form></div><div id="checkoutTableHere"><table class="table table-striped"><thead><tr><th>Product Name</th><th>Price Each</th><th>Amount</th><th>Total Price</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table></div></div></main><footer> <hr> <div class=" container text-right align-bottom"> <p>Shopping Cart | © Copyright 2016, All Rights Reserved</p></div></footer></div></div><script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script><script src="/public/js/vendor/bootstrap.min.js"></script><script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> <script>window.jQuery || document.write("<script src="/public/js/vendor/jquery-1.11.2.min.js"></script>")</script> <script src="/public/js/vendor/bootstrap.min.js"></script> <script src="/public/js/plugins.js"></script> <script src="/public/js/Ajax.js"></script> <script src="/public/js/main.js"></script> <script>(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date; e=o.createElement(i);r=o.getElementsByTagName(i)[0]; e.src=""//www.google-analytics.com/analytics.js"; r.parentNode.insertBefore(e,r)}(window,document,"script","ga")); ga("create","UA-XXXXX-X","auto");ga("send","pageview"); </script> <script>$(function (){$("[data-toggle="popover"]").popover({trigger: "hover"});})</script> <div class="modal" id="ackMessage" role="dialog"> <div class="modal-dialog modal-sm"> <div class="modal-content"> <div class="modal-header modal-success-color"> <h1 class="modal-title"></h1> </div><div class="modal-body"> <p class="errorDescription"></p></div><div class="modal-footer"> <button type="button" id="cancel" class="btn btn-danger pull-left"> Cancel </button> <button type="button" id="ok" class="btn btn-success pull-left"> Okay </button> </div></div></div></div>';				// res.send(data);		
		
		}
	
	// If person is not logged in, redirect to login
		else {
			res.redirect('../../login');
 		}
 },
 
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

completeCheckout: function(req,res){
	var data = req.body.data;
	data = JSON.parse(data);
	
	var customerOrder = {};
					
					customerOrder.orderInfo = data[0].orderInfo;
										
					customerOrder.itemInfo = data[0].itemInfo;
					console.log(customerOrder.itemInfo);
					console.log(customerOrder.orderInfo);

ordersModel.collection.insert(customerOrder, onInsert);

function onInsert(err, docs) {
    if (err) {
        res.send('error');
    } else {
        res.send('success');
    }
}

 } 


}