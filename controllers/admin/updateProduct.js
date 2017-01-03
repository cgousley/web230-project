var fs = require('fs');
var Product_GroupsModel = require('../../models').Product_Groups;
var ProductsModel = require('../../models').Products;
var ordersModel = require('../../models').Orders;
var productDetails = [];

module.exports = {
	/*LOGIN PAGE FIRST LOAD*/
     index: function(req, res){
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
          
        /*IF THE PERSON IS ALREADY LOGGED IN AND THEY GOT TO THIS PAGE
        THEY ARE REDIRECTED BACK TO THE ADMIN HOME PAGE.*/
        if(req.session.success && req.session.admin){
             
        	Product_GroupsModel.find({}).
			select({group_name: 1, group_id: 1}).
			exec(function(err, productGroups){
				if(err){
					console.log(err);
				}
				else{
					res.render('admin/updateProduct',{title: 'Shopping Cart - Admin Update Product', heading: 'Update Product(s)', admin: true, group: productGroups, adminHead: true, textVal: true, ackMessage: true});
          		}
           	});
           /*IF THERE IS AN ERROR PARAMETER PASSED WITH THE VALUE OF 1 THEN DISPLAY AN ERROR MESSAGE AND SHOW THE LOGIN PAGE.*/
		}
		
		//If session is success but privlege is user, redirect to 401
        else if(req.session.success && req.session.user){
        	// res.render('views/401', {nav: true, subtitle: " - Page Not Found", image: "https://httpstatusdogs.com/img/401.jpg",  text: "<p class='lead text-center top20'>You're not authorized to view this page.</br>"+"But you're not stuck! Our navigation bar is above!</p>"});
        	   res.redirect('../401'); 
        }
        
        	
		else {
	      	error = "You do not have access to the admin area";
	      	res.render('admin/login',{error: error, title: 'Shopping Cart - Admin Login', blankBar: true, adminHead: true})
        }
	},
     
     
 showProductTable: function (req, res) {
    	data = JSON.parse(req.body.data);
    	
    	console.log("data is "+JSON.stringify(data.group_id));
    	
    	ProductsModel.find({group_id: data.group_id, "removed" : {$ne: "PRODUCT REMOVED"}}).
						select({fragrance: 1, price: 1, group_id: 1, _id: 1, description: 1, image_path: 1}).
						exec(function(err, productDetails){
							var table = createUpdateProductTable(productDetails);
	// /* CREATE THE NEW TABLE BASED UPON THE DATABASE QUERY */
							res.send(table);
		    			});
      
   },
   
   
getProduct2Update: function(req, res){
          

          
          /*IF THE PERSON IS ALREADY LOGGED IN AND THEY GOT TO THIS PAGE
          THEY ARE REDIRECTED BACK TO THE ADMIN HOME PAGE.*/
          if(req.session.success){
            
             		
             		var productData = {}
					productData._id = req.body._id;

                 	data = JSON.parse(req.body.data);
    	
    	
    	
    	
    	
    	ProductsModel.find(data).
						select({fragrance: 1, price: 1, group_id: 1, image_path: 1, description: 1, _id: 1}).
						exec(function(err, productDetails){
							
							// /* CREATE THE NEW TABLE BASED UPON THE DATABASE QUERY */
							res.send(productDetails);
		    			});
              
             
           }
           /*IF THERE IS AN ERROR PARAMETER PASSED WITH THE VALUE OF 1 THEN DISPLAY AN ERROR MESSAGE AND SHOW THE LOGIN PAGE.*/
          else {
              error = "You do not have access to the admin area";
              res.render('admin/login',{error: error, title: 'Shopping Cart - Admin Login', blankBar: true, adminHead: true})
           }
          
     },
     
uPI: function(req, res){
    	
    	console.log(req.body);
    	
    	if (req.body.file == "undefined"){
    		
    		console.log("no file");
    		console.log(req.body.pId);
    		ProductsModel.findOneAndUpdate({_id: req.body.pId},{$set: {group_id: req.body.pgroup, fragrance: req.body.pname, price: req.body.pprice, description: req.body.pdescription}}, function (err){
    			if(err){
    				console.log(err);
    				res.send('error');
    			}
    			else {
    				res.send('success');
    			}
    		})
    		
    	}
    	else {//if file is attatched
    		console.log(req.file);
        
 		if (req.file.mimetype === 'image/jpeg'){
		
		req.file.destination += '/'+req.body.filePath;
        
        var newimage_path = req.file.destination.slice(1)+'/'+req.file.originalname;// console.log(req.file.destination);
			
		console.log(req.file);

			fs.rename('./public/img/'+req.file.filename, req.file.destination+'/'+req.file.originalname, function (err) {
				if(err){
					console.log(err);
				}
				else{
					
		    		ProductsModel.findOneAndUpdate({_id: req.body.pId},{$set: {group_id: req.body.pgroup, image_path: newimage_path, fragrance: req.body.pname, price: req.body.pprice, description: req.body.pdescription}}, function (err){
    			
    			if(err){
    				console.log(err);
    				res.send('error');
    			}
    			else {
    				res.send('success');
    			}
    		})


				}
			});
		}
		else {
			res.send('error');
		} 								
		    	
    	
    	
 	}

},
     

   
deleteProduct: function (req, res){
	
	var productData = {}
					productData._id = req.body._id;

                 	data = JSON.parse(req.body.data);
    	
    	
    	console.log(data);
    	console.log(data._id);
		console.log(data.group_id);
		console.log(data.name);
	
	

		// Finds the product and removes
		
		
		
		
		// Marks the product as removed
		ProductsModel.update({'_id': data._id}, {'removed': 'PRODUCT REMOVED'}, function(err){
			 if(err){
				console.log(err);
			}
			else{//if success, find all occurrences of product in cutomer orders and mark as removed 
				
				ordersModel.update({"itemInfo._id" : data._id}, {'itemInfo.$.removed': 'PRODUCT REMOVED'}, {multi: true}, function(err){
					if (err){
						console.log(err);
					}
					else{//if successful, requeries database for updated product list
						ProductsModel.find({group_id: data.group_id, "removed" : {$ne: "PRODUCT REMOVED"}}). 
						select({fragrance: 1, price: 1, group_id: 1, _id: 1, description: 1, image_path: 1}).
						exec(function(err, productDetails){

							// creates new table and sends it							
							var table = createUpdateProductTable(productDetails);
							res.send(table);
		    			});
			
					}
				});
				
		}
	})
		
		
		
		
		
		
		
		
	
},     
     
     
     
     
          
     // /*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    access: function(req, res){
          res.render('admin/updateProduct',{title: 'Shopping Cart - Admin Update Product', heading: 'Update Product', admin: true, group: productGroups, adminHead: true, textVal: true, addProductMessage: true});
 	},


