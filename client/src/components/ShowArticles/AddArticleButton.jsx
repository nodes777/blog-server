import React, { Component } from "react";

class AddArticleButton extends Component {

	render() {
			return (				
				<div style={{ width: 200, margin: "0 auto" }}>
					<button
						style={{ width: 200 }}
						className="btn btn-primary mx-3"
						onClick={this.handleAddArticle}
					>
						Add Article
					</button>
				</div>
				)
			}
}

export default AddArticleButton;
