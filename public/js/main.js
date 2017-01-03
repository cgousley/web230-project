/*
 *  ASCII Section Heading Generator found here: 
 * 
 * 	http://patorjk.com/software/taag/#p=display&h=3&v=0&c=c&f=Small&t=Type%20Something%20
 *
 * this will need edits
 * here's an edit
 */

//this is a comment on the local master prior to merging edit js branch 
//gets submit element if present and adds click event to it
op = {};
var productDetails = [];

// This creates the box object, which when data is dropped into, creates a cart item 
var box = function(_id, price, image, name, description, newCount) {
	this.image = image;
	this.description = description;
	this.name = name;
	this.price = price;
	this.quantity = 1;
	this._id = _id;
	  
};	

// This creates the data object for sending info to the server  
//var data={};


/***
 *      ___ _            _     _  _             
 *     / __| |_ __ _ _ _| |_  | || |___ _ _ ___ 
 *     \__ |  _/ _` | '_|  _| | __ / -_| '_/ -_)
 *     |___/\__\__,_|_|  \__| |_||_\___|_| \___|
 *                                              
 *      ___        _      _                     
 *     / __|__ _ _(_)_ __| |_ ___               
 *     \__ / _| '_| | '_ |  _(_-<               
 *     |___\__|_| |_| .__/\__/__/               
 *                  |_|                         
 */


op.init = function() {
	 
	
	// Fills cart counter in upper right hand corner
	if (document.getElementById('cartCount')){
		
		// if no count is found in Local Storage, set to ZERO
		if (localStorage.getItem('countInCart') == undefined){
			
			document.getElementById('cartCount').innerHTML = 0;
			
	}
		// else, set counter to equal local storage count
		else{
			
			var count = JSON.parse(localStorage.getItem('countInCart'));
			
			document.getElementById('cartCount').innerHTML = count;
		}
	
	};	
	
	
	// if product select dropdown is present, query database based on selection
	// Appears on Update Products, Add Products,  page, 
	if (document.getElementById('productSelect')){
		
		document.getElementById('productSelect').addEventListener('change', op.getDropDownData, false);//ends the event listener on product select
	
	};
	
	
	// if user selection dropdown is present, (like on View Customer Orders), query database based on selection
	if (document.getElementById('userSelect')){
		
		document.getElementById('userSelect').addEventListener('change', op.getDropDownData, false);
	
	};
		
	
	// Add Group page actions start here
	if (document.getElementById('newGroupName')){
		
		// Assigns click event to submit button - on click, runs addGroupNow	
		document.getElementById('submitAddGroup').addEventListener('click', op.addGroupNow, false);
	
	};
	
	
	// View cart page actions start here
	if (document.getElementById('tableHere')){
		
		// check to see if products in cart, then proceed further
		op.checkCartIfEmpty();
		  		
	};		
	
	
	// Login page acctions start here
	if (document.getElementById("submitLogin")) {
		
		document.getElementById("submitLogin").addEventListener("click", op.loginVal, false);
		
	};
	
	
	// Add product actions start here
	if (document.getElementById("submitAddProduct")){
		
		document.getElementById("submitAddProduct").addEventListener("click", op.addProductVal, false);
	
	};	
	
	
	// Submit registration actions start here	
	if (document.getElementById("submitRegister")){
			
		document.getElementById("submitRegister").addEventListener("click", op.regVal, false);
	
	};
	
	
	// Checkout page actions start here
	if (document.getElementById("completeCheckout")){
		
		op.loadCheckoutContent();
		
	}
	
	
	// Order complete actions Start here 
	if (document.getElementsByClassName('ThankYouForYourOrder')[0]){
	
		// delete local storage items and set cart counter to ZERO	
		localStorage.removeItem('cart');
		localStorage.removeItem('countInCart');
		localStorage.removeItem('newCart');
		localStorage.removeItem('sessID');
		document.getElementById('cartCount').innerHTML = "0";
	
	};
	

};


// Gets data from dropdown list and queries database
op.getDropDownData = function (){

	// document.getElementById('productTable').innerHTML = "Getting Product Data...";

			
		// creates the data variable to pass to server
		var data = {};
		// places value of selection into data.group
		data.group_id = this.value;
		// stringifies data to send to server	        
		data = JSON.stringify(data);
		
		// Checks to see is there is a hidden image path field
		// Refer to "Multiple Pages Sctipts" section
		op.checkForPath(data);
	
		// if product table on home page
		if (document.getElementById('productTable')){
			
			// if the default option is selected, don't load table
			if (document.getElementById('defaultOption').selected == true){
		
				document.getElementById('productTable').innerHTML = "";
		
				}
	
			// else, load the table
			else {
			
				document.getElementById('productTable').innerHTML = "<p class='lead'>Getting Product Data...</p>";
			
				//send for product table info	  		
				Ajax.sendRequest('/home', op.homeTableMaker, data);

			}
		
		}
		
		
		// if user table on home page
		if (document.getElementById('userTable')){
			
			// if the default option is selected, don't load table
			if (document.getElementById('defaultOption').selected == true){
		
				document.getElementById('userTable').innerHTML = "";
		
				}
	
			// else, load the table
			else {
		
				document.getElementById('userTable').innerHTML = "<p class='lead'>Getting User Data...</p>";
				
				//send for product table info	  		
				Ajax.sendRequest('/admin/checkOrders', op.checkOrdersTableMaker, data);
				
			}

		}; 	/* end Home Page product table send and retrieve*/	

		// if product table on update product page
		if (document.getElementById('updateProductTable')){
			
			// if the default option is selected, don't load table
			if (document.getElementById('defaultOption').selected == true){
		
				document.getElementById('updateProductTable').innerHTML = "";
		
				}
	
			// else, load the table
			else {
				
				// if the default option is selected, don't load table
				document.getElementById('updateProductTable').innerHTML = "<p class='lead'>Getting Product Data...</p>";

				//send for product table info	  		
	  	   		Ajax.sendRequest('/admin/updateProduct', op.updateTableMaker, data);
			
			}
		
		}

	};




/***
 *      _  _                 ___               
 *     | || |___ _ __  ___  | _ \__ _ __ _ ___ 
 *     | __ / _ | '  \/ -_) |  _/ _` / _` / -_)
 *     |_||_\___|_|_|_\___| |_| \__,_\__, \___|
 *                                   |___/     
 *      ___        _      _                    
 *     / __|__ _ _(_)_ __| |_ ___              
 *     \__ / _| '_| | '_ |  _(_-<              
 *     |___\__|_| |_| .__/\__/__/              
 *                  |_|                        
 */
//THis is for the User Home page product table loaders
op.homeTableMaker = function(req){
	  	
  	//on callback, fills table with retrieved data.
  		var productTable = document.getElementById('productTable');
  		productTable.innerHTML = req.responseText;
    	productTable.style.display = "block";
	  	    	
    	// assigns click event to table and uses event delegation to update cart and display product modal
    	productTable.firstElementChild.addEventListener('click', op.homeDescribeOrAddCart, false);
	  	    	
};

