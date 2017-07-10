var connection = require('../connection');
var moment = require('moment');
var secretKey = require('../config');
var jwt       =   require('jsonwebtoken');
var ImageSaver  =   require('image-saver-nodejs/lib');

function User() {

  this.getProfile = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT name, gender, phone FROM users JOIN userdetails ON users.id=userdetails.id WHERE users.id = ?', [req.user_id], function(err, result) {
        con.release();
          if (err) {
            res.send({status: 400, message: 'Get failed'});
          }
          else if(result.length!=0) {
            res.send({status: 200, message: 'Data successfully', data:result});
          }
          else{
            con.query('SELECT name FROM users WHERE id = ?', [req.user_id], function(err,result1) {
              if (err) {
                res.send({status: 400, message: 'Update failed'});
              }
              else{
                res.send({status: 200, message: 'Data successfully', data:result1});
              }
            });
          }
      });
    });
  };

  this.postProfile = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM userdetails WHERE id = ?', [req.user_id], function(err, result) {
        con.release();
          if (err) {
            res.send({status: 400, message: 'Get failed'});
          }
          else if(result.length) {
            con.query('UPDATE userdetails SET phone = ?, gender = ? WHERE id = ?', [req.body.phone,req.body.gender,req.user_id], function(err,result1) {
              if (err) {
                res.send({status: 400, message: 'Update failed'});
              }
              else{
                res.send({status: 200, message: 'Update successfully'});
              }
            });
          }
          else{
            con.query('INSERT INTO userdetails (phone, gender, id) VALUES (?,?,?)',[req.body.phone,req.body.gender,req.user_id], function(err) {
              if (err) {
                res.send({status: 400, message: 'Insert failed'});
              }
              else{
                res.send({status: 200, message: 'Insert successfully'});
              }
            });
          }
      });
    });
  };

  this.auth = function(req, res) {
    connection.acquire(function(err, con) {
      var generated_hash = require('crypto')
              						.createHash('md5')
              						.update(req.password, 'utf8')
              						.digest('hex');
			req.password = generated_hash;
      var creds = [req.email, req.password];
      var query = 'SELECT * FROM users WHERE email = ? and password = ?';

      con.query(query, creds, function(err, result) {
        con.release();

        if (err) {
          res.send({status: 1, message: 'Insert failed'});
        }
        else {
          if (result.length == 1) {
            if(req.login_type==1){ //Auth untuk Mobile
              var token = jwt.sign({
                                    user_id:result[0].id,
                                    email:result[0].email,
                                    role:result[0].id_role,
                                    login_type:req.login_type
                                  }
                                    ,secretKey.secret,{
                                  //no expires
                                  });
            }
            else if (req.login_type==2) { //Auth untuk Website
              var token = jwt.sign({
                                      user_id:result[0].id,
                                      email:result[0].email,
                                      role:result[0].id_role,
                                      login_type:req.login_type
                                    }
                                      ,secretKey.secret,{
                                        expiresIn : 60*60// expires in 24 hours
                                    });
            }

            if(result[0].id_role==2){
              var creds = [result[0].id];
              var query = 'SELECT * FROM users,providerdetails p WHERE users.id=? AND users.id=p.id';
              con.query(query, creds, function(err, result) {
                if (err) {
                  res.send({status: 400, message: 'Error'});
                }
                else {
                  res.send({status: 200, message: 'Login successfully',data: result[0], _token:token});
                }
              });
            }
            else if(result[0].id_role==3){
              var creds = [result[0].id];
              var query = 'SELECT * FROM users WHERE id_role=3 AND id=?';
              con.query(query, creds, function(err, result) {
                if (err) {
                  res.send({status: 400, message: 'Error'});
                }
                else {
                  res.send({status: 200, message: 'Login as Admin',data: result[0], _token:token});
                }
              });
            }
            else {
              res.send({status: 200, message: 'Login successfully',data: result[0], _token:token});
            }
          }
          else {
            res.send({status: 400, message: 'Email and password not match'});
          }
        }
      });
    });
  };

  this.createAccount = function(req, res) {
    connection.acquire(function(err, con) {
      var generated_hash = require('crypto')
              						.createHash('md5')
              						.update(req.password, 'utf8')
              						.digest('hex');
			req.password = generated_hash;
      var creds1 = [req.name,req.email, req.password];
      var query1 = 'insert into users (id_role,name,email,password) values (1,?, ?, ?)';

      var creds = [req.email];
      var query = 'SELECT * FROM users WHERE email = ?';

      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 1, message: 'Insert failed 1'});
        }
        else {
          if (result.length == 1) {
            res.send({status: 1, message: 'Email already taken'});
          }
          else {
            con.query(query1, creds1, function(err, result) {
              con.release();
                if (err) {
                  res.send({status: 1, message: err});
                }
                else {
                  res.send({status: 0, message: 'Insert successfully'});
                }
            });
          }
        }
      });
    });
  };

  this.getUserBooking = function(req,res) {
    connection.acquire(function(err, con) {
      // console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id FROM users WHERE id = ?';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 1, message: 'Failed get id'});
        }
        else if (result.length==0) {
          res.send({status: 1, message: 'Data Not Found'});
        }
        else {
          con.query('SELECT * FROM bookings WHERE id=? AND id_status_trip!=5',[req.user_id], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 1, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 0, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 1, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

  this.getUserHistoryTrip = function(req,res) {
    connection.acquire(function(err, con) {
      // console.log(con);
      var creds = [req.user_id];
      var query = 'SELECT id FROM users WHERE id = ?';
      con.query(query, creds, function(err, result) {
        if (err) {
          res.send({status: 1, message: 'Failed get id'});
        }
        else if (result.length==0) {
          res.send({status: 1, message: 'Data Not Found'});
        }
        else {
          con.query('SELECT * FROM bookings WHERE id=? AND id_status_trip=5',[req.user_id], function(err, result) {
            con.release();
            // res.send(result);
              if (err) {
                res.send({status: 1, message: 'Get Failed'});
              }
              else if(result.length!=0) {
                res.send({status: 0, message: 'Data successfully',data:result});
              }
              else {
                res.send({status: 1, message: 'Data Not Found'});
              }
          });
        }
      });
    });
  };

}

module.exports = new User();
