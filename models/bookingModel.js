var connection = require('../connection');
var moment = require('moment');
var secretKey = require('../config');
var jwt       =   require('jsonwebtoken');
var ImageSaver  =   require('image-saver-nodejs/lib');
var randomstring = require("randomstring");

function Booking() {
  this.postBooking = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT price FROM trips WHERE status = 1 AND id_travel = ? AND id_trip = ?', [req.body.id_travel, req.body.id_trip], function(err, result) {
        con.release();
          if (err) {
            res.send({status: 400, message: 'Get failed'});
          }
          else if(result.length) {
            var booking_code = randomstring.generate({
                                                      length: 5,
                                                      charset: 'alphanumeric',
                                                      capitalization : 'uppercase'
                                                    });
            // var due_date_confirm_payment = new Date();
            var today = moment();
            var tomorrow = moment(today).add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
            var total_payment = result[0].price*req.body.number_of_participants;
            var creds = [req.body.id_trip,req.user_id, booking_code, tomorrow, req.body.number_of_participants, req.body.name_participant, req.body.age_participant, total_payment, req.body.id_payment_method];
            // due_date_confirm_payment.setDate(due_date_confirm_payment.getDate() + 1);
            console.log(tomorrow);
            var query = 'INSERT INTO bookings (id_trip, id, booking_code, due_date_confirm_payment, number_of_participants, name_participant, age_participant, total_payment, id_payment_method,id_status_payment) VALUES (?,?,?,?,?,?,?,?,?,1)';
            con.query(query, creds, function(err) {
              if (err) {
                res.send({status: 400, message: err});
              }
              else{
                res.send({status: 200, message: 'Booking successfully'});
              }
            });
          }
          else{
            res.send({status: 400, message: 'Data not match'});
          }
      });
    });
  };

  this.postConfirmBooking = function(req,res) {
    connection.acquire(function(err, con) {
      // console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id FROM users WHERE id = ?';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 1, message: 'Failed get id'});
        }
        else if (result.length==0) {
          res.send({status: 1, message: 'Anda belum terdaftar'});
        }
        else {
          con.query('SELECT * FROM bookings WHERE id_status_payment=1 AND id_booking=? AND id=? AND id_trip=?',[req.body.id_booking,req.user_id,req.body.id_trip], function(err, result1) {
            con.release();
            //res.send(result);
              if (err) {
                res.send({status: 1, message: 'Get Failed'});
              }
              else if(result1.length!=0) {
                var today = moment().format("YYYY-MM-DD HH:mm:ss");
                con.query('UPDATE bookings SET id_status_trip = 1, id_status_payment = 2 WHERE id_booking = ? AND id = ? AND id_trip=? AND ? >= ?', [req.body.id_booking,req.user_id,req.body.id_trip, result1[0].due_date_confirm_payment,today], function(err) {
                  if (err) {
                    res.send({status: 400, message: 'Confirm Payment failed'});
                  }
                  else{
                    var query = 'INSERT INTO confirmpayments (id_booking, id_trip, id, id_status_trip, id_status_payment, id_payment_method, total_payment,due_date_confirm_payment,	date_confirm_payment) VALUES (?,?,?,?,?,?,?,?,?)';
                    var creds = [result1[0].id_booking, result1[0].id_trip, result1[0].id, 1, result1[0].id_status_payment, result1[0].id_payment_method, result1[0].total_payment,result1[0].due_date_confirm_payment,today];
                    con.query(query, creds, function(err) {
                      if (err) {
                        res.send({status: 400, message: 'Confirm Payment Failed'});
                      }
                      else{
                        res.send({status: 200, message: 'Confirm Payment successfully'});
                      }
                    });
                  }
                });
              }
              else {
                res.send({status: 400, message: 'Payment confirmed'});
              }
          });
        }
      });
    });
  };

  this.postReviewBooking = function(req,res) {
    connection.acquire(function(err, con) {
      // console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id FROM users WHERE id = ?';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 1, message: 'Failed get id'});
        }
        else if (result.length==0) {
          res.send({status: 1, message: 'Anda belum terdaftar'});
        }
        else {
          con.query('SELECT * FROM bookings WHERE id_status_trip=3 AND id_booking=? AND id=? AND id_trip=?',[req.body.id_booking,req.user_id,req.body.id_trip], function(err, result1) {
            con.release();
            //res.send(result);
              if (err) {
                res.send({status: 1, message: 'Get Failed'});
              }
              else if(result1.length!=0) {
                con.query('UPDATE bookings SET id_status_trip = 5 WHERE id_booking = ? AND id = ? AND id_trip=?', [req.body.id_booking,req.user_id,req.body.id_trip], function(err) {
                  if (err) {
                    res.send({status: 400, message: 'Confirm Payment failed'});
                  }
                  else{
                    con.query('INSERT INTO reviews (id, id_trip, content, rate) VALUES (?,?,?,?)', [req.user_id,req.body.id_trip,req.body.content,req.body.rate], function(err) {
                      if (err) {
                        res.send({status: 400, message: 'Post review failed'});
                      }
                      else{
                        res.send({status: 200, message: 'Post review successfully'});
                      }
                    });
                  }
                });
              }
              else {
                res.send({status: 400, message: 'Review Posted'});
              }
          });
        }
      });
    });
  };

}

module.exports = new Booking();
