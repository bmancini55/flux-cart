/* eslint new-cap:0 */
/* eslint no-unused-lets:0 */

let React        = require('react');
let ReactRouter  = require('react-router');
let RouteHandler = ReactRouter.RouteHandler;

let CartPopover = require('./CartPopover.jsx');

let Bootstrap = require('react-bootstrap');
let { Navbar, CollapsibleNav, Nav, NavItem } = Bootstrap;

let App = React.createClass({

  render: function() {
    return (
      <div>
        <Navbar toggleNavKey="navbar">
          <CollapsibleNav eventKey="navbar">
            <Nav navbar right>
              <NavItem><CartPopover /></NavItem>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <div className="container page-contents">
          <RouteHandler/>
        </div>
      </div>
    );
  }

});


module.exports = App;
