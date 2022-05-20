var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections')

router.get('/menu', function(req, res, next) {
    res.render('../views/menu');
});
//POST Router to Add Projects from the form
router.post('/menu/placeOrder' , (req, res) => {
        // generating the code
    var code = Date.now().toString().slice(-4);
    var order_Date = new Date().toLocaleDateString('fr-CA');
    var order_Time = new Date().toLocaleTimeString();

    let data = {    customer_email:     req.body.email, 
                    customer_order: req.body.order, 
                    order_date: order_Date + " " + order_Time,
                    order_numbers: code
                };

        let sqlQuery = "INSERT INTO customer_orders SET ?";
    //  let sqlQuery = "INSERT INTO students (frst_nm, last_nm, email_addr, cohort) VALUES ('"+ req.body.first_name +"', '" + req.body.last_name + "', '"+ req.body.email_address + "','" + req.body.cohort_number +  "') ";
    
    
        let vQuery = conn.query(sqlQuery, data,(err, results) => {
        if(err) {
          console.log(err); 
        } else {
        //    res.send(JSONResponse(results));
           res.redirect('/menu');
        }
        });
    }); 

module.exports = router;