var connection = require('../connection');
var moment = require('moment');
var secretKey = require('../config');
var jwt       =   require('jsonwebtoken');
var ImageSaver  =   require('image-saver-nodejs/lib');

function Provider() {

  this.updateProvider = function(req, res) {
    connection.acquire(function(err, con) {

      var imageSaver = new ImageSaver();
      var pictname = new Date().getTime();
      imageSaver.saveFile("public/image/provider/ktp/"+pictname+".jpg", req.body.ktp)
      .then((data)=>{
        var imagePathKtp = "http://indoexplore.yippytech.com/images/provider/ktp/"+pictname+".jpg";
        imageSaver.saveFile("public/image/provider/logo/"+pictname+".jpg", req.body.photo)
        .then((data)=>{
          var imagePathLogo = "http://indoexplore.yippytech.com/images/provider/photo/"+pictname+".jpg";

        var creds1 = [req.body.name_travel,req.body.slogan, req.body.deskripsi, req.body.contact_phone,imagePathKtp,imagePathLogo, req.user_id];
        var query1 = 'UPDATE providerdetails SET name_travel=?, slogan=?, deskripsi=?,contact_phone=?, ktp=?,photo=? WHERE id=?';

          con.query(query1, creds1, function(err, result) {
            if (err) {
              res.send({status: 1, message: 'Data Failed'});
            }
            else {
              var creds2 = [req.user_id];
              var query2 = 'SELECT * FROM providerdetails WHERE id=?';
              con.query(query2, creds2, function(err, result2) {
                con.release();
                  if (err) {
                    res.send({status: 1, message: 'Update failed'});
                  } else {
                   res.send({status: 0, message: 'Update successfully',data:result2[0]});
                  }
              });
            }
          });
        })
      })
    });
  };

  this.profileProvider = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT name_travel,slogan,deskripsi,contact_phone,ktp,photo FROM providerdetails WHERE id = ?', [req.user_id], function(err, result) {
        con.release();
          if (err) {
            res.send({status: 400, message: 'Get failed'});
          }
          else if(result.length!=0) {
            res.send({status: 200, message: 'Data successfully', data:result});
          }
          else{
            res.send({status: 400, message: 'Data Not Found'});
          }
      });
    });
  };

  this.registerProvider = function(req, res) {
    // console.log(req);
    connection.acquire(function(err, con) {

      var creds2 = [req.user_id];
      var query2 = 'UPDATE users SET id_role=2 WHERE id=?';

      var imageSaver = new ImageSaver();
      var pictname = new Date().getTime();
      imageSaver.saveFile("public/image/provider/ktp/"+pictname+".jpg", req.body.ktp)
      .then((data)=>{
        var imagePathKtp = "http://indoexplore.yippytech.com/images/provider/ktp/"+pictname+".jpg";
        imageSaver.saveFile("public/image/provider/logo/"+pictname+".jpg", req.body.photo)
        .then((data)=>{
          var imagePathLogo = "http://indoexplore.yippytech.com/images/provider/photo/"+pictname+".jpg";

          var creds1 = [req.user_id, req.body.name_travel,req.body.slogan, req.body.deskripsi, req.body.contact_phone,imagePathKtp,imagePathLogo];
          console.log(creds1);
          var query1 = 'INSERT INTO providerdetails (id,name_travel,slogan,deskripsi,contact_phone,ktp,photo) VALUES (?,?,?,?,?,?,?)';

          con.query(query1, creds1, function(err, result) {
            if (err) {
              res.send({status: 1, message: 'Insert failed'});
            }
            else {
              con.query(query2, creds2, function(err, result) {
                con.release();
                if (err) {
                  res.send({status: 1, message: err});
                }
                else {
              	  var creds3 = [req.user_id];
              	  var query3 = "SELECT * FROM providerdetails WHERE id=?";
              	  con.query(query3, creds3, function(err, result3) {
                		if (err) {
                	     res.send({status: 1, message: err});
                  	}
                    else {
                		   res.send({status: 0, message: 'Insert successfully', data:result3[0]});
                		}
              	  });
                }
              });
            }
          });
        })
        .catch((err)=>{
          res.json({status:400,message:err});
        })
      })
      .catch((err)=>{
        res.json({status:400,message:err});
      })
    });
  };
}

module.exports = new Provider();
