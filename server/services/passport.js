// PASSPORT //
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// APP //
var app = require('./../index');
var db = app.get('db');

// CONFIG //
var config = require('./../config');

// RUN WHEN LOGGING IN //
passport.use(new Auth0Strategy(config.authConfig, function(accessToken, refreshToken, extraParams, profile, done) {
  db.user.search_user_email([profile._json.email], function(err, user) {
    console.log(user);
    if (err) {
      return done(err);
    } else if (!user.length) {
      console.log(user)
      db.user.create_user([profile._json.email, profile._json.given_name, profile._json.family_name], function(err, user) {
        if (err) {
          return done(err);
        }
        console.log('User created');

        db.order.insert([user[0].userid], function(err, order) {
          if (err) {
            console.log('DB Create, durring user create: ', err);
          }
          user[0].orderid = order[0].orderid;
          return done(null, user[0]);
        })
      })
    } else {
      console.log('User found');
      db.order.read_incomplete([user[0].userid], function(err, order) {
        if (err) {
          return console.log("Find User Auth, Order not found", err);
        }

        console.log('order: ', order);
        user[0].orderid = order[0].orderid;
        return done(null, user[0]);
      })
    }
  })
}));

// Puts the user on the session
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;