// Generates description modal or adds/modifies cart  
op.homeDescribeOrAddCart = function(e){
  	    	
	// If clicked button says "Description"
	if (e.target.innerHTML === "Description"){
			
			// Grabs table row that contains area clicked, traverses DOM to grap product info hidden in table
			var tr = e.target.parentNode.parentNode;
			
			// Gets image path from displayed image and adds it to the modal	
			document.getElementById('modalImage').src = tr.firstElementChild.firstElementChild.src;
			
			// Gets product name from table and adds it to the modal
			document.getElementsByClassName('productName')[0].innerText = tr.firstElementChild.nextSibling.innerText;
			
			// Gets product price from table and adds it to the modal
 			document.getElementsByClassName('productPrice')[0].innerText = "Price "+tr.firstElementChild.nextSibling.nextSibling.innerText;
			
			// Gets product description from table and adds it to the modal
   			document.getElementsByClassName('productDescription')[0].innerText = tr.firstElementChild.firstElementChild.alt;

			// Displays  modal	  	    			
   			document.getElementById('productDescription').style.display = "block";

			// Assigns Click event to close modal button. Closes modal and removes event listener
			document.getElementById("closeModal").addEventListener('click', function(){
				
				document.getElementById("closeModal").removeEventListener;
				document.getElementById('productDescription').style.display = "none";
    				
			});	  	    			
    				 
};
   	
   	// If clicked button says "Add to Cart"
   	if (e.target.innerHTML === "Add to Cart"){
   		
   		
   		// Checks cart contents and then adds to cart
		addToCart = function(_id, price, image, description, name){
			
			// creates new item based off of box object		
			var item = new box(_id, price, image, name, description);
			
			//creates localstorage cart if not present. If it is present, then it skips
			if (localStorage.getItem('cart') == undefined){
				
				var cart = [];
				
				localStorage.setItem('cart', JSON.stringify(cart));
				
				var countInCart = 0;
				
				localStorage.setItem('countInCart', JSON.stringify(countInCart));
			};
			
			
			//grabs cart
			var cart = JSON.parse(localStorage.getItem('cart'));
			
			//checks to see if item is in the cart already
			indexOf = function(_id){
				var len = cart.length;

				// If cart is empty, return -1
				if(len == 'undefined'){
						return -1;
					}
				
				// if not empty....
				else{
					for (i = 0; i < len; i++){
						// ...then search cart for matching _id.
						if (cart[i]._id === _id){
							
							// If matching _id is found, (aka item is in cart), return the itteration/index number, i 							
							return i;
						}
					}
						// If no matching _id found (aka not in cart), return -1
						return -1;
					}
			};

		
			//based on return of indexOf, either pushes item into cart or adds to quantity  
			if (indexOf(_id) == -1){// If not in list or list empty, push into cart array and set cart back into Local Storage.
				cart.push(item);
				localStorage.setItem('cart', JSON.stringify(cart));
			}
			else{ // if i (0 or greater) is returned, find [i] item in array and increase count by one. Then set cart back into Local Storage. 
				
				cart[indexOf(_id)].quantity += 1;
				
				localStorage.setItem('cart', JSON.stringify(cart));
			
			};
			
			
			// loop through cart and add all quantities together
			newCountInCart = function(){
				var len = cart.length;
				
				var count = 0;
				
				for (i = 0; i<len; i++){
					count += cart[i].quantity;
				};
				
			
				// set answer to countInCart in local storage and the cart count icon in upper right corner 			
				document.getElementById('cartCount').innerHTML = count;
				localStorage.setItem('countInCart', JSON.stringify(count));
			
			};
			
			//updates cart icon with cart count
			newCountInCart();
			
			localStorage.setItem('cart', JSON.stringify(cart));

};
				
		// gets product info and inputs it into function addToCart
   		op.homeGetProductInfo = function(){
   			
   			var tr = e.target.parentNode.parentNode;
   			// Gets image path from displayed image and adds _id							  	    			
			var _id = tr.firstElementChild.firstElementChild.id;
   			// Gets product name from table and adds it to name
			var name = tr.firstElementChild.firstElementChild.alt;
   			// Gets product price from table and adds it to price
 			var price = tr.firstElementChild.nextSibling.nextSibling.innerText;
   			// Gets product description from table and adds it to description
   			var description = tr.firstElementChild.nextSibling.innerText;
			// Gets image path from displayed image and adds it to image							  	    			
			var image = tr.firstElementChild.firstElementChild.src;

	  	   		addToCart(_id, price, image, name, description);
			
			};
			

				// Add cart starts here
				op.homeGetProductInfo();
    				 
   	}
	  	   	
};

/* end USER HOME PAGE SCRIPTS */ 





/***
 *     __   ___               ___          _   
 *     \ \ / (_)_____ __ __  / __|__ _ _ _| |_ 
 *      \ V /| / -_\ V  V / | (__/ _` | '_|  _|
 *       \_/ |_\___|\_/\_/   \___\__,_|_|  \__|
 *                                             
 *      ___        _      _                    
 *     / __|__ _ _(_)_ __| |_ ___              
 *     \__ / _| '_| | '_ |  _(_-<              
 *     |___\__|_| |_| .__/\__/__/              
 *                  |_|                        
 */


// If cart is empty, prompt user to return to home page and add products
// Else, run op.viewCartTableMaker
op.checkCartIfEmpty = function(){

	var tableHere = document.getElementById('tableHere');
		
	if (document.getElementById('cartCount').innerHTML == 0){
			
		tableHere.innerHTML = "";
			
		document.querySelector("p.lead").innerHTML = 'You have nothing in your cart. Please return to <a href="/">HOME</a> to add items.';
			
		document.querySelector("button#viewCartCheckOut").style.display = "none";		
	}
	
	else{
			
		op.viewCartTableMaker();
			
	}		
};

// Generates view cart table
op.viewCartTableMaker = function(){
		
	//on callback, fills table with retrieved data.
	if(localStorage.getItem('cart') !== undefined){
		var cart = JSON.parse(localStorage.getItem('cart'));
			
		var len = cart.length;
		var table = '<table class="table table-striped">';
		table += '<thead><tr><th>Image</th><th>Product Name</th><th>Price</th><th>Amount</th><th>Description</th><th>Update</th></tr></thead>';
		table+='<tbody>';
			 
		for (i = 0; i<len; i++){
			table += '<tr>';
			table += '<td><img src="'+cart[i].image+'"alt="'+cart[i].description+'"id="'+cart[i]._id+'"height="150"/></td>';
			table += '<td>'+cart[i].name+'</td>';
			table += '<td>'+cart[i].price+'</td>';
			table += '<td><input type="text" class="form-control" value="'+cart[i].quantity+'"></td>';
			table += '<td><button type="button" class="btn btn-primary">Description</button></td>';
			table += '<td><button type="button" class="btn btn-success">Update</button></td>';
			table +='</tr>';							
		}
				
		table+='</tbody>';
		table+='</table>';
				
		tableHere.innerHTML = table;//JSON.stringify(cart);
		
		document.querySelector("p.lead").innerHTML = 'To Remove an item from your cart, set the amount to zero and click the "Update" button.';
	}  
	
	// assigns click event to table and uses event delegation to update cart and display product modal
	tableHere.firstElementChild.addEventListener('click', op.viewCartDescribeOrUpdate, false);
	  	    	
};

