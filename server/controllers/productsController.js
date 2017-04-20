var app = require('./../index');
var db = app.get('db');
//var products = require('./stagedDataProducts.js');

module.exports = {

  getProducts: function(req, res) {
    db.product.read_all(function(err, products) {
      if (err) {
        console.log('Error getting products: ', err);
        return res.status(500).send(err);
      }
      res.status(200).json(products);
    });
  },

  getSingleProduct: function(req, res) {
    db.product.read_single([req.params.productid], function(err, product) {
      if (err) {
        console.log('Error getting single product: ', err);
        return res.status(500).send(err);
      }
      res.status(200).json(product);
    })
  },

  // addProduct: function(req, res) {
  //   db.product.insert([], function(err, product) {
  //     if (err) {
  //       console.log('Error adding product: ', err);
  //       return res.status(500).send(err);
  //     }
  //     res.status(200).json(product);
  //   });
  // },

  // updateProduct: function(req, res) {
  //   db.product.update_qty([], function(err, product) {
  //     if (err) {
  //       console.log('Error updating product: ', err);
  //       return res.status(500).send(err);
  //     }
  //
  //     res.status(200).json(product);
  //   });
  // },

  // deleteProduct: function(req, res) {
  //   db.order.remove([], function(err, product) {
  //     if (err) {
  //       console.log('Error removing product: ', err);
  //       return res.status(500).send(err);
  //     }
  //     res.status(200).json(product);
  //   })
  // }

}
