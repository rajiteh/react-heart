/** @jsx React.DOM */

document.HEART =  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,false,true,true,true,true,true,true,true,false,false,false,false,false,false,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
document.RED = "#C7181A";
document.WHITE = "#FAFAFA";

var React = window.React = require('react/addons'),
    PixelDisplay = require("./ui/PixelDisplay.jsx"),
    mountNode = document.getElementById("app");

var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var ToggleRandom = React.createClass({
  handleChange: function(e) {
    this.props.onToggle(e);
  },
  render: function() {
    return (
      <div className="ToggleRandom">
        <div className="input-group">
          <span className="input-group-addon">
            <input type="checkbox" aria-label="..." ref="switch" onChange={this.handleChange}/>
            Heart me!
          </span>
        </div>
      </div>
    );
  }
});

var Heart = React.createClass({
  getInitialState: function() {
    return {
      width: 21,
      height: 23,
      colorData: [],
      textData: [],
      colorResolved: [],
      textResolved: [],
      colors: [document.RED, document.WHITE],
      texts: ['0', '1']
    };
  },
  generatePixelData: function() {
    var cdata = [];
    var tdata = [];
    var resolution = this.state.width * this.state.height;
    for (var i=0; i < resolution; i++) {
      if (this.state.colorResolved[i] == undefined) {
        cdata[i] = this.state.colors[Math.floor((Math.random() * this.state.colors.length))];
      } else {
        cdata[i] = this.state.colorData[i];
      }
      if (this.state.textResolved[i] == undefined) {
        tdata[i] = this.state.texts[Math.floor((Math.random() * this.state.texts.length))];
      } else {
        tdata[i] = this.state.textData[i];
      }
    }
    this.setState({ colorData: cdata , textData: tdata });
  },
  jsonEncodePixelData: function() {
    var outputArray = [];
    for(var i=0; i < this.state.colorData.length; i++) {
      outputArray[i] = this.state.colorData[i] == document.RED ? true : false
    }
    console.log(JSON.stringify(outputArray));
  },
  resolveImage: function(imgMap) {
    var cResolved = this.state.colorResolved;
    var textResolved = this.state.textResolved;
    for (var i = 0; i < this.state.colorData.length; i++) {
      if (cResolved[i] == undefined) {
        var randTimeout = Math.floor((Math.random() * 5000));
        setTimeout((function(i, _this) {
          return function() {
            var cd = this.state.colorData;
            var r = this.state.colorResolved;
            var t = this.state.textResolved;
            if (imgMap[i]) {
              cd[i] = document.RED;
              r[i] = true;
              t[i] = true;
            } else {
              cd[i] = document.WHITE;
              r[i] = true;
              t[i] = undefined;
            }
            this.setState({ colorData: cd, colorResolved: r, textResolved: t });
          }.bind(_this);
        })(i,this), randTimeout);
      }
    };
  },
  onToggle: function(event) {
    if (event.target.checked)
      this.resolveImage(document.HEART);
    else
      this.dissolveImage();
  },
  dissolveImage: function() {
    var cResolved = this.state.colorResolved;
    var tResolved = this.state.textResolved;
    for (var i = 0; i < this.state.colorData.length; i++) {
      if (cResolved[i] || tResolved[i]) {
        var randTimeout = Math.floor((Math.random() * 5000));
        setTimeout((function(i, _this) {
          return function() {
            var c = this.state.colorResolved;
            var t = this.state.textResolved;
            c[i] = t[i] = undefined;
            this.setState({ colorResolved: c, textResolved: t });
          }.bind(_this);
        })(i,this), randTimeout);
      }
    };
  },
  updatePixel: function (i,e) {
    if (e.button > 0)
      this.flipPixelColor(i);
    else
      this.setPixelColor(i, document.RED);
  },
  flipPixelColor: function(i) {
    data = this.state.colorData;
    data[i] = data[i] == document.RED ? document.WHITE : document.RED
    this.setState({colorData:data });
  },
  setPixelColor: function (i,c) {
    if (c == undefined) c = document.RED
    data = this.state.colorData;
    var rowEnd = (i - i%21)+21;
    var scanEnd = i+1;
    for (var j=i;j < rowEnd;j++) {
      if (data[j] == c) {
        scanEnd = j;
        break;
      }
    }
    for (var j=i;j < scanEnd;j++)
      data[j] = c;
    this.setState({ colorData: data });
  },
  componentDidMount: function() {
    this.generatePixelData();
    setInterval(this.generatePixelData , 200);
  },
  render: function() {
    return (
      <div>
      <PixelDisplay width={this.state.width} height={this.state.height} colors={this.state.colorData} texts={this.state.textData} updatePixel={this.updatePixel}/>
      <h1>Happy Valentine''s Day!</h1>
      <ToggleRandom onToggle={this.onToggle} />
      </div>
    );
  }
});

var App = React.createClass({
  mixins: [ Router.State ],
  render: function () {
    var name = this.getRoutes().reverse()[0].name;
    return (
      <div>
        <TransitionGroup component="div" transitionName="example">
          <RouteHandler key={name}/>
        </TransitionGroup>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Heart} />
    <Route name="heart" handler={Heart} addHandlerKey={true} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});