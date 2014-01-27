/** @jsx React.DOM */

var React   = require('react');
var Carousel = require('./carousel.jsx');

var artImages = ["1998.412.3.jpg", "DP130999.jpg", "DP133010.jpg", "DP220030.jpg", "DP259921.jpg", "DT1491.jpg", "DT1494.jpg", "DT1502.jpg", "DT1937.jpg", "DT1941.jpg"];

React.renderComponent(
  <Carousel data={artImages} />, document.getElementById('demo')
);
