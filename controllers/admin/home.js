module.exports = {
      index: function(req, res){
      	console.log('home index fires made');
        /*CHECKS TO SEE IF THE SUCCESS PROPERTY IS IN THE SESSION OBJECT.  IF SO MOVE ON, IF NOT DON'T*/
        if(req.session.success && req.session.admin){
        	res.render('admin/home',{title: 'Shopping Cart - Admin Home', heading: 'Admin Home', adminHead: true, admin: true});
        }
        //If session is success but privlege is user and no admin, redirect to 401
        else if(req.session.success && req.session.user && !req.session.admin){
        	   res.redirect('../401');
        }
        /*IF THERE IS NOT SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
        else{
            res.redirect('/admin/login/?error=1');
       	}
    }
};