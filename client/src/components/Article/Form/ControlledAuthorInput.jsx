import React from "react";
class ControlledAuthorInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { handleChange, author, className, placeholder } = this.props;

		return (
			<textarea
				onChange={ev => handleChange("author", ev)}
				value={author}
				className={className}
				placeholder={placeholder}
			/>
		);
	}
}

export default ControlledAuthorInput;