// Generates description modal or adds/modifies cart    
op.viewCartDescribeOrUpdate = function(e){
  	
  	// If clicked button says "Description"    		
	if (e.target.innerHTML === "Description"){
		
		// Grabs table row that contains area clicked, traverses DOM to grap product info hidden in table
		var tr = e.target.parentNode.parentNode;
		
		// Gets image path from displayed image and adds it to the modal							  	    			
		document.getElementById('modalImage').src = tr.firstElementChild.firstElementChild.src;
		
		// Gets product name from table and adds it to the modal
		document.getElementsByClassName('productName')[0].innerText = tr.firstElementChild.nextSibling.innerText;
		
		// Gets product price from table and adds it to the modal
		document.getElementsByClassName('productPrice')[0].innerText = "Price "+tr.firstElementChild.nextSibling.nextSibling.innerText;
		
		// Gets product description from table and adds it to the modal
		document.getElementsByClassName('productDescription')[0].innerText = tr.firstElementChild.firstElementChild.alt;

		// Displays  modal	  	    			
		document.getElementById('productDescription').style.display = "block";

		// Assigns Click event to close modal button. Closes modal and removes event listener
		document.getElementById("closeModal").addEventListener('click', function(){
			
			document.getElementById("closeModal").removeEventListener;
			
			document.getElementById('productDescription').style.display = "none";
				
		});	  	    			
	  	    				 
   };
	
	// If clicked button says "Update"  	   	
   	if (e.target.innerHTML === "Update"){
		
		// Checks cart contents and then adds to cart
		addToCart = function(_id, newCount){
					
			// Grabs cart from local storage
			var cart = JSON.parse(localStorage.getItem('cart'));
			
			// Finds item in cart and returns index i
			indexOf = function(_id, cart){
				
				var len = cart.length;
				
				for (i = 0; i<len; i++){
					
					if(_id == cart[i]._id){
					
						return i;
					};
				};
			};

			var index = indexOf(_id, cart);

			// If new count is 0, delete from cart
			if (newCount == 0){
				
				cart.splice(index, 1);
			
			}
			
			// If new count is not a number, set count to 1
			else if (/\D/.test(newCount) == true){
				
				cart[index].quantity = parseInt(1);
			
			}
			
			// If new count is a number and greater than zero, update count to new count
			else{
				
				cart[index].quantity = parseInt(newCount);
			
			};
			
			// adds all counts and updates countInCart in local storage and cart count in upper right corner 		
			newCountInCart = function(_id, newCount){
				
				var len = cart.length;
						
				var sum = 0;
						
				for (i = 0; i<len; i++){
				
					sum += cart[i].quantity;
				
				};
					
				document.getElementById('cartCount').innerHTML = sum;
				localStorage.setItem('countInCart', JSON.stringify(sum));
			
			};

			localStorage.setItem('cart', JSON.stringify(cart));

			//updates cart icon with cart count
			
			newCountInCart();
					
			op.checkCartIfEmpty();

		};
						
   		// gets product info and inputs it into function addToCart
   		getProductInfo = function(){
	  	   			
   			var tr = e.target.parentNode.parentNode;
			
			// Gets id displayed from the image to update the cart						  	    			
			var _id = tr.firstElementChild.firstElementChild.id;
			
			// Gets product ammount from table to update the cart
   			var newCount = tr.firstElementChild.nextSibling.nextSibling.nextSibling.firstElementChild.value;

  	   		addToCart(_id, newCount);

		};

		
		
		
		// Add to cart starts here
		getProductInfo();

	};
};




/***
 *      _             _          
 *     | |   ___ __ _(_)_ _      
 *     | |__/ _ / _` | | ' \     
 *     |____\___\__, |_|_||_|    
 *              |___/            
 *      ___        _      _      
 *     / __|__ _ _(_)_ __| |_ ___
 *     \__ / _| '_| | '_ |  _(_-<
 *     |___\__|_| |_| .__/\__/__/
 *                  |_|          
 */

// Validate login 		
op.loginVal = function(evt){	
		
	// if (submitPost.name == "login") {
	var willSubmit = true;
	var inputs = document.querySelectorAll(".hasError"); //grabs all the inputs that have error functions
	var num2check = inputs.length; //gets the number of errorable inputs
	var inputs2check = []; //creates empty array to hold errorable input values
	
	for (i = 0; i < num2check; i++){ //gathers all errorable inputs and places them in array
		inputs2check.push(inputs[i].value);
	}
		
	var alerts4inputs = document.querySelectorAll(".loginError"); //gathers all alert icons
				
	var regex = [
		/^[\w.]+[@]([\w]+[.])+((com)|(org)|(edu)|(net)|(biz)|(uk)|(ru)|(me)|(co)|(info)|(gov)|(mil)(ca))$/gi, //Email
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^.])(?=.*[!@#$%^&*]).{8,10}$/gi, //Password: 8-10 of ALPHA alpha num !@#$%^&*
	];
	
	var i = 0;
		
	
	
	do {//Validates all inputs against regex rules
		
		if (regex[i].test(inputs2check[i])){ //if pass, alert icon remains hidden
				alerts4inputs[i].style.display = "none";
		}
	
		else {//if fail, alert icon appears
			evt.preventDefault();//prevents from submittal
			alerts4inputs[i].style.display = "inline-block";
		}
	
	i++;
	
	}	while (i < num2check);
	// end of do
		
		
	// Checks to see if any alerts have fired.
	// If yes, then willSubmit = false;
	for (i = 0; i < alerts4inputs.length; i++){
		
		if (alerts4inputs[i].style.display == "inline-block"){
			willSubmit = false;
			return false;
	}
	
	}


	// Checks willSubmit. if not false, SUBMIT FORM
	if (willSubmit !== false){
		op.submitLogin(evt);
	}
	else{
			evt.preventDefault();
		}
		
};	

// If validation clears, then submit 		
op.submitLogin = function(evt){
	evt.preventDefault();



	// Grabs login details and places in loginInfo JSON object
	var loginInfo = {};
	loginInfo.email = document.getElementById('loginEmail').value.toLowerCase();
	loginInfo.password = document.getElementById('loginPassword').value;
	
	loginInfo = JSON.stringify(loginInfo);
	
	// alert(loginInfo);

	// If login is for user checkout
	//Sends JSON to server via AJAX, and waits for feedback
	if (document.getElementById('submitLogin').innerHTML === "Login and Proceed to Checkout") {
		// alert("hello");
	Ajax.sendRequest('/login', function(res){
		//IF ERROR DISPLAY GENERIC MESSAGE
		if(res.responseText === 'user not found'){
			op.ackMsg("Sorry, user account wasn't found. Username or password was incorrect.", 'Error', 'red', true, true, false);
			document.getElementById('ok').addEventListener('click', function(){
				document.getElementById('ok').removeEventListener('click', function(){}, false);
				op.ackMsg('', '', '', false);
			});
		}

		//IF NOT ERROR THEN STATE FILE SAVE WAS SUCCESSFUL
		else{ //if (res.responseText === 'user found')
			window.location.reload();
		}
	}, loginInfo, false);
	
}

	//SEND AJAX REQUEST//
	if (document.getElementById('submitLogin').innerHTML === "Access Admin Area") {

	Ajax.sendRequest('/admin/login', function(res){
		//IF ERROR DISPLAY GENERIC MESSAGE
		if(res.responseText === 'admin not found'){
			evt.preventDefault();
			
			op.ackMsg("Sorry, Admin account wasn't found. Username or password was incorrect.", 'Error', 'red', true, true, false);
			document.getElementById('ok').addEventListener('click', function(){
				document.getElementById('ok').removeEventListener('click', function(){}, false);
				op.ackMsg('', '', '', false);
			});
		}
		//IF NOT ERROR THEN STATE FILE SAVE WAS SUCCESSFUL
		else{ //if (res.responseText === 'user found')
			window.location.reload();
		}
		
	}, loginInfo, false);
	
};
};		




	
/***
 *       ___ _           _            _   
 *      / __| |_  ___ __| |_____ _  _| |_ 
 *     | (__| ' \/ -_/ _| / / _ | || |  _|
 *      \___|_||_\___\__|_\_\___/\_,_|\__|
 *                                        
 *      ___        _      _               
 *     / __|__ _ _(_)_ __| |_ ___         
 *     \__ / _| '_| | '_ |  _(_-<         
 *     |___\__|_| |_| .__/\__/__/         
 *                  |_|                   
 */


