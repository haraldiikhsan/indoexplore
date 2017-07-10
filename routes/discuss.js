var discuss = require('../models/discussModel');

module.exports = {
  configure: function(app) {
    //Route discuss

    //mengirim diskusi
    app.post('/discuss/post/:id_trip', function(req, res) {
      discuss.postDiscussTrip(req, res);
    });

    //Melihat semua diskusi trip
    app.get('/discuss/:id_trip', function(req, res) {
      discuss.getDiscussTrip(req, res);
    });

    //Mengedit diskusi trip
    app.put('/discuss/edit/:id_discuss', function(req, res) {
      discuss.updateDiscussTrip(req, res);
    });

    //Menghapus diskusi trip
    app.delete('/discuss/delete/:id_discuss', function(req, res) {
      discuss.deleteDiscussTrip(req, res);
    })

  }
};
