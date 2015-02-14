/** @jsx React.DOM */
var Pixel = require("./Pixel.jsx");
var PixelDisplay = React.createClass({
	handleClick: function(e) {
		console.log(e);
	},
    render: function(){
    	var pixels = [];
    	var resolution = this.props.width * this.props.height;
    	for (var i=0; i < resolution; i++) {
    		var pixelInfo = {};
    		if (this.props.texts[i] != undefined)
    			pixelInfo.text = this.props.texts[i];
    		if (this.props.colors[i] != undefined)
    			pixelInfo.color = this.props.colors[i];
    		pixels.push(<Pixel color={pixelInfo.color} text={pixelInfo.text} index={i} updatePixel={this.props.updatePixel}/>);
    	};
    	var style = {
    		width: this.props.width * 20
    	}
        return (
            <div className="pixel-display" style={style}>
                {{pixels}}
            </div>
        )
    }
});

module.exports = PixelDisplay