// Checkout process starts here
op.loadCheckoutContent = function (){
	
	op.loadAddress();
	op.checkoutTableMaker();
	
};

// Loads customer address in checkout
op.loadAddress = function(){
	
	// grabs sessID from local storage and queries server (via AJAX )for matching address
	// var _id = JSON.parse(localStorage.getItem('sessID'));//from local storage
	
	// grabs sessID from cookie and queries server (via AJAX )for matching address
	var _id = JSON.parse(op.getSessID());
	_id = JSON.stringify(_id);
	
	
	Ajax.sendRequest('checkout/loadAddress', function(res){
		
		var addressData = JSON.parse(res.responseText);
		
		document.getElementById('checkoutName').innerHTML = addressData.name;
		document.getElementById('checkoutAddress1').innerHTML = addressData.address1;
		document.getElementById('checkoutAddress2').innerHTML = addressData.address2;
		
	}, _id, false);
	
};

// Generates checkout Cart and new updated shopping cart
op.checkoutTableMaker = function(){
  	// on callback, fills table with retrieved data.
  	
  	// while generating table, also generates matching cart with customer ID, quantities, totals
  	// new cart generated in object xCart

	var cart = JSON.parse(localStorage.getItem('cart'));
	
	
	//creates localstorage cart if not present. If it is present, then it skips
			if (JSON.parse(localStorage.getItem('cart') == undefined)){
				
				var cart = [];
				
				localStorage.setItem('cart', JSON.stringify(cart));
				
				var countInCart = 0;
				
				localStorage.setItem('countInCart', JSON.stringify(countInCart));
				
				document.getElementById('checkoutTableHere').innerHTML = "<h2>There are no items in your cart</h2>";
			}
			
			else if (JSON.parse(localStorage.getItem('cart'))== 0) {
				
				document.getElementById('checkoutTableHere').innerHTML = "<h2>There are no items in your cart</h2>";
				
			}
			else {
				
				
	
	
	
	
	
	var len = cart.length;
	var xCart = [{}];	//holds 
	xCart[0].itemInfo = [];
	
	var newItem = {};
	
	var grandTotal = 0;
	
	// if cart is empty, display "There are no items in your cart"
	var table = '<table class="table table-striped">';
	table += '<thead><tr><th>Product Name</th><th>Price Each</th><th>Amount</th><th>Total Price</th><th style="display: none">ID</th></tr></thead>';
	table+='<tbody>';
	
	
	 
	for (i = 0; i<len; i++){
		
		var newItem = {}; // Object to hold new product data while being processed
		
		table += '<tr>';
		table += '<td>'+cart[i].name+'</td>';
		newItem.name = cart[i].name;
		newItem._id = cart[i]._id;
		table += '<td>'+cart[i].price+'</td>';
		newItem.price = cart[i].price;
		table += '<td>'+cart[i].quantity+'</td>';
		newItem.count = cart[i].quantity;
		newItem.removed = " ";
		table += '<td>'+(parseInt(cart[i].quantity * cart[i].price)).toFixed(2)+'</td>';
		newItem.total = (parseInt(cart[i].quantity * cart[i].price)).toFixed(2);
		table += '<td style="display: none">'+cart[i]._id+'</td>';
		table +='</tr>';
		grandTotal += (parseInt(cart[i].quantity * cart[i].price));
	 	
	 	
	 	xCart[0].itemInfo.push(newItem);	// Pushes it into xCart
	}
	
	table += '<td colspan="2"></td><td>Grand Total</td><td id="grandTotal">'+grandTotal.toFixed(2)+'</td>';				
	table+='</tbody>';
	table+='</table>';

	localStorage.setItem('newCart', JSON.stringify(xCart));		//sets xcart into local storage as newCart
	
	document.getElementById('checkoutTableHere').innerHTML = table;		//JSON.stringify(cart);
	
			};
	
	
	
	

	// Assigns click event to complete checkout button
	// Also uses event delegation to update cart and display product modal
	document.getElementById('completeCheckout').addEventListener('click', op.checkoutVal, false);
	  	    	
};



// Validate login 		
op.checkoutVal = function(evt){	
		// alert(document.getElementById("exp").value);
	// if (submitPost.name == "login") {
	var willSubmit = true;
	var inputs = document.querySelectorAll(".hasError"); //grabs all the inputs that have error functions
	var num2check = inputs.length; //gets the number of errorable inputs
	var inputs2check = []; //creates empty array to hold errorable input values
	
	for (i = 0; i < num2check; i++){ //gathers all errorable inputs and places them in array
		inputs2check.push(inputs[i].value);
	}
		
	var alerts4inputs = document.querySelectorAll(".checkError"); //gathers all alert icons
				
	var regex = [
		/(([\d]{4})( ?-?)){4}/gi, //credit card number
		/^\d{3,4}$/gi, //ccv
		// /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/gi	// Date
		// /^\d{2}\/\d{2}\/\d{4}$/gi	// Date w type=text
		/^\d{4}-\d{2}-\d{2}$/gi	// Date w type=date
	];
	
	var i = 0;
		
	
	
	do {//Validates all inputs against regex rules
		
		if (regex[i].test(inputs2check[i])){ //if pass, alert icon remains hidden
				alerts4inputs[i].style.display = "none";
		}
	
		else {//if fail, alert icon appears
			evt.preventDefault();//prevents from submittal
			alerts4inputs[i].style.display = "inline-block";
		}
	
	i++;
	
	}	while (i < num2check);
	// end of do
		
		
	// Checks to see if any alerts have fired.
	// If yes, then willSubmit = false;
	for (i = 0; i < alerts4inputs.length; i++){
		
		if (alerts4inputs[i].style.display == "inline-block"){
			willSubmit = false;
			return false;
	}
	
	}


	// Checks willSubmit. if not false, SUBMIT FORM
	if (willSubmit !== false){
		op.submitCheckout(evt);
	}
	else{
			evt.preventDefault();
		}
		
};

// If validation clears, then submit 		










// Submits checkout
op.submitCheckout = function(e){
	e.preventDefault();

  	
  	// checks to see of there are items in cart
  	// if empty, alert "Can't checkout; Cart is Emmpty"
  	
  	if(document.getElementById('cartCount').innerHTML == 0){
  		
  		op.ackMsg("Sorry, you can't checkout yet.</br>Your cart is empty.", 'Error', '#F00', true, true);
		document.getElementById('ok').addEventListener('click', function(){
				document.getElementById('ok').removeEventListener('click', function(){}, false);
				op.ackMsg('', '', '', false);
		});
  		
  	}
  	else {
  	
  	// creates order info object to include with checkout submission   
	var orderInfo = {};
	
	// Adds grand total and customer ID
	orderInfo.grandTotal = document.getElementById('grandTotal').innerHTML;
	// orderInfo.customer_id = JSON.parse(localStorage.getItem('sessID'));//from Local storage
	
	orderInfo.customer_id = JSON.parse(op.getSessID());
					
	  	  
	// Gets the date.....
	getTheDate = function(){
  	  	
  	  	var date = new Date();
  	  	var month = date.getMonth();
  	  	var day = date.getDate();
  	  	var year = date.getFullYear();
  	  	var hour = date.getHours();
  	  	var minute = date.getMinutes();
  	  	var ext;
  	  	if(hour >=12){
  	  		ext = "pm";
  	  		hour = hour%12; 
  	  	}
  	  	else{
  	  		ext = "am";
  	  	}
  	  	
  	  	var timeStamp = (month+1)+'-'+day+'-'+year+' at '+hour+':'+minute+ext;
  	  	return timeStamp;
  	  	
  	 };
  	  
  	  
  	//...and adds date to orderInfo  
  	orderInfo.date = getTheDate(); 
  	  
	var xCart = JSON.parse(localStorage.getItem('newCart'));
  	   	
	
	// Adds order Info to xCart as new array 
	xCart[0].orderInfo = [];
	xCart[0].orderInfo.push(orderInfo);
	
	xCart = JSON.stringify(xCart);
	
	// Submits to server and awaits response  
	Ajax.sendRequest('checkout/completeCheckout', function(res){
		
		if (res.responseText ==="success"){
			window.location.href = "order-complete";
		}
		
	}, xCart, false);
	
	}  
	  	    		
};	




