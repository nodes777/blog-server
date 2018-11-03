import React, { Component } from "react";
// import axios from "axios";
class GoogleAuth extends Component {
	// componentDidMount() {
	// 	// axios("http://localhost:8000/api/auth").then(res => {
	// 	// 	console.log("in componentDidMount");
	// 	// 	console.log(res.data);
	// 	// });
	// 	// console.log("hello");
	// }
	render() {
		return <a href="http://localhost:8000/auth/auth">Login with Google</a>;
	}
}

export default GoogleAuth;
