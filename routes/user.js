var user = require('../models/userModel');

module.exports = {
  configure: function(app) {
    //Route user

    //Melihat profile klien
    app.get('/user/profile', function(req, res) {
      user.getProfile(req,res);
    });

    //Mengisi profile klien
    app.post('/user/profile', function(req, res) {
      user.postProfile(req,res);
    });

    //Melihat Booking user
    app.get('/user/booking', function(req, res) {
      user.getUserBooking(req,res);
    });

    //Melihat History Booking
    app.get('/user/historyTrip', function(req, res) {
      user.getUserHistoryTrip(req,res);
    });

  }
};
