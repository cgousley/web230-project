var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema({
	
	orderInfo: [{
	customer_id: {type: String, required: true, match: /^[0-9a-z]{24}$/},
	date: {type: String, required: true, match: /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4} at [0-9]{1,2}:[0-9]{1,2}(am|pm)$/},
	grandTotal: {type: String, required: true, match: /^[0-9]+\.[0-9]{2}$/}
	}],
	
	itemInfo:[{
		_id: {type: String, required: true, match: /^[0-9a-z]{24}$/},
		name: {type: String, required: true, match: /^([A-Za-z]+[\s]?)+$/},
		count: {type: Number, required: true, match: /^[0-9]+$/},
		price: {type: String, required: true, match: /^[0-9]+\.[0-9]{2}$/},
		total: {type: String, required: true, match: /^[0-9]+\.[0-9]{2}$/},
	// Products : [{ type: Schema.Types.ObjectId, ref : 'Products' }]
		removed: {type: String, required: true, match: /^[\s]{1}$|^PRODUCT REMOVED$/}
	}],
	
	},
	{collection: "Orders"});

// }]

module.exports = mongoose.model('Orders', ordersSchema);





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