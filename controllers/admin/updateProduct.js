var fs = require('fs');
var Product_GroupsModel = require('../../models').Product_Groups;
var ProductsModel = require('../../models').Products;
var ordersModel = require('../../models').Orders;
var productDetails = [];

module.exports = {
	/* Update Products FIRST LOAD*/
	index: function(req, res){
	        var url = require('url');
		var url_parts = url.parse(req.url, true);
        	var query = url_parts.query;
          
  	      /*IF THE PERSON IS ALREADY LOGGED IN AND THEY GOT TO THIS PAGE
  	      THEY ARE REDIRECTED BACK TO THE ADMIN HOME PAGE.*/
  	      if(req.session.success && req.session.admin){
  		      	//Gather list of product groups for dropdown, then load page with dropdown     
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
		}
		
		//If session is success but privlege is user and not admin, redirect to 401
		else if(req.session.success && req.session.user && !req.session.admin){
   			res.redirect('../401'); 
        	}
		//NOT LOGGED IN AT ALL, SEND TO ADMIN LOGIN PAGE
		else {
	      		error = "You do not have access to the admin area";
	      		res.render('admin/login',{error: error, title: 'Shopping Cart - Admin Login', blankBar: true, adminHead: true})
        	}
	},
     
     	//  THIS CREATES LIST OF PRODUCTS FOR DROPDOWN QUERY
 	showProductTable: function (req, res) {
    		data = JSON.parse(req.body.data);
	    	
		ProductsModel.find({group_id: data.group_id, "removed" : {$ne: "PRODUCT REMOVED"}}).
		select({fragrance: 1, price: 1, group_id: 1, _id: 1, description: 1, image_path: 1}).
		exec(function(err, productDetails){
			
			// CREATE THE NEW TABLE BASED UPON THE DATABASE QUERY AND SEND 
			var table = createUpdateProductTable(productDetails);
				res.send(table);
			});
	},
   
   	// GATHERS PRODUCT INFORMATION TO SEND TO USER SO HE/SHE CAN UPDATE  
	getProduct2Update: function(req, res){
          

          
           //IF THE USER IS ALREADY LOGGED IN, HE/SHE MAY PROCEED  
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
     
//THIS UPDATES THE PRODUCT     
updateProduct: function(req, res){
	
	//if no product image is attached, update everything except the image
	if (req.body.file == "undefined"){
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
    	else {//if file is attatched, make sure it's a jpeg, then update
 		if (req.file.mimetype === 'image/jpeg'){
		req.file.destination += '/'+req.body.filePath;
        
	        var newimage_path = req.file.destination.slice(1)+'/'+req.file.originalname;

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
     
	//THis removes the product by adding "removed : PRODUCT REMOVED" to the product occurences in the orders and product collections in the DB
	//Then, it queries the db for all products that don't have "removed : PRODUCT REMOVED", creates a table, and sends it to the user as the updated product table  
	deleteProduct: function (req, res){
	
		var productData = {}
		productData._id = req.body._id;
		data = JSON.parse(req.body.data);

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
