var app = require('./../index');
var db = app.get('db');

module.exports = {

  addItemToCart: function(req, res, next) {
    db.incart.add_to_cart([req.user.orderid, req.body.productid, req.body.qty], function(err, product) {
      if (err) {
        console.log('Error adding item to order: ', err);
        return res.status(500).send(err);
      }

      return res.status(200).send('Product added to cart')
    });
  },

///////////////////////////////////////////////

  updateQuantity: function(req, res, next) {
    db.incart.update_qty([req.params.id, req.body.qty], function(err, product) {
      if (err) {
        console.log('Error updating quantity: ', err);
        return res.status(500).send(err);
      }

      return res.status(200).send('Product updated succesfully');
    });
  },

///////////////////////////////////////////////

  deleteFromCart: function(req, res, next) {
    db.incart.delete_from_cart([req.params.incartid], function(err, response) {
      if (err) {
        console.log('Error deleting product from cart: ', err);
        return res.status(500).send(err);
      }
      return res.status(200).send('Product deleted succesfully');
    });
  }

}
