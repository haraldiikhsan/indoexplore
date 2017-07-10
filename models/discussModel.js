var connection = require('../connection');
var moment = require('moment');
var secretKey = require('../config');
var jwt       =   require('jsonwebtoken');
var ImageSaver  =   require('image-saver-nodejs/lib');
var randomstring = require("randomstring");

function Discuss() {
  this.postDiscussTrip = function(req, res) {
    connection.acquire(function(err, con) {
      var creds = [req.user_id];
      var query = 'SELECT id FROM users WHERE id = ?';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Invalid id'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar'});
        }
        else {
          con.query('SELECT id_trip FROM trips WHERE status = 1 AND id_trip = ?', [req.params.id_trip], function(err, result) {
            con.release();
              if (err) {
                res.send({status: 400, message: 'Invalid Trip'});
              }
              else if(result.length) {
                var creds = [req.params.id_trip,req.user_id, req.body.subject, req.body.content];
                var query = 'INSERT INTO discusses (id_trip, id, subject, content) VALUES (?,?,?,?)';
                con.query(query, creds, function(err) {
                  if (err) {
                    res.send({status: 400, message: 'Post discuss Failed'});
                  }
                  else{
                    res.send({status: 200, message: 'Post discuss successfully'});
                  }
                });
              }
              else{
                res.send({status: 400, message: 'Data not match'});
              }
          });
        }
      });
    });
  };

  this.getDiscussTrip = function(req,res) {
    connection.acquire(function(err, con) {
      var creds = [req.user_id];
      var query = 'SELECT id FROM users WHERE id = ?';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Invalid id'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar'});
        }
        else {
          con.query('SELECT id_trip FROM trips WHERE status = 1 AND id_trip = ?', [req.params.id_trip], function(err, result) {
            con.release();
              if (err) {
                res.send({status: 400, message: 'Invalid Trip'});
              }
              else if(result.length) {
                var creds = [req.params.id_trip];
                var query = 'SELECT * FROM discusses WHERE id_trip = ?';
                con.query(query, creds, function(err, result) {
                  if (err) {
                    res.send({status: 400, message: 'Get discuss Failed'});
                  }
                  else{
                    res.send({status: 200, message: 'Get discuss successfully', data:result});
                  }
                });
              }
              else{
                res.send({status: 400, message: 'Data not match'});
              }
          });
        }
      });
    });
  };

  this.updateDiscussTrip = function(req, res) {
    connection.acquire(function(err, con) {
      var creds = [req.user_id];
      var query = 'SELECT id FROM users WHERE id = ?';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Invalid id'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar'});
        }
        else {
          con.query('SELECT id_discuss FROM discusses WHERE id_discuss = ? AND id = ?', [req.params.id_discuss,req.user_id], function(err, result) {
            con.release();
              if (err) {
                res.send({status: 400, message: 'Invalid id'});
              }
              else if(result.length) {
                var creds = [req.body.subject, req.body.content,req.params.id_discuss];
                var query = 'UPDATE discusses SET subject = ?, content = ? WHERE id_discuss = ?';
                con.query(query, creds, function(err) {
                  if (err) {
                    res.send({status: 400, message: 'Update discuss Failed'});
                  }
                  else{
                    res.send({status: 200, message: 'Update discuss successfully'});
                  }
                });
              }
              else{
                res.send({status: 400, message: 'Data not match'});
              }
          });
        }
      });
    });
  };

  this.deleteDiscussTrip = function(req, res) {
    connection.acquire(function(err, con) {
      var creds = [req.user_id];
      var query = 'SELECT id FROM users WHERE id = ?';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Invalid id'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar'});
        }
        else {
          con.query('SELECT id_discuss FROM discusses WHERE id_discuss = ? AND id = ?', [req.params.id_discuss,req.user_id], function(err, result) {
            con.release();
              if (err) {
                res.send({status: 400, message: 'Invalid id'});
              }
              else if(result.length) {
                var creds = [req.params.id_discuss];
                var query = 'DELETE FROM discusses WHERE id_discuss = ?';
                con.query(query, creds, function(err) {
                  if (err) {
                    res.send({status: 400, message: 'Delete discuss Failed'});
                  }
                  else{
                    res.send({status: 200, message: 'Delete discuss successfully'});
                  }
                });
              }
              else{
                res.send({status: 400, message: 'Data not match'});
              }
          });
        }
      });
    });
  };

}

module.exports = new Discuss();
