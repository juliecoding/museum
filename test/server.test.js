var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/index');
var expect = require('chai').expect;
var foo = 'bar';
var beverages = { tea: ['chai', 'matcha', 'oolong'] };

chai.use(chaiHttp);


/********************PRODUCTS********************/

/*****GET*****/
describe('Products', function() {
  var id = 1

  it('should list ALL products on /api/products GET', function(done) {
    chai.request(server)
      .get('/api/products')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.be.a('object');
        expect(res.body[0].name).to.equal("Japanese Wave Pattern Bowl");
        expect(res.body[0]).to.have.property('price');
        expect(res.body[0].price).to.be.above(0);
        done();
      })
  });
  it('should list SINGLE product on /api/products/:id GET', function(done) {
    chai.request(server)
      .get('/api/products/' + id) //HOW TO TEST?!
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.price).to.be.number;
        expect(res.body[0]).to.be.a('object');
        done();
      })
  });

  /*****POST*****/
  it('should add a SINGLE product on /api/products POST', function(done) {
    chai.request(server)
      .post('/api/products')
      .send({ 'name': 'Java', 'price': '100' })
      .end(function(err, res) {
        console.log(res.body)
        expect(res).to.have.status(200);
        //expect(res).to.be(json);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('SUCCESS');
        // res.body.SUCCESS.should.be.a('object');
        // res.body.SUCCESS.should.have.property('name');
        // res.body.SUCCESS.should.have.property('lastName');
        // res.body.SUCCESS.should.have.property('_id');
        // res.body.SUCCESS.name.should.equal('Java');
        // res.body.SUCCESS.lastName.should.equal('Script');
        done();
      });
  });


  /*****PUT*****/
  //   it('should update a SINGLE product on /api/products PUT', function(done) {
  //     chai.request(server)
  //     .get('/api/products')
  //     .end(function(err, res) {
  //       chai.request(server)
  //         .put('/api/products'+res.body[0].id)
  //         .send({'name': 'Spider'})
  //         .end(function(err, res) {
  //           expect(res).to.have.status(200);
  //           expect(res).to.be.json;
  //           expect(res.body).to.be.a('object');
  //           expect(res.body).to.have.property('UPDATED');
  //           expect(res.body).UPDATED.to.be.a('object');
  //           expect(res.body).UPDATED.to.have.property('name');
  //           expect(res.body).UPDATED.name.to.equal('Spider');
  //         })
  //     })
  //   })
})

/********************ORDERS********************/
// describe('Orders', function() {
//   it('should list ALL orders on /api/orders/ GET', function(done) {
//     chai.request(server)
//     .get('/api/orders')
//     .end(function (err, res) {
//
//       done();
//     })
//   })
//   it('should list SINGLE order on /api/orders/:id GET', function(done) {
//     chai.request(server)
//     .get('/api/orders')
//     .end(function (err, res) {
//
//       done();
//     })
//   })
// })
//
//
// /********************USERS********************/
// describe('Users', function() {
//
// /*****GET*****/
//   it('should list ALL orders on /api/users/ GET', function(done) {
//     chai.request(server)
//     .get('/api/users')
//     .end(function(err, res) {
//
//       done();
//     })
//   })
//   it('should list SINGLE user on /api/users/:id GET', function(done) {
//     chai.request(server)
//     .get('/api/users')
//     .end(function(err, res) {
//
//       done();
//     })
//   })
// /*****POST*****/
//
//
//
// /*****PUT*****/
//   // it('should update a SINGLE product on /api/products PUT', function(done) {
//   //   chai.request(server)
//   //   .get('/api/products')
//   //   .end(function(err, res) {
//   //     chai.request(server)
//   //       .put('/api/products'+res.body[0]._id)
//   //       .send({'name': 'Spider'})
//   //   })
//   // })
// })