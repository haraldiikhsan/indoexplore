var connection = require('../connection');
var moment = require('moment');
var secretKey = require('../config');
var jwt       =   require('jsonwebtoken');
var ImageSaver  =   require('image-saver-nodejs/lib');

function Admin() {

  this.getAllTrip = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('SELECT * FROM trips where status=1', function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.getTripById = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('SELECT * FROM trips where status=1 AND id_trip=?',[req.params.id_trip], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.deleteTripById = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('DELETE FROM trips WHERE status=1 AND id_trip=?',[req.params.id_trip], function(err) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Delete successfully'});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.getAllBooking = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('SELECT * FROM bookings', function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.getBookingById = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('SELECT * FROM bookings WHERE id_booking=?',[req.params.id_booking], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.cancelBookingById = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('UPDATE bookings SET id_status_trip=4 WHERE id_booking=?',[req.params.id_booking], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Cancel successfully'});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.getAllUser = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('SELECT * FROM users WHERE id_role=1', function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.getUserById = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('SELECT * FROM users WHERE id_role=1 AND id=?',[req.params.id], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.deleteUserById = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('DELETE FROM users WHERE id_role=1 AND id=?',[req.params.id], function(err) {
            con.release();
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Delete successfully'});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.getAllProvider = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('SELECT * FROM users,providerdetails WHERE users.id = providerdetails.id AND users.id_role=2', function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.getProviderById = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get data'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Forbidden Access'});
        }
        else {
          con.query('SELECT * FROM users,providerdetails WHERE users.id = providerdetails.id AND users.id_role=2 AND id_travel=?',[req.params.id_travel], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 200, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.deleteProviderById = function(req, res) {
    connection.acquire(function(err, con) {
      var creds = [req.user_id];
      var query = 'SELECT * FROM users WHERE id = ? AND id_role=3';

      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else {
          con.query('SELECT * FROM users,providerdetails WHERE users.id = providerdetails.id AND users.id_role=2 AND id_travel=?',[req.params.id_travel], function(err, result) {
            if (err) {
              res.send({status: 400, message: 'Get Failed'});
            }
            else if (result.length!=0) {
              var creds1 = [req.params.id];
              var query1 = 'UPDATE users SET id_role = 1 WHERE id = ?';
              if (result.length==0) {
                res.send({status: 400, message: 'Provider Not Found'});
              }
              else {
                con.query(query1, creds1, function(err, result) {
                  con.release();
                  if (err) {
                    res.send({status: 400, message: err});
                  } else {
                    con.query('DELETE FROM providerdetails WHERE id_travel=?',[req.params.id_travel], function(err) {
                      if (err) {
                        res.send({status: 400, message: 'Delete failed'});
                      }
                      else{
                        res.send({status: 200, message: 'Delete successfully'});
                      }
                    });
                  }
                });
              }
            }
            else{
              res.send({status: 400, message: 'Data Not Found'});
            }
          });
        }
      });
    });
  };

}

module.exports = new Admin();
