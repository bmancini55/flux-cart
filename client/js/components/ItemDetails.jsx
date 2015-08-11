
let React        = require('react');
let ItemStore    = require('../stores/ItemStore');
let ItemActions  = require('../actions/ItemActions');

let ItemDetails = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  // componentDidMount: function() {
  //   ItemStore.addChangeListener(this.onChange);
  //   ItemActions.loadItemById();
  // },

  // componentWillUnmount: function() {
  //   ItemStore.removeChangeListener(this.onChange);
  // },

  // onChange: function() {
  //   let state = this.mergeStoreState(this.state);
  //   this.setState(state);
  // },

  // mergeStoreState: function(state) {
  //   let storeState = ItemStore.getState();
  //   return Object.assign(state, {
  //     items: storeState
  //   });
  // },

  // getInitialState: function() {
  //   return this.mergeStoreState({});
  // },

  render: function() {
    let itemId = this.context.router.getCurrentParams().itemId;
    return (
      <div>Id: {itemId}</div>
    );
  }

});

module.exports = ItemDetails;
