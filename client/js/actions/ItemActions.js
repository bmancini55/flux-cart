
let dispatcher = require('../dispatcher');
let client     = require('../utils/ItemClient');


// items_load_start
// items_load_fail
// items_load_success

module.exports = {
  loadItems: function() {
    client.loadItems((err, items) => {
      if(err) dispatcher.dispatch({ actionType: 'items_load_fail', error: err });
      else    dispatcher.dispatch({ actionType: 'items_load_success', payload: { items: items } });
    });

  },

  loadItemById: function(id) {
    client.loadItemById(id, (err, item) => {
      if(err) dispatcher.dispatch({ actionType: 'item_byid_fail', error: err});
      else    dispatcher.dispatch({ actionType: 'item_byid_success', payload: { item: item }});
    });
  }

};
