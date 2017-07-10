var booking = require('../models/bookingModel');

module.exports = {
  configure: function(app) {
    //Route booking

    //Memesan Jasa pariwisata
    app.post('/booking/register', function(req, res) {
      booking.postBooking(req,res);
    });

    //Konfirmasi pembayaran Trip
    app.post('/booking', function(req, res) {
      booking.postConfirmBooking(req,res);
    });

    //Review trip ketika trip sudah selesai
    app.post('/booking/review', function(req, res) {
      booking.postReviewBooking(req,res);
    });

  }
};
