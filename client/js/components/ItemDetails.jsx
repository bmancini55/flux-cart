
let React       = require('react');
let Router      = require('react-router');
let classnames  = require('classnames');
let ItemStore   = require('../stores/ItemStore');
let ItemActions = require('../actions/ItemActions');
let CartActions = require('../actions/CartActions');

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
    return this.mergeStoreState({
      qty: 1,
      qtyInvalid: false
    });
  },

  render: function() {
    let itemDisplay;
    let item       = this.state.item;
    let qty        = this.state.qty;
    let qtyInvalid = this.state.qtyInvalid;
    let qtyClasses = classnames({
      'form-group': true,
      'has-error': qtyInvalid
    });
    let btnClasses = classnames({
      'btn': true,
      'btn-primary': true,
      'disabled': qtyInvalid
    });

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
                    <p className="price">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="actions-container">
                    <form className="form-inline">
                      <div className="form-group">
                        <button className={btnClasses} onClick={this.addToCart}>Add to Cart</button>
                      </div>
                      <div className={qtyClasses}>
                        <input className="form-control qty-input" value={qty} onChange={this.qtyChanged} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return itemDisplay;
  },

  qtyChanged: function(e) {
    let qty      = e.target.value;
    let isNumber = /^\d+$/.test(qty);
    let isSize   = parseInt(qty) < 10;
    let isValid  = isNumber && isSize;
    this.setState({ qty: qty, qtyInvalid: !isValid });
  },

  addToCart: function(e) {
    e.preventDefault();

    if(!this.state.qtyInvalid) {
      let item = this.state.item;
      let qty  = this.state.qty;
      CartActions.addItem(item, qty);
    }
  }

});

module.exports = ItemDetails;
