var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

//renders longin view
router.get('/login', function(req, res, next) {
    res.render('../views/login');
});

//authenticates user 
router.post('/auth_User', function(req, res, next){
    var email = req.body.usr_email;
    var password = req.body.pswrd;

    conn.query('SELECT * FROM authed_user WHERE admin_email = ? AND BINARY password = ?', [email, password], function(err, rows, fields){ //santitizes and cleanses your code
        // console.log(rows.length);
        if(rows.length <= 0) {
            req.flash ('error, Invalid credentials. Please try again!')
            res.redirect('/login')
            throw err;
        } 
        else {
            req.session.loggedin = true;
            req.session.first_Nm = rows[0].frst_name;
            req.session.last_Nm = rows[0].lst_name;
            req.session.is_admin = rows[0].is_admin;
            // console.log(req.session);
            res.redirect('/admin')
        }
    })
})

//to log out user

router.get('/logout', function(req, res){
    req.session.destroy();
    // req.flash('success', "Enter your Login Credentials");
    res.redirect('/login');
})

module.exports = router;