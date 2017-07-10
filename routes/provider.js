var provider = require('../models/providerModel');

module.exports = {
  configure: function(app) {
    //Route provider

    //Mendaftar provider
    app.post('/provider/register', function(req, res) {
      provider.registerProvider(req, res);
    });

    //Melihat profil provider
    app.get('/provider/profile', function(req, res) {
      provider.profileProvider(req, res);
    });

    //Mengedit profile provider
    app.post('/provider/update', function(req, res) {
      provider.updateProvider(req, res);
    });

  }
};
