//  Fragments let you group a list of children without adding extra nodes to the DOM, ie divs
import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ShowForm = ({
	author,
	body,
	handleCancelAdd,
	handleCancelEdit,
	handleChange,
	handleSubmit,
	id,
	title
}) => (
	<Fragment>
		<form onSubmit={handleSubmit} className="my-3">
			<input
				type="text"
				name="title"
				onChange={handleChange}
				placeholder="Article Title"
				value={title}
				className="form-control my-3"
			/>
			<textarea
				className="form-control my-3"
				onChange={handleChange}
				name="body"
				placeholder="Article Body"
				value={body}
			/>
			<input
				onChange={handleChange}
				value={author}
				name="author"
				className="form-control my-3"
				placeholder="Article Author"
			/>
			<button
				type="button"
				onClick={id ? handleCancelEdit : handleCancelAdd}
				className="btn btn-warning float-left"
			>
				Cancel
			</button>
			<button
				disabled={!author || !body || !title}
				type="submit"
				className="btn btn-primary ml-3"
			>
				{id ? "Update" : "Submit"}
			</button>
		</form>
		<div className="clear-fix" />
	</Fragment>
);

export default ShowForm;

ShowForm.propTypes = {
	author: PropTypes.string,
	body: PropTypes.string,
	handleCancelAdd: PropTypes.func,
	handleCancelEdit: PropTypes.func,
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
	id: PropTypes.string,
	title: PropTypes.string
};
