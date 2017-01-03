/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/user/home');
	viewcart = require('../controllers/user/viewcart');
	checkout = require('../controllers/user/checkout');
	orderComplete = require('../controllers/user/orderComplete');
	register = require('../controllers/user/register');
	login = require('../controllers/user/login');
	error = require('../controllers/error');
	admin = require('../controllers/admin/home');
	adminLogin = require('../controllers/admin/login');
	addgroup = require('../controllers/admin/addgroup');
	adminHome = require('../controllers/admin/home');
	addProduct = require('../controllers/admin/addProduct');
	updateProduct = require('../controllers/admin/updateProduct');
	checkOrders = require('../controllers/admin/checkOrders');
	multer = require('multer');
	storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/img'); // set the destination
    },
});
	
module.exports = function(app){
	/* USER ROUTES */
	router.use(function(req, res, next){
		if (req.secure) {
			return next();
		};
		res.redirect('https://'+req.hostname+':'+app.get('port')+req.url);
	});
	router.get('/', home.index);
	router.post('/home', home.showProductTable);
	router.get('/register', register.index);
	router.post('/register', register.registerUser);
	router.get('/viewcart', viewcart.index);
	router.get('/checkout', checkout.index);
	router.post('/checkout', register.registerUser);
	router.post('/checkout/loadAddress', checkout.loadAddress);
	router.post('/checkout/completeCheckout', checkout.completeCheckout);
	router.get('/order-complete', orderComplete.index);
	router.get('/login', login.index);
	router.post('/login', login.access);
	router.get('/logout', login.logout);
	router.get('/404HAL', error.hal);
	router.get('/404', error.num404);
	router.get('/401', error.num401);
	
	/* ADMIN ROUTES */
	router.get('/admin/', admin.index);
	router.get('/admin/logout/', adminLogin.logout);
	router.get('/admin/login', adminLogin.index);
	router.post('/admin/login', adminLogin.access);
	router.get('/admin/home', adminHome.index);
	router.get('/admin/addgroup', addgroup.index);
	router.post('/admin/addgroup', addgroup.addGroupNow);
	router.post('/admin/addProductGetPath', addProduct.getPath);
	router.get('/admin/addproduct', addProduct.index);
	router.get('/admin/updateproduct', updateProduct.index);//1
	router.post('/admin/updateproduct', updateProduct.showProductTable);//2
	router.post('/admin/updateThis', updateProduct.getProduct2Update);//3
	router.post('/admin/deleteThis', updateProduct.deleteProduct);//3
	router.get('/admin/checkOrders', checkOrders.index);
	router.post('/admin/checkOrders', checkOrders.showUserTable);
	router.post('/admin/checkOrders/getOrderDetails', checkOrders.showOrderTable);
	
	/* ADDED MULTER TO THE FOLLOWING POST BECAUSE IT WILL BE DOING THE FILE UPLOADS*/
	router.post('/admin/addproduct', multer({dest:'./public/img'}).single('file'),addProduct.addProduct); 
	router.post('/admin/updateNow', multer({storage: storage}).single('file'),updateProduct.uPI);
	
	app.use(router);
}