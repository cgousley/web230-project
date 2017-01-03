var fs = require('fs');
var Product_GroupsModel = require('../../models').Product_Groups;
var ProductsModel = require('../../models').Products;
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
             		
             		var productData = {}
					productData._id = req.body._id;

                 	data = JSON.parse(req.body.data);
    	
    	console.log(data);
    	
    	
    	
    	ProductsModel.find(data).
						select({fragrance: 1, price: 1, group_id: 1, image_path: 1, description: 1, _id: 1}).
						exec(function(err, productDetails){
							res.send(productDetails);
		    			});
             
           }
           
        //If session is success but privlege is user, redirect to 401
        else if(req.session.success && req.session.user){
        	// res.render('views/401', {nav: true, subtitle: " - Page Not Found", image: "https://httpstatusdogs.com/img/401.jpg",  text: "<p class='lead text-center top20'>You're not authorized to view this page.</br>"+"But you're not stuck! Our navigation bar is above!</p>"});
        	   res.redirect('../401'); 
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
		
		req.file.destination += '/'+req.body.pgroup.toLowerCase();
        
        var newimage_path = req.file.destination.slice(1)+'/'+req.file.originalname;// console.log(req.file.destination);
			
			fs.rename('./public/img/'+req.file.filename, './public/img/'+req.body.pgroup.toLowerCase()+'/'+req.file.originalname, function (err) {
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
     

     
     
     
     /*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    access: function(req, res){
          res.render('admin/updateThis',{title: 'Shopping Cart - Admin Update THis Product', heading: 'Add Product', admin: true, group: productGroups, adminHead: true, textVal: true, addProductMessage: true});
 	}
}