/***
 *      ___             _      _               _    _            
 *     | _ \ ___  __ _ (_) ___| |_  _ _  __ _ | |_ (_) ___  _ _  
 *     |   // -_)/ _` || |(_-<|  _|| '_|/ _` ||  _|| |/ _ \| ' \ 
 *     |_|_\\___|\__, ||_|/__/ \__||_|  \__,_| \__||_|\___/|_||_|
 *               |___/                                           
 *      ___           _        _                                 
 *     / __| __  _ _ (_) _ __ | |_  ___                          
 *     \__ \/ _|| '_|| || '_ \|  _|(_-<                          
 *     |___/\__||_|  |_|| .__/ \__|/__/                          
 *                      |_|                                      
 */


// validates the registration page
op.regVal = function(evt){
	
	var willSubmit = true;
	var inputs = document.querySelectorAll(".hasError"); //grabs all the inputs that have error functions
	var num2check = inputs.length; //gets the number of errorable inputs
	var inputs2check = []; //creates empty array to hold errorable input values
	
	for (i = 0; i < num2check; i++){ //gathers all errorable inputs and places them in array
	
		inputs2check.push(inputs[i].value);
	
	}
	
		
	var alerts4inputs = document.querySelectorAll(".regError"); //gathers all alert icons
				
	var regex = [
		/^[A-Za-z\s\-]+$/ig,//First Name: Alpha, Num, Space, Hyphen
		/^[A-Za-z\s\-]+$/ig,//Last Name: Alpha, Num, Space, Hyphen
		/^[0-9]+[A-Za-z\s\-]* ([A-Za-z\s\-]+)+[0-9A-Za-z]*$/gi,
		/^[A-Za-z\s\-]+$/ig,//City: Alpha, Num, Space, Hyphen
		/[0-9]{5}$/g,//ZIP: Five Numbers
		/(([\d]{3})|(\([\d]{3}\)))(((-)|(\s)|()))([\d]{3})(([-]|(\s)|())([\d]{4}))$/g,//Phone: (xxx) xxx xxxx or (xxx)xxxxxxx or (xxx) xxx-xxxx or xxx xxx xxxx or xxxxxxxxxx or xxx-xxx-xxxx  
		/^[\w.]+[@]([\w]+[.])+((com)|(org)|(edu)|(net)|(biz)|(uk)|(ru)|(me)|(co)|(info)|(gov)|(mil)(ca))$/gi, //Email
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^.])(?=.*[!@#$%^&*]).{8,10}$/gi, //Password: 8-10 of ALPHA alpha num !@#$%^&*  
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^.])(?=.*[!@#$%^&*]).{8,10}$/gi //Password: 8-10 of ALPHA alpha num !@#$%^&*
	];
	
	var i = 0;
		
	do {//Validates all inputs against regex rules
		
		if (regex[i].test(inputs2check[i])){ //if pass, alert icon remains hidden
				alerts4inputs[i].style.display = "none";
		}
	
		else {//if fail, alert icon appears
			evt.preventDefault();//prevents from submittal
			
			alerts4inputs[i].style.display = "inline-block";
		}
	
	i++;
	
	}	while (i < num2check);
	// End do
	
	
	if (inputs2check[7] == inputs2check[8] && inputs2check[8] !== ""){ //checks to see if both password fields match AND if confirm password field is filled
		alerts4inputs[8].style.display = "none"; //if yes to both, confirm password alert icon remains hidden
	}

	else { //if one or both above conditions fail, confirm password icon appears
		alerts4inputs[8].style.display = "inline-block";
	}
	
	
		
	for (i = 0; i < alerts4inputs.length; i++){		// Checks to see if any regex alerts have flagged. If so, var willSubmit = false
		if (alerts4inputs[i].style.display == "inline-block"){
			willSubmit = false;
			return false;
		}
	}
	
	
	if (willSubmit !== false){		// If will submit isn't false, then moves on to op.submitRegistration(evt); 
	
		op.submitRegistration(evt);
		
		
	}
};

// If validation passes, submits to server
op.submitRegistration = function(evt){
	evt.preventDefault();
		
		
		//Get the form data
	var registerInfo = {};
registerInfo.fname = document.getElementById('fname').value;
registerInfo.lname = document.getElementById('lname').value;
registerInfo.address = document.getElementById('address').value;
registerInfo.city = document.getElementById('city').value;
registerInfo.state = document.getElementById('state').value;
registerInfo.zip = document.getElementById('zip').value;
registerInfo.phone = document.getElementById('phone').value;
registerInfo.email = document.getElementById('email').value.toLowerCase();
registerInfo.password = document.getElementById('password').value;
	
	
	
	registerInfo = JSON.stringify(registerInfo);
	
//SEND AJAX REQUEST
	Ajax.sendRequest('register', function(res){
		//IF ERROR DISPLAY GENERIC MESSAGE
		if(res.responseText === 'error'){
			op.ackMsg('Sorry there was a problem registering you. Please submit again.', 'Error', '#F00', true);
			setTimeout(function(){op.ackMsg('','', '#000',false)}, 1500);
		}
		//IF NOT ERROR THEN STATE FILE SAVE WAS SUCCESSFUL
		else if (res.responseText === 'success'){
			window.location.href = '/login';
		}
		else {
			
			op.ackMsg(res.responseText, 'Error', 'red', true, true, false);
			document.getElementById('ok').addEventListener('click', function(){
				document.getElementById('ok').removeEventListener('click', function(){}, false);
				op.ackMsg('', '', '', false);
			});
		}
	}, registerInfo, false);
};





/***
 *        _       _     _      ___               _            _       
 *       /_\   __| | __| |    | _ \ _ _  ___  __| | _  _  __ | |_  ___
 *      / _ \ / _` |/ _` |    |  _/| '_|/ _ \/ _` || || |/ _||  _|(_-<
 *     /_/ \_\\__,_|\__,_|    |_|  |_|  \___/\__,_| \_,_|\__| \__|/__/
 *                                                                    
 *      ___           _        _                                      
 *     / __| __  _ _ (_) _ __ | |_  ___                               
 *     \__ \/ _|| '_|| || '_ \|  _|(_-<                               
 *     |___/\__||_|  |_|| .__/ \__|/__/                               
 *                      |_|                                           
 */

/* THE REGEX IS FOR ADDING THE RED ERROR ICONS TO THE 
 * MISSED FIELDS. I LIKE IT WITH THIS, BUT IT IS NOT 
 * SUPPOSED TO BE IN THE PROJECT SUBMISSION VERSION. 
 * SO I WILL COMMENT IT OUT FOR THE PROJECT SUBMISSION*/
