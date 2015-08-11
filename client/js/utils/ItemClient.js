
let request = require('superagent');

module.exports = {
  loadItems: function(callback) {
    request
      .get('/api/items')
      .end((err, res) => callback(err, res.body));
  },

  loadItemById: function(id, callback) {
    request
      .get('/api/items/' + id)
      .end((err, res) => callback(err, res.body));
  }
};
