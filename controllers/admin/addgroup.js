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
          if(req.session.success  && req.session.admin){
             // res.redirect('../../admin/addproduct');
             res.render('admin/addgroup',{title: 'Shopping Cart - Admin Add Group', heading: 'Add a group', admin: true, adminHead: true, textVal: true, ackMessage: true});
		}
		
		//If session is success but privlege is user and not admin, redirect to 401
        else if(req.session.success && req.session.user && !req.session.admin){
        	// res.render('views/401', {nav: true, subtitle: " - Page Not Found", image: "https://httpstatusdogs.com/img/401.jpg",  text: "<p class='lead text-center top20'>You're not authorized to view this page.</br>"+"But you're not stuck! Our navigation bar is above!</p>"});
        	   res.redirect('../401');  
        }
        
        
           /*IF THERE IS AN ERROR PARAMETER PASSED WITH THE VALUE OF 1 THEN DISPLAY AN ERROR MESSAGE AND SHOW THE LOGIN PAGE.*/
          else {
              error = "You do not have access to the admin area";
              res.render('admin/login',{error: error, title: 'Shopping Cart - Admin Login', blankBar: true, adminHead: true})
           }
     },
     
     
     /*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    addGroupNow: function(req, res){
	 console.log(req.body);
	 
	 data = JSON.parse(req.body.data);
	 
	 var folderName = data.newGroupName;
	 
	 var folderNameLower = folderName.toLowerCase();
	 
	 
	 var newPath = './public/img/'+ data.newGroupFolder+'/'

	var groupData = {}
					groupData.group_id = data.newGroupName;
					groupData.group_name = data.newGroupName;
					groupData.image_path = data.newGroupFolder;
					
					var doc = new Product_GroupsModel(groupData);
					doc.save(function(err){
						if(err){
							res.send('error');
						}
						else {
							
							fs.mkdir(newPath, function(err){
								if(err){
									console.log(err);
								}
								else{
									res.send('success');
									
								}
							});
						}
					});
 	},
     
     /*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    access: function(req, res){
	 res.render('admin/addgroup',{title: 'Shopping Cart - Admin Add Group', heading: 'Add a group', admin: true, adminHead: true, textVal: true, addGroupMessage: true, showSuccess: true});
 	}
}