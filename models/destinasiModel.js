var connection = require('../connection');
var moment = require('moment');
var secretKey = require('../config');
var jwt       =   require('jsonwebtoken');
var ImageSaver  =   require('image-saver-nodejs/lib');

function Destinasi() {

  this.getAllDestination = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
        }
        else {
          con.query('SELECT * FROM trips WHERE status=1 and id_travel=?',result[0].id_travel, function(err, result) {
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

  this.addDestination = function(req, res) {
    connection.acquire(function(err, con) {
      console.log(req);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';

      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else {
          var imageSaver = new ImageSaver();
          var pictname = new Date().getTime();
          imageSaver.saveFile("public/image/provider/destinasi/"+pictname+".jpg", req.body.foto_destinasi)
          .then((data)=>{
            var imagePath = "http://indoexplore.yippytech.com/images/destinasi/"+pictname+".jpg";
            console.log(imagePath);
            var creds1 = [result[0].id_travel,req.body.trip_name, req.body.location, req.body.quota, req.body.price, req.body.description, req.body.include_needs, req.body.exclude_needs, req.body.id_type_trip, req.body.id_category_trip, req.body.start_date, req.body.finish_date, req.body.days, req.body.nights, imagePath];
            console.log(creds1);
            var query1 = 'INSERT INTO trips (id_travel, trip_name, location, quota, price, description, include_needs, exclude_needs, id_type_trip, id_category_trip, start_date, finish_date, days, nights, photo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

              if (result.length==0) {
                res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
              }
              else {
                con.query(query1, creds1, function(err, result) {
                  con.release();
                  if (err) {
                    res.send({status: 400, message: err});
                  } else {
                    res.send({status: 200, message: 'Insert successfully'});
                  }
                });
              }
            console.log("upload photo success");
          })

          .catch((err)=>{
            res.json({status:400,message:err});
          })
        }
      });
    });
  };

  this.getLatestDestination = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
        }
        else {
          con.query('SELECT * FROM trips WHERE status=0 AND id_travel=? ORDER BY id_trip DESC LIMIT 1',result[0].id_travel, function(err, result) {
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

  this.postTripActivity = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
        }
        else {
          con.query('SELECT * FROM trips WHERE status=0 AND id_travel=? AND id_trip=? ',[result[0].id_travel,req.body.id_trip], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                con.query('UPDATE trips SET hour_activity = ?, detail_activity = ?, status=1 WHERE id_trip = ?', [req.body.hour_activity,req.body.detail_activity,req.body.id_trip], function(err,result1) {
                  if (err) {
                    res.send({status: 400, message: 'Fill failed'});
                  }
                  else{
                    res.send({status: 200, message: 'Fill Trip Activity successfully'});
                  }
                });
              }
              else {
                res.send({status: 400, message: 'Filled'});
              }
          });
        }
      });
    });
  };

  this.getDestination = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
        }
        else {
          con.query('SELECT * FROM trips WHERE status=1 AND id_travel=? AND id_trip=?',[result[0].id_travel, req.params.id], function(err, result) {
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

  this.deleteDestination = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
        }
        else {
          con.query('DELETE FROM trips WHERE status=1 AND id_travel=? AND id_trip=?',[result[0].id_travel, req.params.id], function(err) {
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

  this.editDestination = function(req, res) {
    connection.acquire(function(err, con) {
      console.log(req);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';

      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else {
          con.query('SELECT id_travel FROM trips WHERE status=1 AND id_travel=? AND id_trip=?',[result[0].id_travel, req.body.id_trip], function(err, result) {
            if (err) {
              res.send({status: 400, message: 'Get Failed'});
            }
            else if (result.length!=0) {
              var imageSaver = new ImageSaver();
              var pictname = new Date().getTime();
              imageSaver.saveFile("public/image/provider/destinasi/"+pictname+".jpg", req.body.foto_destinasi)
              .then((data)=>{
                var imagePath = "http://indoexplore.yippytech.com/images/destinasi/"+pictname+".jpg";
                console.log(imagePath);
                var creds1 = [result[0].id_travel,req.body.trip_name, req.body.location, req.body.quota, req.body.price, req.body.description, req.body.include_needs, req.body.exclude_needs, req.body.id_type_trip, req.body.id_category_trip, req.body.start_date, req.body.finish_date, req.body.days, req.body.nights, imagePath];
                console.log(creds1);
                var query1 = 'INSERT INTO trips (id_travel,trip_name, location, quota, price, description, include_needs, exclude_needs, id_type_trip, id_category_trip, start_date, finish_date, days, nights, photo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

                  if (result.length==0) {
                    res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
                  }
                  else {
                    con.query(query1, creds1, function(err, result) {
                      con.release();
                      if (err) {
                        res.send({status: 400, message: err});
                      } else {
                        con.query('DELETE FROM trips WHERE id_trip=?', [req.body.id_trip], function(err) {
                          if (err) {
                            res.send({status: 400, message: 'Edit failed'});
                          }
                          else{
                            res.send({status: 200, message: 'Edit successfully'});
                          }
                        });
                      }
                    });
                  }
                console.log("upload photo success");
              })

              .catch((err)=>{
                res.json({status:400,message:err});
              })
            }
          });
        }
      });
    });
  };

  this.getDestinationBooking = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
        }
        else {
          con.query('SELECT * FROM bookings WHERE id_status_trip=1 OR id_status_trip=2 OR id_status_trip=3 OR id_status_trip=5 AND id_trip=?',[req.params.id_trip], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: err});
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

  this.acceptDestinationBooking = function(req,res) {
    connection.acquire(function(err, con) {
      // console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
        }
        else {
          con.query('SELECT * FROM bookings WHERE id_status_trip=1 AND id_booking=?',[req.params.id_booking], function(err, result1) {
            con.release();
            //res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result1.length) {
                con.query('UPDATE bookings SET id_status_trip = 2 WHERE id_booking = ?', [req.params.id_booking], function(err) {
                  if (err) {
                    res.send({status: 400, message: 'Accept Destination failed' });
                  }
                  else{
                    res.send({status: 200, message: 'Accept Destination successfully'});
                  }
                });
              }
              else {
                res.send({status: 400, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.finishDestinationBooking = function(req,res) {
    connection.acquire(function(err, con) {
      // console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
        }
        else {
          con.query('SELECT * FROM bookings WHERE id_status_trip=2 AND id_booking=?',[req.params.id_booking], function(err, result1) {
            con.release();
            //res.send(result);
              if (err) {
                res.send({status: 400, message: 'Get Failed'});
              }
              else if(result1.length) {
                con.query('UPDATE bookings SET id_status_trip = 3 WHERE id_booking = ?', [req.params.id_booking], function(err) {
                  if (err) {
                    res.send({status: 400, message: 'Finish Destination failed' });
                  }
                  else{
                    res.send({status: 200, message: 'Finish Destination successfully'});
                  }
                });
              }
              else {
                res.send({status: 400, message: 'Finished Destination'});
              }
          });
        }
      });
    });
  };

  this.getDestinationReview = function(req,res) {
    connection.acquire(function(err, con) {
      console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id_travel FROM users,providerdetails WHERE users.id = ? AND users.id = providerdetails.id';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 400, message: 'Failed get id travel'});
        }
        else if (result.length==0) {
          res.send({status: 400, message: 'Anda belum terdaftar sebagai provider'});
        }
        else {
          con.query('SELECT * FROM reviews WHERE id_trip=?',[req.params.id_trip], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 400, message: err});
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

}

module.exports = new Destinasi();
