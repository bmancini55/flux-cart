
let React        = require('react');

let ItemDetails = React.createClass({

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
    return (
      <div>Hello</div>
    );
  }

});

module.exports = ItemDetails;
