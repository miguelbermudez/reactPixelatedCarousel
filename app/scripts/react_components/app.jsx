/** @jsx React.DOM */

var React   = require('react');
var PxImage = require('./pxImage.jsx');

React.renderComponent(
  <PxImage steps="2" min="1" max="50" width="760" height="428" url="images/DP220030.jpg" />,
  document.getElementById('demo')
);

