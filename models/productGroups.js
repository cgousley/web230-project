var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productGroupsSchema = new Schema({
	group_name: String,
	group_id: String,
	image_path: String,
	},
	{collection: 'Product_Groups'});

module.exports = mongoose.model('Product_Groups', productGroupsSchema);