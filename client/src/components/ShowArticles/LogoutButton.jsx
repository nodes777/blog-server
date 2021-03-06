import React, { Component } from "react";

class LogoutButton extends Component {

	render() {
			return (				
					<button
						style={{ width: 200 }}
						className="btn btn-warning mx-3"
						onClick={this.props.handleLogout}
					>
						Logout
					</button>
				)
			}
}

export default LogoutButton;