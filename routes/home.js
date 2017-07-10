var home = require('../models/homeModel');

module.exports = {
  configure: function(app) {
    //Route user

    //Melihat homepage
    app.get('/home', function(req, res) {
      home.getHomepage(req,res);
    });

    //Melihat detail trip
    app.get('/home/trip/:id_trip', function(req, res) {
      home.getDetailTrip(req,res);
    });

  }
};
