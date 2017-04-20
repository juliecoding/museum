var app = require('./../index');
var db = app.get('db');
//var orders = require('./stagedDataOrders.js')

module.exports = {

  completeOrder: function(req, res, next) {
    console.log('Completing order', req.body);
    db.order.complete_order([
      req.user.orderid,
      req.user.userid,
      new Date(),
      null,
      req.body.amount,
      req.body.shipname,
      req.body.shipaddress,
      req.body.shipaddress2,
      req.body.shipcity,
      req.body.shipstate,
      req.body.shipzip,
      req.body.shipcountry,
      req.body.shipemail,
      req.body.shipphone
    ], function(err, order) {
      if (err) {
        console.log('Error completing order: ', err);
        return res.status(500).send(err);
      }

  //Creates new empty order to take the place of the now-finished order
    db.order.insert([req.user.userid], function(err, order) {
      if (err) {
        console.log('Error creating new empty order: ', err);
        return res.status(500).send(err);
      }
      req.user.orderid = order[0].orderid;
      return res.status(200).send('Order completed successfully');
    })
  }) //Does this go here or on line 30?
  },

///////////////////////////////////////////////////

  getSingleOrder: function(req, res, next) {
    db.order.read_id([req.user.orderid], function (err, order) {
      if (err) {
        console.log('Error getting that order: ', err);
        return res.status(500).send(err);
      }

      order = order[0]

      db.product.get_products_in_order([req.user.orderid], function(err, products) {
        if (err) {
          console.log('Error reading order products: ', err);
          return res.status(500).send(err);
        }

      //Adds a products array to the order object
        order.products = products;

        return res.status(200).send(order);
      })
    })
  },

///////////////////////////////////////////////////

  getOrdersByUser: function(req, res, next) {
    db.order.read_by_user([req.user.userid], function(err, order) {
      if (err) {
        console.log('Error getting orders: ', err);
        return res.status(500).send(err);
      }
      else {
        return res.status(200).send(order);
      }
    })
  }

  // getSingleOrder: function(req, res, next) {
  //   db.order.read_id([req.user.order_id], function(err, order) {
  //     if (err) {
  //       console.log('Order read err: ', err);
  //       return res.status(500).send(err);
  //     }
  //
  //     var totalOrder = {
  //       order: order[0]
  //     };
  //
  //     db.product.get_products_in_order([req.user.order_id], function(err, products) {
  //       if (err) {
  //         console.log('Order products read err: ', err);
  //         return res.status(500).send(err);
  //       }
  //
  //       totalOrder.products = products;
  //
  //       return res.status(200).send(totalOrder);
  //     })
  //   })
  // }

}