/*
op.addProductVal = function(e){	
		
	var willSubmit = true;
	var inputs = document.querySelectorAll(".hasError"); //grabs all the inputs that have error functions
	var num2check = inputs.length; //gets the number of errorable inputs
	var inputs2check = []; //creates empty array to hold errorable input values
	
	for (i = 0; i < num2check; i++){ //gathers all errorable inputs and places them in array
		inputs2check.push(inputs[i].value);
	}
		
	var alerts4inputs = document.querySelectorAll(".addError"); //gathers all alert icons
				
	var regex = [
		/[\w\W]+/gi, // Product Name
		/^\d+\.\d+/gi,	// Product Price 
		/^.+(\.jpg|\.jpeg)$/, // Product Image
		/[\w\W]+/gi, // Product Name
		/[\w\W]+/gim // Product Description
		
	];
	
	var i = 0;
		
	
	
	do {//Validates all inputs against regex rules
		
		if (regex[i].test(inputs2check[i])){ //if pass, alert icon remains hidden
				alerts4inputs[i].style.display = "none";
		}
	
		else {//if fail, alert icon appears
			e.preventDefault();//prevents from submittal
			alerts4inputs[i].style.display = "inline-block";
		}
	
	i++;
	
	}	while (i < num2check);
	// end of do
	
	if (document.getElementById('defaultOption').selected == true){
		
				document.getElementsByClassName('selectError')[0].style.display = "inline-block";
				willSubmit = false;
	}
	else {
		
				document.getElementsByClassName('selectError')[0].style.display = "none";
		
		}	
		
	// Checks to see if any alerts have fired.
	// If yes, then willSubmit = false;
	for (i = 0; i < alerts4inputs.length; i++){
		
		if (alerts4inputs[i].style.display == "inline-block"){
			willSubmit = false;
			return false;
	}
	
	}


	// Checks willSubmit. if not false, SUBMIT FORM
	if (willSubmit !== false){
		op.addProduct(e);
	}
	else{
			e.preventDefault();
		}
		
}	
*/

/*THIS IS FOR THE PROJECT SUBMISSION. NO RED ALERT ICONS, JUST A POPUP*/

op.addProductVal = function(e){	
		
	var willSubmit = true;
	var inputs = document.querySelectorAll(".hasError"); //grabs all the inputs that have error functions
	var num2check = inputs.length; //gets the number of errorable inputs
	var inputs2check = []; //creates empty array to hold errorable input values
	
	for (i = 0; i < num2check; i++){ //gathers all errorable inputs and places them in array
		inputs2check.push(inputs[i].value);
	}
		
	
	var i = 0;
		
	
	
	do {//Validates all entries are filled
		
		if (inputs2check[i] === ""){ //if empty, sets willSubmit to false, then breaks
				
				var willSubmit = false;
				break;
		
		}

	i++;
	
	}	while (i < num2check);
	// end of do

// Checks to see if willSubmit is true and if the product group select has been changed. If so, SUBMIT FORM
// If not, it launches popup
	if (willSubmit !== false && document.getElementById('defaultOption').selected !== true){
		op.addProduct(e);
	}
	else{
			e.preventDefault();
			op.ackMsg('All fields must have a valid entry.', '', '#F00', true, true);
			document.getElementById('ok').addEventListener('click', asdf = function(){
				op.ackMsg('','', '', false);
				
			}, false);
		}
		
};	




op.addProduct = function(e){
	e.preventDefault();
		
	//Get the form data
	op.ackMsg('Adding Product, Please Wait...', '', '#6c6', true, false);
	// setTimeout(function(){op.ackMsg('','#000',false)}, 1500);
	
	//create new FormData object
	var formData = new FormData();
	
		
	// 	GETS PRODUCT DATA AND APPEND IT TO FORMDATA

	var pgroup = document.getElementById('productSelect').value;
	formData.append('pgroup', pgroup);

	var pname = document.getElementById('pname').value;
	formData.append('pname', pname);
	
	var pprice = document.getElementById('pprice').value;
	formData.append('pprice', pprice);
	
	var file = document.getElementById('file');
	formData.append('file', file.files[0]);
	
	var fileName = document.getElementById('file').value;
	formData.append('fileName', fileName);
	
	var filePath = document.getElementById('pimagePath').value;
	formData.append('filePath', filePath);	
	
	var pdescription = document.getElementById('pdescription').value;
	formData.append('pdescription', pdescription);
	
	
	
	// Sends formdata to database for update
	// Waits for response to activate alert message
	Ajax.sendRequest('/admin/addProduct', function(res){
		/*IF ERROR DISPLAY GENERIC MESSAGE*/
		if(res.responseText === 'error'){
			op.ackMsg('Sorry there was a problem saving the file', 'Error', '#F00', true);
			setTimeout(function(){
				op.ackMsg('','', '#000',false);
				}, 1500);
		}
		/*IF NOT ERROR THEN STATE FILE SAVE WAS SUCCESSFUL*/
		else if (res.responseText === 'success'){
			op.ackMsg('File was successfully saved!', 'Success!', '#6c6', true, true);
			/*Resets form*/
			document.getElementById('ok').addEventListener('click', asdf = function(){
				op.ackMsg('','', '', false);
				document.getElementsByTagName('form')[0].reset();
			}, false);
		}	
	}, formData, true);
};




/***
 *      _   _           _        _              ___               _            _       
 *     | | | | _ __  __| | __ _ | |_  ___      | _ \ _ _  ___  __| | _  _  __ | |_  ___
 *     | |_| || '_ \/ _` |/ _` ||  _|/ -_)     |  _/| '_|/ _ \/ _` || || |/ _||  _|(_-<
 *      \___/ | .__/\__,_|\__,_| \__|\___|     |_|  |_|  \___/\__,_| \_,_|\__| \__|/__/
 *            |_|                                                                      
 *      ___           _        _                                                       
 *     / __| __  _ _ (_) _ __ | |_  ___                                                
 *     \__ \/ _|| '_|| || '_ \|  _|(_-<                                                
 *     |___/\__||_|  |_|| .__/ \__|/__/                                                
 *                      |_|                                                            
 */

//THis is for the update product table loaders
op.updateTableMaker = function(req){
	  	
	//on callback, fills table with retrieved data.
	var productTable = document.getElementById('updateProductTable');
	productTable.innerHTML = req.responseText;
	productTable.style.display = "block";
	
	
	// assigns click event to table and uses event delegation to load update product step two
	productTable.firstElementChild.addEventListener('click', op.selectProductToUpdate, false);
	
};


