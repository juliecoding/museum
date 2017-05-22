// EXTERNAL MODULES //
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var massive = require('massive');


//CONFIG//
var config = require('./config');

//EXPRESS //
var app = module.exports = express();
app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());


//MASSIVE//
var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
  connectionString: massiveUri
});
app.set('db', massiveServer);
var db = app.get('db');

// //DB SETUP//
var dbSetup = require('./services/dbSetup'); //Q. Is this dbSetup file necessary any time you have a database? A. It's a good idea to include it when you have SQL databases.
dbSetup.run();

// SESSION AND PASSPORT //
var passport = require('./services/passport');
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT ENDPOINTS//
app.get('/auth', function(req, res, next) {
  if (req.query.state) {
    req.session.state = req.query.state;
  }
  passport.authenticate('auth0')(req, res, next);
});

app.get('/auth/callback', function(req, res, next) {
  var state = 'shop';
  if (req.session.state) {
    state = req.session.state;
  }
  req.session.state = null;
  passport.authenticate('auth0', {
    successRedirect: 'http://192.241.238.48:3100/#/shop' /*state*/ ,
    failureRedirect: 'http://192.241.238.48:3100/#/'
  })(req, res, next);
});


app.get('/api/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('Logged out');
}); //MAY NOT WORK! Consult Passport-auth0 docs.


// POLICIES //
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated())
    return res.status(401).send("User is not authorized");
  return next();
};

// CONTROLLERS//
var incartController = require('./controllers/incartController');
var ordersController = require('./controllers/ordersController');
var productsController = require('./controllers/productsController');
var usersController = require('./controllers/usersController');


// USER ENDPOINTS //
// By Controller //
app.post('/api/cart/add', isAuthed, incartController.addItemToCart);
app.put('/api/cart/qty', incartController.updateQuantity);
app.delete('/api/cart/delete/:incartid', incartController.deleteFromCart)

app.put('/api/order/complete', ordersController.completeOrder);
app.get('/api/order', ordersController.getSingleOrder);
app.get('/api/orders', ordersController.getOrdersByUser)

app.get('/api/products', productsController.getProducts);
app.get('/api/product/:productid', productsController.getSingleProduct);
//This one should allow queries

app.get('/api/user', usersController.me);
app.put('/api/user/update', usersController.updateUser);


//STRIPE
var stripe = require('stripe')(config.keySecret);

// // payment
// app.get("/api/payment", function (req, res) {
// 	return res.render("index.pug", { pk_test_NptqejbBDylUODHwNCKeqnD8 });
// });
//
// app.post("/api/charge", function (req, res) {
// 	var amount = 500;
// 	stripe.customers.create({
// 		email: req.body.stripeEmail,
// 		source: req.body.stripeToken
// 	}).then(function (customer) {
// 		return stripe.charges.create({
// 			amount: amount,
// 			description: "Sample Charge",
// 			currency: "usd",
// 			customer: customer.id
// 		});
// 	}).then(function (charge) {
// 		return res.render("charge.pug");
// 	});
// });

app.post('/api/payment', function(req, res, next) {
  console.log("tester string", req.body);
  //convert amount to pennies
  const chargeAmt = req.body.amount;
  const amountArray = chargeAmt.toString().split('');
  const pennies = [];
  for (var i = 0; i < amountArray.length; i++) {
    if (amountArray[i] === ".") {
      if (typeof amountArray[i + 1] === "string") {
        pennies.push(amountArray[i + 1]);
      } else {
        pennies.push("0");
      }
      if (typeof amountArray[i + 2] === "string") {
        pennies.push(amountArray[i + 2]);
      } else {
        pennies.push("0");
      }
      break;
    } else {
      pennies.push(amountArray[i])
    }
  }
  const convertedAmt = parseInt(pennies.join(''));
  console.log("Pennies: ");
  console.log(convertedAmt);

  const charge = stripe.charges.create({
    amount: convertedAmt, // amount in cents, again
    currency: 'usd',
    source: req.body.payment.token,
    description: 'Test charge from MoEA site'
  }, function(err, charge) {
    if (err) {
      console.log(err);
    } else {
      console.log('charge: ', charge);
    }
    res.sendStatus(200);
    // if (err && err.type === 'StripeCardError') {
    //   // The card has been declined
    // }
  });
});



// CONNECTIONS //
var port = config.PORT;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});