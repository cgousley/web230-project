var Product_GroupsModel = require('../../models').Product_Groups;
var ProductsModel = require('../../models').Products;
var productDetails = [];
module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){

	Product_GroupsModel.find({}).
	select({group_name: 1, group_id: 1}).
	exec(function(err, productGroups){
		if(err){
			console.log(err);
		}
		else{
			if(req.session.success && req.session.user){
				 res.render('user/home',{title: 'Shopping Cart - Home', heading: 'Home Page', cart: true, group: productGroups, product: productDetails, productDescriptions: true, userHead: true});
           	}
           	else{
           		 res.render('user/home',{title: 'Shopping Cart - Home', heading: 'Home Page', nav: true, group: productGroups, product: productDetails, productDescriptions: true, userHead: true});
           	}
		}
	});
 	
 	},
    
    showProductTable: function (req, res) {
    	data = JSON.parse(req.body.data);
    	ProductsModel.find({group_id: data.group_id, "removed" : {$ne: "PRODUCT REMOVED"}}).
						select({fragrance: 1, price: 1, group_id: 1, image_path: 1, image: 1, description: 1, _id: 1}).
						exec(function(err, productDetails){
							
								var table = createProductTable(productDetails);
								res.send(table);
		    			});
    } 	
}

createProductTable = function(data){
	// checks to see if there is data in the table
	if(data.length !== 0){
	
		var len = data.length;
		var i = 0;
		var table = '<table class="table table-striped table-bordered">';
		table += '<thead>';
		table += '<tr>';
		table += '<th>Image</th><th>Product Name</th><th>Price</th><th>Description</th><th>Add to Cart</th>';
		table += '</tr></thead><tbody>';
	
		while(i < len){
			table += '<tr>';
			table += '<td><img src="'+data[i].image_path+'"alt="'+data[i].description+'" id="'+data[i]._id+'"height="150"></td>';
			table += '<td>'+data[i].fragrance+' '+data[i].group_id+'</td>';
			
			table += '<td>'+data[i].price+'</td>';
			table += '<td><button class="btn btn-primary">Description</button></td>';
			table += '<td><button class="btn btn-success">Add to Cart</button></td>';
			table += '</tr>';
			i++;
		}
		table += '</tbody></table>';
		return table;
	}
	else{
		var table = "<p class='lead'>No Products Available.</p>"; 
		return table;
	}
}