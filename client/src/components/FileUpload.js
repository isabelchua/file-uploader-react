import React, { Fragment, useState } from "react";

const FileUpload = () => {
	const [file, setFile] = useState("");
	const [filename, setFilename] = useState("Choose File");

	const onChange = e => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};
	return (
		<Fragment>
			<form>
				<input type="file" id="custom" onChange={onChange} />
				<label htmlFor="custom">{filename}</label>
				<input type="submit" />
			</form>
		</Fragment>
	);
};

export default FileUpload;
