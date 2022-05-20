 //Specify the Port to listen on
 const port = process.env.PORT || 8080;

var express = require('express');
var path = require('path');

var createError = require('http-errors');

var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var mysql = require('mysql');

//Setup External Files
var conn  = require('./lib/dbConnections');


//will be changing links to js routes folder here
var homeRouter = require('./routes/home');
var menuRouter = require('./routes/menu');
var ordersRouter = require('./routes/orders');
var loginRouter = require('./routes/login');
var adminviewRouter = require('./routes/adminview');
var receiptRouter = require('./routes/receipt');


var app = express();


 
// Setup the Views Templating Engine
app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 //app.use('/public', express.static('public'));// code to use scripts, this is route specific which means it can be used only on specified routes
 app.use('/public', express.static(path.join(__dirname, 'public'))); // in both instance it doesn't work without the '/public' at the beginning. this method doesn't work need to ask Sir about this

 
 //Session Settings
 app.use(cookieParser());
 app.use(cookieParser());
 app.use(session({ 
     secret: 'T3$C@r|8proDj8t',
     resave: false,
     saveUninitialized: true,
     cookie: { maxAge: 120000 }
 }))
 

 app.use(flash());

 //will change these later as well 

 app.use('/', homeRouter); 
 app.use(menuRouter); // these don't work the same way that sir own works I will have to query this or run some searches on google, stack or git
 app.use(ordersRouter);
 app.use(loginRouter);
 app.use(adminviewRouter);
 app.use(receiptRouter);

 app.listen(port, () => console.log(`Listening on port ${port}..`));

 module.exports = app;