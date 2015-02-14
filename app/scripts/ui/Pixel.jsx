var Pixel = React.createClass({
	handleClick: function(e) {
		this.props.updatePixel(this.props.index, e);
	},
	render: function() {
		var style = {
			color: this.props.color
		}
		return (
			<div className="pixel" style={style} onClick={this.handleClick}>
				{this.props.text}
			</div>
		);
	}
});

module.exports = Pixel