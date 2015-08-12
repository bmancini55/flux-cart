
let React       = require('react');
let Router      = require('react-router');
let ItemStore   = require('../stores/ItemStore');
let ItemActions = require('../actions/ItemActions');

let ItemDetails = React.createClass({

  mixins: [
    Router.State
  ],

  componentDidMount: function() {
    ItemStore.addChangeListener(this.onChange);
    let itemId = this.getParams().itemId;
    ItemActions.loadItemById(itemId);
  },

  componentWillUnmount: function() {
    ItemStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    let state = this.mergeStoreState(this.state);
    this.setState(state);
  },

  mergeStoreState: function(state) {
    let storeState = ItemStore.getState();
    let items = storeState.items;
    let keys = Object.keys(items);
    let item = items[keys[0]];
    return Object.assign(state, {
      item: item
    });
  },

  getInitialState: function() {
    return this.mergeStoreState({});
  },

  render: function() {
    let itemDisplay;
    let item = this.state.item;
    if(!item) {
      itemDisplay = (
        <div>Loading item</div>
      );
    }
    else {
      itemDisplay = (
        <div className="item-details">
          <div className="row">
            <div className="col-sm-6">
              <div className="item-img">
                <img className="img-responsive" src={item.imagePath} />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-12">
                  <div className="item-header">
                    <h1 className="title">{item.title}</h1>
                    <h4 className="text-muted publisher">{item.publisher}</h4>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="price-container">
                    <div className="price">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return itemDisplay;
  }

});

module.exports = ItemDetails;
