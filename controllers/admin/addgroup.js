var fs = require('fs');
var Product_GroupsModel = require('../../models').Product_Groups;
var ProductsModel = require('../../models').Products;


module.exports = {
/*ADD GROUP PAGE FIRST LOAD*/
     index: function(req, res){
          var url = require('url');
          var url_parts = url.parse(req.url, true);
          var query = url_parts.query;
          
        /*IF THE PERSON IS ALREADY LOGGED IN AND THEY GOT TO THIS PAGE
        THEY ARE REDIRECTED BACK TO THE ADMIN HOME PAGE.*/
	if(req.session.success  && req.session.admin){
		res.render('admin/addgroup',{title: 'Shopping Cart - Admin Add Group', heading: 'Add a group', admin: true, adminHead: true, textVal: true, ackMessage: true});
	}
		
	//If session is success but privlege is user and not admin, redirect to 401
        else if(req.session.success && req.session.user && !req.session.admin){
	   res.redirect('../401');  
        }
        
     	/*IF THERE IS AN ERROR PARAMETER PASSED WITH THE VALUE OF 1 THEN DISPLAY AN ERROR MESSAGE AND SHOW THE LOGIN PAGE.*/
        else {
		error = "You do not have access to the admin area";
		res.render('admin/login',{error: error, title: 'Shopping Cart - Admin Login', blankBar: true, adminHead: true})
           }
},
     
     
	/* THIS IS THE ADD GROUP FUNCTION */ 
	addGroupNow: function(req, res){
		//gathers folder name data
		data = JSON.parse(req.body.data);
		var folderName = data.newGroupName;
		var folderNameLower = folderName.toLowerCase();
		var newPath = './public/img/'+ data.newGroupFolder+'/'
		
		// gathers group data
		var groupData = {}
		groupData.group_id = data.newGroupName;
		groupData.group_name = data.newGroupName;
		groupData.image_path = data.newGroupFolder;
		
		//saves the group to db
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
}
