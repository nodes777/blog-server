import React from "react";
class ControlledTitleInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { handleChange, author, className, placeholder } = this.props;

		return (
			<input
				onChange={ev => handleChange("title", ev)}
				value={author}
				className={className}
				placeholder={placeholder}
			/>
		);
	}
}

export default ControlledTitleInput;
