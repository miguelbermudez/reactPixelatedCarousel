/** @jsx React.DOM */
var React = require('react');
var PxImage = require('./pxImage.jsx');


module.exports = React.createClass({
  render: function() {
    var pxImageNodes = this.props.data.map(function (image) {
      var imagePath = 'images/' + image;
      return <PxImage steps="2" min="1" max="50" width="760" height="428" url={imagePath} />
    });
    return (
      <div className="carousel-contents">
        {pxImageNodes}
      </div>
    );
  }
});