/*When update product button posts, sends to update products*/
    ASDF: function(req, res){
    	
    	
    	
    	
    	var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
          
        /*IF THE PERSON IS ALREADY LOGGED IN AND THEY GOT TO THIS PAGE
        THEY ARE REDIRECTED BACK TO THE ADMIN HOME PAGE.*/
        if(req.session.success){

             console.log(req.body);
             data = req.body;
             
			ProductsModel.find(data).
						select({description: 1, fragrance: 1, price: 1, group_id: 1, image_path: 1, image: 1}).
						exec(function(err, product2Update){					
					
					if(err){
					console.log(err);
					}
					else{
				
						var updateForm = createUpdateForm(product2Update);
						// /* CREATE THE NEW TABLE BASED UPON THE DATABASE QUERY */
						res.render('admin/updateThis');

          			}
					
					
		    			});
					
					
           /*IF THERE IS AN ERROR PARAMETER PASSED WITH THE VALUE OF 1 THEN DISPLAY AN ERROR MESSAGE AND SHOW THE LOGIN PAGE.*/
		}	
		else {
	      	error = "You do not have access to the admin area";
	      	res.render('admin/login',{error: error, title: 'Shopping Cart - Admin Login', blankBar: true, adminHead: true})
        }
	},





}

createUpdateProductTable = function(data){
	var len = data.length;
	var i = 0;
	var table = '<table class="table table-striped table-bordered">';
	table += '<thead>';
	table += '<tr>';
	table += '<th>Product Name</th><th>Update Product</th><th>Delete Product</th><th style="display: none">Data ID</th>';//<th style="display: none">Data Image</th>
	table += '</tr></thead><tbody>';

	while(i < len){
		table += '<tr>';
		table += '<td>'+data[i].fragrance+' '+data[i].group_id+'</td>';
		table += '<td><button class="btn btn-primary" form="'+data[i]._id+'">Update Product</button></td>';
		table += '<td><button class="btn btn-success">Delete Product</button></td>';
		table += '<td style="display: none">'+data[i]._id+'</td>';
		table += '<td style="display: none">'+data[i].image_path+'</td>';
		table += '</tr>';
		i++;
	}
	table += '</tbody></table>';
	return table;
}



createUpdateForm = function(data){

var updateForm = '<label for="productName" class="loginFormElement">Product Name:</label>'
updateForm += '<i data-toggle="popover" title="Field error" data-content="Field name cannot be blank." data-placement="right" class="fa fa-exclamation-circle loginError" aria-hidden="true" style="display: none;"></i>'
updateForm += '<input class="form-control hasError" id="productName" placeholder="" value="'+data.fragrance+'">'
updateForm += '</div>'

updateForm += '<div class="form-group">'
updateForm += '<label for="productPrice" class="loginFormElement">Product Price:</label>'
updateForm += '<i data-toggle="popover" title="Field error" data-content="Field name cannot be blank and is not in email format." data-placement="right" class="fa fa-exclamation-circle loginError" aria-hidden="true" style="display: none;"></i>'
updateForm += '<input name="productPrice" class="form-control hasError" id="productPrice" placeholder="" value="'+data.price+'">'
updateForm += '</div>'

updateForm += '<div class="form-group">'
updateForm += '<label for="productImage" class="loginFormElement">Product Image:</label>'
updateForm += '<i data-toggle="popover" title="Field error" data-content="Field name cannot be blank and is not in email format." data-placement="right" class="fa fa-exclamation-circle loginError" aria-hidden="true" style="display: none;"></i>'
updateForm += '<input name="productPrice" type="file" class="form-control hasError file" id="productPrice">'
updateForm += '</div>'

updateForm += '<div class="form-group">'
updateForm += '<label for="productDescription" class="loginFormElement">Product Description:</label>'
updateForm += '<textarea class="form-control hasError" rows="5" id="productDescription">"'+data.description+'"</textarea>'
updateForm += '</div>'

updateForm += '<button type="submit" id="submit" class="btn btn-success loginFormElement">Update Product</button> <!-- data-toggle="modal" data-target="#updateMessage" -->'
updateForm += '</form>'
updateForm += '</div>'
	return updateForm;
}          