op.selectProductToUpdate = function(e){
	
	// if the Update Product button is clicked, traverse the DOM and gather product information
	// Add product to data2Update object and stringify to JSON
	// Send JSON to server via AJAX, retrieve product info, and populate Product Update form. 
	if (e.target.innerHTML === "Update Product"){
		
		var tr = e.target.parentNode.parentNode;
		
		// creates the data variable to pass to server
		var data2Update = {};
	
		// Gets group_Id and fragrance from table and adds to data object
		data2Update._id = tr.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	
		// stringifies data to send to server
		data2Update = JSON.stringify(data2Update);
		
		// Sends to server. Callback is op.loadProductUpdateForm
		Ajax.sendRequest("/admin/updateThis", op.loadProductUpdateForm, data2Update);
	}
	
	// if the Delete Product button is clicked, ask admin to confirm delete
	// If confirmed, raverse the DOM and gather product information
	// Add product to data2Update object and stringify to JSON
	// Send JSON to server via AJAX to complete delete process, and populate Product Update form.
	//
	// If canceled, close message box 	
	else if (e.target.innerHTML === "Delete Product"){
	
		// This is the message
		var msg = "<p>You are about to permanently delete this file.  If this is what you want to do click 'OK', otherwise click 'Cancel'</p>";
		op.ackMsg(msg, '', "#d33", true,  false, true);
		
		
		
		// creates the data variable to pass to server
		var data2Update = {};

		// Gets group_Id and fragrance from table and adds to data object
		var tr = e.target.parentNode.parentNode;
		data2Update._id = tr.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
		data2Update.name = tr.firstElementChild.innerHTML;
		data2Update.group_id = document.getElementById('productSelect').value;
		data2Update.image_path = tr.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;

		// stringifies data to send to server
		data2Update = JSON.stringify(data2Update);
	
		// Adds click event to confirm message so we can use event delegation to tell which button is clicked
		document.getElementById('ackMessage').addEventListener("click", okOrCancel, false);
	
		// This runs the Confirm or Cancel delete message
		function okOrCancel(evt){
			
			// If "ok" (confirm) is clicked, send data to server to start delete process
			if (evt.target.id === "ok"){
				
				// Removes event listener from OK button to save memory
				document.getElementById('ackMessage').removeEventListener('click', okOrCancel, false);
	
				Ajax.sendRequest("/admin/deleteThis", function(req){
					
					if(req.responseText === "error"){
						op.ackMsg("There was a problem deleting the product", '', "#d33", true, true, false);
					}
					
					else{
						
						op.ackMsg('', '', '', false);
						
						// Reloads updated list of available products
						var productTable = document.getElementById('updateProductTable');
						productTable.innerHTML = req.responseText;
						productTable.firstElementChild.addEventListener('click', op.selectProductToUpdate);
						
					}
				}, data2Update);
	
			}
			
			// If cancel clicked, remove event listener on confirm message (to save memory), and close message 
			else if (evt.target.id === "cancel"){
				document.getElementById('ackMessage').removeEventListener('click', okOrCancel, false);
				op.ackMsg('', '','', false);
			}
		}
	}
};

// Referred to when Update Product is clicked
// Parses product info from server response and fills product update form
// Product update form is in a hidden div. This function sets it to display block, and the select product div to display none.

op.loadProductUpdateForm = function(req){
	
	// Takes data from server response... 
	var data = JSON.parse(req.responseText);
	
	
	// ...and populates product update form...
	document.getElementById('pId').value = data[0]._id;
	document.getElementById('pname').value = data[0].fragrance;
	document.querySelector('.lead').innerText = "NOTE: The group selection is to change the group for the product and not to redirect to a new product group.";
	document.getElementById('pprice').value = data[0].price;
	document.getElementById('pdescription').value = data[0].description;

	// ...then makes the Update Product dice visible...
	document.getElementById('updateProduct').style = "display: block";
	// ...then hides the Select a product to update div.
	document.getElementById('updateProductTable').style = "display: none";
	
	// As it is, if you change the select category dropdown, it reloads the select product to update table.
	// We want to remove that response, so we can select a new product category for the product
	document.getElementById('productSelect').removeEventListener('change', op.getDropDownData);

	// This enables us to use the category select to select a new category for the product  
	document.getElementById('productSelect').addEventListener('change', function getDropDownData(){
			
			
		// creates the data variable to pass to server
		var data = {};
		// places value of selection into data.group
		data.group_id = this.value;
		// stringifies data to send to server	        
		data = JSON.stringify(data);
		
	op.checkForPath(data);}, false);// op.checkForPath reloads the image path input, which is hidden. This is used to update the image folder path
									// Refer to "Multiple Pages Sctipts" section
		
	
	// When submit is clicked, adds product information to multer formData object and submits
	document.getElementById('submitUpdateProduct').addEventListener('click', op.updateProductVal, false);
	   			
	   				   			
};






op.updateProductVal = function(e){	
		
	var willSubmit = true;
	var inputs = document.querySelectorAll(".hasError"); //grabs all the inputs that have error functions
	var num2check = inputs.length; //gets the number of errorable inputs
	var inputs2check = []; //creates empty array to hold errorable input values
	
	for (i = 0; i < num2check; i++){ //gathers all errorable inputs and places them in array
		inputs2check.push(inputs[i].value);
	}
		
	var alerts4inputs = document.querySelectorAll(".addError"); //gathers all alert icons
				
	var regex = [
		/[\w\W]+/gi, // Product Name
		/^\d+\.\d+/gi,	// Product Price 
		/^$|.+(\.jpg|\.jpeg)$/, // Product Image either jpg/jpeg or blank
		/[\w\W]+/gi, // Product Name
		/[\w\W]+/gim // Product Description
		
	];
	
	var i = 0;
		
	
	
	do {//Validates all inputs against regex rules
		
		if (regex[i].test(inputs2check[i])){ //if pass, alert icon remains hidden
				alerts4inputs[i].style.display = "none";
		}
	
		else {//if fail, alert icon appears
			e.preventDefault();//prevents from submittal
			alerts4inputs[i].style.display = "inline-block";
		}
	
	i++;
	
	}	while (i < num2check);
	// end of do
	
	if (document.getElementById('defaultOption').selected == true){
		
				document.getElementsByClassName('selectError')[0].style.display = "inline-block";
				willSubmit = false;
	}
	else {
		
				document.getElementsByClassName('selectError')[0].style.display = "none";
		
		}	
		
	// Checks to see if any alerts have fired.
	// If yes, then willSubmit = false;
	for (i = 0; i < alerts4inputs.length; i++){
		
		if (alerts4inputs[i].style.display == "inline-block"){
			willSubmit = false;
			return false;
	}
	
	}


	// Checks willSubmit. if not false, SUBMIT FORM
	if (willSubmit !== false){
		op.checkForFileThenSubmit(e);
	}
	else{
			e.preventDefault();
		}
		
};	









// When submit is clicked, adds product information to multer formData object and submits
op.checkForFileThenSubmit = function(e){
	e.preventDefault();

	// alert user of process	
	op.ackMsg('Updating Product, Please Wait...', '', '#6c6', true, false);
	
	//create new FormData object
	var formData = new FormData();
	
		

	//Get the form data and append to formData Object
	
	var pId = document.getElementById('pId').value;
	formData.append('pId', pId);
	
	var pgroup = document.getElementById('productSelect').value;
	formData.append('pgroup', pgroup);

	var pname = document.getElementById('pname').value;
	formData.append('pname', pname);
	
	var pprice = document.getElementById('pprice').value;
	formData.append('pprice', pprice);
	
	var file = document.getElementById('file');
	formData.append('file', file.files[0]);
	
	var fileName = document.getElementById('file').value;
	formData.append('fileName', fileName);
	
	var filePath = document.getElementById('pimagePath').value;
	formData.append('filePath', filePath);
	
	
	var pdescription = document.getElementById('pdescription').value;
	formData.append('pdescription', pdescription);
	


/*SEND AJAX REQUEST*/
	Ajax.sendRequest('/admin/updateNow', function(res){
		/*IF ERROR DISPLAY GENERIC MESSAGE*/
		if(res.responseText === 'error'){
			op.ackMsg('Sorry there was a problem updating the product', '', '#d33', true);
			setTimeout(function(){op.ackMsg('','', '#000',false)}, 1500);
		}
		/*IF NOT ERROR THEN STATE FILE SAVE WAS SUCCESSFUL*/
		else if (res.responseText === 'success'){
			op.ackMsg('Product was successfully updated!', '', '#6c6', true, true);
			document.getElementById('ok').addEventListener('click', asdf = function(){
				op.ackMsg('','', '', false);
				window.location.href = '/admin/updateProduct';
			}, false);
		}	
	}, formData, true);
};


