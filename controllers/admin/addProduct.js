var fs = require('fs');
var Product_GroupsModel = require('../../models').Product_Groups;
var ProductsModel = require('../../models').Products;


module.exports = {
	/*LOGIN PAGE FIRST LOAD*/
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
					res.render('admin/addproduct',{title: 'Shopping Cart - Admin Add Product', heading: 'Add Product', group: productGroups, admin: true, adminHead: true, textVal: true, ackMessage: true});
          			}
           		});
		}
	//If session is success but privlege is user and not admin, redirect to 401
        else if(req.session.success && req.session.user && !req.session.admin){
        	   res.redirect('../401'); 
        }	
	else {
		error = "You do not have access to the admin area";
		res.render('admin/login',{error: error, title: 'Shopping Cart - Admin Login', blankBar: true, adminHead: true})
        }
},

 /* This gets the image path for the add product image function */
getPath: function(req, res){
    	
    	console.log(req.body.data);
    	data = JSON.parse(req.body.data);
    	
    	//look up image path in DB
    	Product_GroupsModel.find(data).
			select({image_path: 1}).
			exec(function(err, groupPath){
				if(err){
					console.log(err);
				}
				else{
					res.send(groupPath);
          			}
           		});
    	
    	
    	
},
    
    
/*This is the add product function*/
addProduct: function(req, res){
	//makes sure the image is a jpeg
	if (req.file.mimetype === 'image/jpeg'){
		//rewrites the image file name to keep name, and the path so that
		//each category has it's own folder
		req.file.destination += '/'+req.body.filePath;
		var newimage_path = req.file.destination.slice(1)+'/'+req.file.originalname;
				
		fs.rename('./public/img/'+req.file.filename, req.file.destination+'/'+req.file.originalname, function (err) {
			if(err){
				console.log(err);
			}
			else{
				//saves product
				var productData = {}
				productData.group_id = req.body.pgroup;
				productData.fragrance = req.body.pname;
				productData.price = req.body.pprice;
				productData.image = req.body.fileName;
				productData.image_path = newimage_path;
				productData.removed = ' ';
					
				productData.description = req.body.pdescription;
				var doc = new ProductsModel(productData);
				doc.save(function(err){
					if(err){
						res.send('error');
					}
					else {
						res.send('success');
					}
				});

			}
		});
	}
	else {
		res.send('error');
	} 			
},

}
