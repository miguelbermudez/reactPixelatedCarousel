/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    var img = new Image(); 

    return {
      canvas: null,
      ctx: null,
      aspectFit: null,
      canvasid: null,
      min: parseInt(this.props.min,10),
      max: parseInt(this.props.max,10),
      step: parseInt(this.props.steps,10),
      delta: this.step,
      current: parseInt(this.props.max,10),
      srcimg: img,
      inTransition: false
    };
  },

  componentWillMount: function() {
    this.genUnique('canvas-id-');
  },

  componentDidMount: function() {
    var canvas = document.getElementById(this.state.canvasid);
    var img = this.state.srcimg;
    var ctx = canvas.getContext('2d');

    // add event listeners
    canvas.addEventListener('mouseover', this.handleMouseOver, false);
    canvas.addEventListener('mouseout', this.handleMouseOut, false);

    // disable smoothing for pixelated effect 
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    // set canvas and ctx 
    this.setState({canvas: canvas});
    this.setState({ctx: ctx});
    
    img.onload = function() {
      this.setState({aspectFit: this.calcAspectRatioFit(img, canvas)});
      this.pixelate();
    }.bind(this);

    img.src = this.props.url;
  },

  pixelate: function(v) {
    var canvas = this.state.canvas;
    var aspectFit = this.state.aspectFit;
    var ctx = this.state.ctx;
    var img =  this.state.srcimg;
    var size, w, h;

    v = (v || this.state.max);
    size = v * 0.01;
    w = img.width * size;
    h = img.height * size;

    //console.log('canvas: ', this.state.canvasid);
    //console.log('\t',this.state.canvas);
    //console.log('\tsize: ', size);
    //console.log('\tsizew: ',w,'h: ',h);
    //console.log('\tsizeimg: ', img.width,img.height);
    //console.log('\tsizecanvas: ', canvas.width,canvas.height);
    //console.log('\taspectfit: ', aspectFit.width,aspectFit.height);
    //console.log('\n\n');

    if (w > canvas.width) w = canvas.width;
    if (h > canvas.height) h = canvas.height;

    ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, aspectFit.width, aspectFit.height);

  },

  // http://stackoverflow.com/a/14731922/1084371
  calcAspectRatioFit: function(img, canvas) {
    var srcWidth = img.width;
    var srcHeight = img.height;
    var maxHeight = canvas.height;
    var maxWidth = canvas.width;
    var ratio = [maxWidth / srcWidth, maxHeight / srcHeight];

    //ratio = Math.min(ratio[0], ratio[1]); // min for aspect fitting
    ratio = Math.max(ratio[0], ratio[1]); // max for aspect filling

    //return { width: Math.ceil(srcWidth*ratio), height:Math.ceil(srcHeight*ratio) };
    return { width: srcWidth*ratio, height:srcHeight*ratio };
  },

  genUnique: function(prefix) {
    // http://stackoverflow.com/a/8084248/1084371 - amazing!
    var uniqId =  (Math.random() +1).toString(36).substr(2, 5);
    var id = prefix + uniqId;
    this.setState({canvasid: id});
    return id;
  },

  handleMouseOver: function() {
    // set delta to -step since we want to pixelate
    this.setState({delta: -(this.state.step)});

    if (this.state.inTransition === false) {
      this.setState({inTransition: true});
      this.animate();
    }
  },

  handleMouseOut: function() {
    // set delta to +step to return to normal view
    this.setState({delta: this.state.step});

    if (this.state.inTransition === false) {
      this.setState({inTransition: true});
      this.animate();
    }
  },

  animate: function() {
    var v = this.state.current;
    var delta = this.state.delta;
    v += delta;

    if (v >= this.state.max || v <= this.state.min) {
      this.setState({inTransition: false});
      return;
    } else {
      this.pixelate(v);
      this.setState({current: v});
      requestAnimationFrame(this.animate);
    }

  },

  render: function() {
    return (
      <canvas id={this.state.canvasid} className="w-px-canvas" width={this.props.width} height={this.props.height}></canvas>
    )
  }
});

