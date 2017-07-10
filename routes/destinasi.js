var destinasi = require('../models/destinasiModel');

module.exports = {
  configure: function(app) {
    //Route Destinasi

    //Melihat semua destinasi provider
    app.get('/destinasi', function(req, res) {
      destinasi.getAllDestination(req,res);
    });

    //Menambah Destinasi
    app.post('/destinasi/add', function(req, res) {
      destinasi.addDestination(req, res);
    });

    //Melihat hasil Menambah Destinasi
    app.get('/destinasi/tripactivity', function(req, res) {
      destinasi.getLatestDestination(req, res);
    });

    //Menambah Detail Activity Destinasi
    app.post('/destinasi/tripactivity', function(req, res) {
      destinasi.postTripActivity(req, res);
    });

    //Mengedit Destinasi
    app.post('/destinasi/edit', function(req, res) {
      destinasi.editDestination(req, res);
    });

    //Melihat detail destinasi
    app.get('/destinasi/get/:id', function(req, res) {
      destinasi.getDestination(req, res);
    });

    //Menghapus destinasi
    app.delete('/destinasi/delete/:id', function(req, res) {
      destinasi.deleteDestination(req, res);
    });

    //Melihat semua booking Trip
    app.get('/destinasi/booking/:id_trip', function(req, res) {
      destinasi.getDestinationBooking(req,res);
    });

    //Menerima booking
    app.post('/destinasi/accept/:id_booking', function(req, res) {
      destinasi.acceptDestinationBooking(req, res);
    });

    //Destinasi sudah selesai
    app.post('/destinasi/finish/:id_booking', function(req, res) {
      destinasi.finishDestinationBooking(req, res);
    });

    //Melihat Review Trip
    app.get('/destinasi/review/:id_trip', function(req, res) {
      destinasi.getDestinationReview(req,res);
    });

  }
};
