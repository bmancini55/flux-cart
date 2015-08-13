
let React       = require('react');
let classnames  = require('classnames');
let CartActions = require('../actions/CartActions');

let CartItem = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      qtyInvalid: false,
      qty: this.props.item.qty
    };
  },

  render: function() {
    let item       = this.props.item;
    let qty        = this.state.qty;
    let qtyInvalid = this.state.qtyInvalid;
    let qtyClass   = classnames({
      invalid: qtyInvalid
    });
    return (
      <div className="cart-item">
        <table className="cart-item-container">
          <tr>
            <td className="cart-item-img">
              <img className="img-responsive item-img" src={item.imagePath} />
            </td>
            <td className="cart-item-data">
              <table className="cart-item-details">
                <tr>
                  <td className="cart-item-details-header">{item.title}</td>
                  <td className="cart-item-delete">
                    <span
                      className="glyphicon glyphicon-remove"
                      onClick={this.onRemoveClick}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="cart-item-details-info" colspan="2">
                    <div className="cart-item-info cart-item-id">
                      <div className="info-label">Item</div>
                      <div className="info-value">{item.id}</div>
                    </div>
                    <div className="cart-item-info cart-item-price">
                      <div className="info-label">Price</div>
                      <div className="info-value">${item.price}</div>
                    </div>
                    <div className="cart-item-info cart-item-qty">
                      <div className="info-label">Qty</div>
                      <div className="info-value">
                        <input type="text" value={qty} onChange={this.onQtyChange} className={qtyClass} />
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    );
  },

  onRemoveClick: function() {
    CartActions.removeItem(this.props.item.id);
  },

  onQtyChange: function(e) {
    let qty      = e.target.value;
    let isNumber = /^\d+$/.test(qty);
    let isSize   = parseInt(qty) < 10;
    let isValid  = isNumber && isSize;

    // update local state
    this.setState({ qty: qty, qtyInvalid: !isValid });

    // if valid push state
    if(isValid) {
      CartActions.updateQty(this.props.item.id, parseInt(e.target.value));
    }
  }

});

module.exports = CartItem;
