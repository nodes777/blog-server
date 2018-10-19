import React from "react";
class ControlledBodyInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { handleChange, body, className, placeholder } = this.props;

		return (
			<textarea
				onChange={ev => handleChange("body", ev)}
				value={body}
				className={className}
				placeholder={placeholder}
			/>
		);
	}
}

export default ControlledBodyInput;
