var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminsSchema = new Schema({
	// _id: String,
	name: String,
	address: String,
	city: String,
	state: String,
	zip: String,
	phone: String, 
	email: String,
	password: String},
	{collection: 'Admins'});

module.exports = mongoose.model('Admins', adminsSchema);