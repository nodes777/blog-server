import React from "react";
class ControlledTitleInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { func, author, className, placeholder } = this.props;

		return (
			<input
				onChange={func}
				value={author}
				className={className}
				placeholder={placeholder}
			/>
		);
	}
}

export default ControlledTitleInput;
