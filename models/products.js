var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongoose').Types.ObjectId; 

var productsSchema = new Schema({
	
	fragrance: String,
	price: String,
	image: String,
	image_path: String,
	description: String,
	group_id: String,
	removed: String,
	// orders : [{ type : mongoose.Schema.ObjectId, ref : 'Orders' }]
	},
	{collection: "Products"});

module.exports = mongoose.model('Products', productsSchema);





					// var productData = {}
					// productData.group_id = req.body.pgroup;
					// productData.fragrance = req.body.pname;
					// productData.price = req.body.pprice;
					// // productData.image = req.body.fileName;
// 					
					// var newimage_path = req.file.destination.slice(1)+'/'+req.file.originalname;
// 					
					// // productData.image_path = '/public/img/'+req.file.originalname;
					// productData.description = req.body.pdescription;
					// var doc = new ProductsModel(productData);
					// doc.save(function(err){
						// if(err){
							// res.send('error');
						// }
						// else {
							// res.send('success');
						// }
					// });
// 					
// 
// 
// 
    		// ProductsModel.findOneAndUpdate({_id: req.body.pId},{$set: {group_id: req.body.pgroup, image_path: newimage_path, fragrance: req.body.pname, price: req.body.pprice, description: req.body.pdescription}}, function (err){
    			// if(err){
    				// console.log(err);
    				// res.send('error');
    			// }
    			// else {
    				// res.send('success');
    			// }
    		// })