var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections')

router.get('/admin', function(req, res, next) {
    if(req.session.loggedin === true) {
        conn.query('SELECT * FROM customer_orders ORDER BY id', function(err, rows){
            if(err) {
            console.log('not being rendered');
            throw err 
            } else {
                res.render('../views/adminview', {
                    customerOrders: rows
                });
            }
        })

    } else {
        res.redirect('login');
    }
});

module.exports = router;