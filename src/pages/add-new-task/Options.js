import React from "react";

const Options = ({ props }) => {
	const { name, projectName } = props;
	return <option>{name || projectName}</option>;
};

export default Options;
