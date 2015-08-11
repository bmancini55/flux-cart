
let React  = require('react');
let Router = require('react-router');
let Route  = Router.Route;
let DefaultRoute = Router.DefaultRoute;

let App         = require('./components/App.jsx');
let ItemList    = require('./components/ItemList.jsx');
let ItemDetails = require('./components/ItemDetails.jsx');

let routes = (
  <Route name="app" handler={App} path="/">
    <DefaultRoute name="items" handler={ItemList} />
  </Route>
);


Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
