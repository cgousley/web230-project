var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
    var saltRounds = 10;

var usersSchema = new Schema({

	fname: {type: String, required: true, match: /^[A-Za-z\s\-]+$/},

	lname: {type: String, required: true, match: /^[A-Za-z\s\-]+$/},

	address: {type: String, required: true, match: /^[0-9]+[A-Za-z\s\-]* ([A-Za-z\s\-]+)+[0-9A-Za-z]*$/},

	city: {type: String, required: true, match: /^[A-Za-z\s\-]+$/},

	state: {type: String, required: true, match: /[A-Za-z]{2}$/},

	zip: {type: String, required: true, match: /[0-9]{5}$/},

	phone: {type: String, required: true, match: /(([\d]{3})|(\([\d]{3}\)))(((-)|(\s)|()))([\d]{3})(([-]|(\s)|())([\d]{4}))$/},

	email: {type: String, required: true, unique: true, match: /^[\w.]+[@]([\w]+[.])+((com)|(org)|(edu)|(net)|(biz)|(uk)|(ru)|(me)|(co)|(info)|(gov)|(mil)(ca))$/},

	password: {type: String, required: true, match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^.])(?=.*[!@#$%^&*]).{8,10}$/}},

{collection: 'Users'});
	

usersSchema.pre('save', function(next){
	var data = this;	
	
	bcrypt.hash(data.password, saltRounds, function(err, hash){
    	if(err){
    		return next(err);
    		console.log(err);
    	}
    	else{
    		data.password = hash;
    		next();

    	}
    });
})

module.exports = mongoose.model('Users', usersSchema);















//PRE BACKEND VALIDATION
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// 
// var usersSchema = new Schema({
	// // _id: String,
	// fname: String,
	// lname: String,
	// address: String,
	// city: String,
	// state: String,
	// zip: String,
	// phone: String, 
	// email: String,
	// password: String},
	// {collection: 'Users'});
// 
// module.exports = mongoose.model('Users', usersSchema);