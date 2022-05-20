var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections')


router.get('/orders', function(req, res, next) {
    res.render('../views/viewOrders');
});

router.post('/orders/viewReciept', function(req, res, next){
    var cust_eMail  = req.body.cust_eMail;
    conn.query(`SELECT * FROM customer_orders WHERE customer_email='`+ req.body.cust_eMail + "'", function(err, rows) { // 
        if(err) {
            console.log(err);
        }else {
            res.render('../views/receipt', {
                orders: rows
            })
        }
    })
})

module.exports = router;