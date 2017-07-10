var admin = require('../models/adminModel');

module.exports = {
  configure: function(app) {
    //Route user

    //Melihat semua trip
    app.get('/admin/viewAllTrip', function(req, res) {
      admin.getAllTrip(req,res);
    });

    //Melihat trip
    app.get('/admin/viewTrip/:id_trip', function(req, res) {
      admin.getTripById(req,res);
    });

    //Menghapus trip
    app.delete('/admin/deleteTrip/:id_trip', function(req, res) {
      admin.deleteTripById(req, res);
    });

    //Melihat semua booking
    app.get('/admin/viewAllBooking', function(req, res) {
      admin.getAllBooking(req,res);
    });

    //Melihat booking
    app.get('/admin/viewBooking/:id_booking', function(req, res) {
      admin.getBookingById(req,res);
    });

    //Membatalkan booking
    app.post('/admin/cancelBooking/:id_booking', function(req, res) {
      admin.cancelBookingById(req,res);
    });

    //Melihat semua user
    app.get('/admin/viewAllUser', function(req, res) {
      admin.getAllUser(req,res);
    });

    //Melihat user
    app.get('/admin/viewUser/:id', function(req, res) {
      admin.getUserById(req,res);
    });

    //Menghapus trip
    app.delete('/admin/deleteUser/:id', function(req, res) {
      admin.deleteUserById(req,res);
    });

    //Melihat semua provider
    app.get('/admin/viewAllProvider', function(req, res) {
      admin.getAllProvider(req,res);
    });

    //Melihat semua provider
    app.get('/admin/viewProvider/:id_travel', function(req, res) {
      admin.getProviderById(req,res);
    });

    //Menghapus trip
    app.post('/admin/deleteProvider/:id_travel/:id', function(req, res) {
      admin.deleteProviderById(req,res);
    });

  }
};
