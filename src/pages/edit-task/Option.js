import React from "react";

const Option = ({ props }) => {
	const { name, projectName } = props;
	return <option>{name || projectName}</option>;
};

export default Option;
