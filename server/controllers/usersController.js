var app = require('./../index')
var db = app.get('db');
//var users = require('./stagedDataUsers')

module.exports = {

  //RETURN CURRENT USER //
  me: function(req, res, next) {
    //If user isn't on the session, then return error status
    if (!req.user) {
      console.log('Current user not found');
      return res.status(401).send('Current user not defined');
    }
    //Return user
    return res.status(200).json(req.user);
  },

  updateUser: function(req, res, next) {
    console.log('Starting update of user', req.body);
    db.user.update_user([
      req.user.userid,
      req.body.userfirstname,
      req.body.userlastname,
      req.body.useraddress,
      req.body.useraddress2, 
      req.body.usercity,
      req.body.userstate,
      req.body.userzip,
      req.body.usercountry,
      req.body.useremail,
      req.body.userphone
    ], function(err, user) {
      if (err) {
        console.log('User update error', err);
        return res.status(401).send(err);
      }
      req.session.passport.user = user[0];
      res.status(200).json(user);
    })
  },

}
