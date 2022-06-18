const express = require('express');  // import express model to create server 
const server = express();  // use express model as a function
const path = require('path'); // import path model to determine pathies


// import all routes

const homeRoute = require('./routes/home.route');
const productRoute = require('./routes/product.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const adminRoute = require('./routes/admin.route');



// session model
const session = require('express-session');  // import express session
const SessionStore = require('connect-mongodb-session')(session);  // import connect-mongodb-session to connect with database to create session collection in database

// import flash model
const flash = require('connect-flash'); // this package to  show error  



// use static files
server.use(express.static(path.join(__dirname ,'assets')));
server.use(express.static(path.join(__dirname , 'images')));

// run template engine
server.set('view engine' , 'ejs');
server.set('views', 'views');


// code to create collection for session in database
const STORE = new SessionStore({
    uri : "mongodb://localhost:27017/shop",
    collection : "sessions",
})


// code to use session
server.use(session({
    secret:'this string to encrypt session !@#$%^&*()_+}{?>< ',
    saveUninitialized : false,
    resave:true,
    store : STORE
}));

// use flash package
server.use(flash());



// use all routes that we had imported
server.use('/', homeRoute);
server.use('/', authRoute);
server.use('/product' , productRoute);
server.use('/cart' , cartRoute);
server.use('/admin',adminRoute);



// listen to run server on port 3000
server.listen(4000 , ()=>{console.log('server running successfully')})