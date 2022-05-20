var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections')


router.get('/receipt', function(req, res) {
    conn.query('SELECT * FROM restaurantapp.customer_orders WHERE customer_email=' + req.body.cust_eMail, function(err,rows){
        if(err) {
            console.log(err);
        }else {
            res.render('../views/receipt', {
                orders: rows
            });
        }
    })
});



module.exports = router;