/***
 *        _      _    _    ___                   
 *       /_\  __| |__| |  / __|_ _ ___ _  _ _ __ 
 *      / _ \/ _` / _` | | (_ | '_/ _ | || | '_ \
 *     /_/ \_\__,_\__,_|  \___|_| \___/\_,_| .__/
 *                                         |_|   
 *      ___        _      _                      
 *     / __|__ _ _(_)_ __| |_ ___                
 *     \__ / _| '_| | '_ |  _(_-<                
 *     |___\__|_| |_| .__/\__/__/                
 *                  |_|                          
 */



// After submit is clicked, collect details, send via AJAX, and alert results 
op.addGroupNow = function(e){
	// prevent submit of form, and alert working message
	e.preventDefault();
	op.ackMsg('Adding Group, Please Wait...', '#6c6', '', true, false);
	
	// grab new group details, add to data object
	var data = {};
	data.newGroupName = document.getElementById('newGroupName').value;
	data.newGroupFolder = document.getElementById('newGroupFolder').value;
	data = JSON.stringify(data);
	
	//send new group details via AJAX	  		
    Ajax.sendRequest('/admin/addgroup', function(res){
    	
		// IF ERROR DISPLAY GENERIC MESSAGE
		if(res.responseText === 'error'){
			op.ackMsg('Sorry there was a problem adding new group', 'Error', '#F00', true);
			setTimeout(function(){op.ackMsg('','', '#000',false)}, 1500);
		}
		
		// IF NOT ERROR THEN STATE FILE SAVE WAS SUCCESSFUL
		else if (res.responseText === 'success'){
			op.ackMsg('New group was successfully added!', 'Success!', '#6c6', true, true);

			/*Resets form*/
			document.getElementById('ok').addEventListener('click', reset = function(){
				op.ackMsg('','', '', false);
				document.getElementsByTagName('form')[0].reset();
				}, false);
		}	
    	
    }, data);//end AJAX send request

};




/***
 *       ___  _              _         ___           _               
 *      / __|| |_   ___  __ | |__     / _ \  _ _  __| | ___  _ _  ___
 *     | (__ | ' \ / -_)/ _|| / /    | (_) || '_|/ _` |/ -_)| '_|(_-<
 *      \___||_||_|\___|\__||_\_\     \___/ |_|  \__,_|\___||_|  /__/
 *                                                                   
 *      ___           _        _                                     
 *     / __| __  _ _ (_) _ __ | |_  ___                              
 *     \__ \/ _|| '_|| || '_ \|  _|(_-<                              
 *     |___/\__||_|  |_|| .__/ \__|/__/                              
 *                      |_|                                          
 */

// This is loads the list of orders
// Loaded based on customer selected in user select box
op.checkOrdersTableMaker = function(req){
	
	//on callback, fills table with retrieved data.
	var userTable = document.getElementById('userTable');
	userTable.innerHTML = req.responseText;
	userTable.style.display = "block";
    	
	// assigns click event to table and uses event delegation to update cart and display product modal
	userTable.firstElementChild.addEventListener('click', op.checkOrdersSelectUserToDetail);
    	
};

op.checkOrdersSelectUserToDetail = function(e){
	
	// If the button clicked says "Details"...
	if (e.target.innerHTML === "Details"){
		
		// Gather product _id to query database
		var tr = e.target.parentNode.parentNode;

		
		// creates the data variable to pass to server
		var data = {};
		// places value of selection into data.group
		data._id = tr.firstElementChild.nextSibling.innerHTML;
		// stringifies data to send to server	        
		data = JSON.stringify(data);

		// load response into op.ordersDetailsTableMaker
		Ajax.sendRequest('/admin/checkOrders/getOrderDetails', op.ordersDetailsTableMaker, data);

   	}
};

// Loads all the products for selected customer order into modal and displays 
op.ordersDetailsTableMaker = function(req){
						
	document.querySelector('.modal-body').innerHTML = req.responseText;
	
	// Displays  modal	  	    			
	document.getElementById('orderDetails').style.display = "block";
	
	// Assigns Click event to close modal button. Closes modal and removes event listener
	document.getElementById("closeModal").addEventListener('click', function(){
		
		document.getElementById("closeModal").removeEventListener;
		document.getElementById('orderDetails').style.display = "none";
			
	});	  	    			
};












/***
 *      __  __        _  _    _        _             ___                      
 *     |  \/  | _  _ | || |_ (_) _ __ | | ___       | _ \ __ _  __ _  ___  ___
 *     | |\/| || || || ||  _|| || '_ \| |/ -_)      |  _// _` |/ _` |/ -_)(_-<
 *     |_|  |_| \_,_||_| \__||_|| .__/|_|\___|      |_|  \__,_|\__, |\___|/__/
 *                              |_|                            |___/          
 *      ___           _        _                                              
 *     / __| __  _ _ (_) _ __ | |_  ___                                       
 *     \__ \/ _|| '_|| || '_ \|  _|(_-<                                       
 *     |___/\__||_|  |_|| .__/ \__|/__/                                       
 *                      |_|                                                   
 */



/*
 * 
 * Update Products, op.getDropdownData, op.loadProductUpdateForm
 * 
 */
//check to see if the hidden folder path field is present 
op.checkForPath = function (data){

	if (document.getElementById('pimagePath')){	
    Ajax.sendRequest('/admin/addProductGetPath', function getImagePath(req){
  	    	
  	    data = JSON.parse(req.responseText);
		document.getElementById('pimagePath').value = data[0].image_path;
  	    	
    }, data);		

};

		
};

// Get Session ID from cookie
op.getSessID = function(){
				
				var name = "name";
				var cookieArr = document.cookie.split(";");
				var len = cookieArr.length;	
	    		for (var i=0; i<len; i++) {
	        		if (cookieArr[i].match (name)){
	        			var data = cookieArr[i].split("=");
						var _ID = decodeURIComponent(data[1]);
						// localStorage.setItem('sessID', _ID);
						return _ID;
	        		}
	 			}
			
		};



/***
 *      __  __                           ___                    
 *     |  \/  |___ ________ _ __ _ ___  | _ \___ _ __ _  _ _ __ 
 *     | |\/| / -_(_-(_-/ _` / _` / -_) |  _/ _ | '_ | || | '_ \
 *     |_|  |_\___/__/__\__,_\__, \___| |_| \___| .__/\_,_| .__/
 *                           |___/              |_|       |_|   
 *      ___        _      _                                     
 *     / __|__ _ _(_)_ __| |_                                   
 *     \__ / _| '_| | '_ |  _|                                  
 *     |___\__|_| |_| .__/\__|                                  
 *                  |_|                                         
 */

	  	    
op.ackMsg = function(msg, header, color, show, button, options){
	var acknowledgment = document.getElementById('ackMessage');
	document.getElementsByClassName('modal-title')[0].innerHTML = header;
	
	document.getElementsByClassName('modal-header')[0].style.backgroundColor = color;
	document.getElementsByClassName('errorDescription')[0].innerHTML = msg;
	
	document.getElementById('cancel').style.display = "none";
	document.getElementById('ok').style.display = "none";
	
	if(show){
		acknowledgment.style.display = 'block';
	}
	else {
		acknowledgment.style.display = 'none';
	}
	
	if(button){
		document.getElementById('ok').style.display = "block";
		
	}
	
	if(options){
		document.getElementById('cancel').style.display = "block";
		document.getElementById('ok').style.display = "block";
	}
	
};
	
	
op.init();