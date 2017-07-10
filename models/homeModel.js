var connection = require('../connection');
var moment = require('moment');
var secretKey = require('../config');
var jwt       =   require('jsonwebtoken');
var ImageSaver  =   require('image-saver-nodejs/lib');

function Home() {

  this.getHomepage = function(req,res) {
    connection.acquire(function(err, con) {
      var query = 'SELECT * FROM trips WHERE status=1';
      con.query(query, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length!=0) {
          res.send({status: 200, message: 'Data successfully',data:result});
        }
        else {
          res.send({status: 400, message: 'Data Not Found'});
        }
      });
    });
  };

  this.getDetailTrip = function(req,res) {
    connection.acquire(function(err, con) {
      var creds = [req.params.id_trip];
      var query = 'SELECT * FROM trips WHERE status=1 AND id_trip=?';
      con.query(query,creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length!=0) {
          res.send({status: 200, message: 'Data successfully',data:result});
        }
        else {
          res.send({status: 400, message: 'Data Not Found'});
        }
      });
    });
  };

}

module.exports = new Home();
