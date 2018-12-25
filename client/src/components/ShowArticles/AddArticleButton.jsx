import React, { Component } from "react";

class AddArticleButton extends Component {

	render() {
			return (				
					<button
						style={{ width: 200 }}
						className="btn btn-primary mx-3"
						onClick={this.props.handleAddArticle}
					>
						Add Article
					</button>
				)
			}
}

export default AddArticleButton;
