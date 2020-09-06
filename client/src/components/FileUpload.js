import React, { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = () => {
	const [file, setFile] = useState("");
	const [filename, setFilename] = useState("Choose File");
	const [uploadedFile, setUploadedFile] = useState({});

	const onChange = e => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const onSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		console.log(file);
		try {
			const res = await axios.post("/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
			const { fileName, filePath } = res.data;

			setUploadedFile({ fileName, filePath });
		} catch (err) {
			if (err.response.status === 500) {
				console.log("There was a problem with the server");
			} else {
				console.log(err.response.data.msg);
			}
		}
	};

	return (
		<Fragment>
			<form onSubmit={onSubmit}>
				<input type="file" id="custom" onChange={onChange} />
				<label htmlFor="custom">{filename}</label>
				<input type="submit" />
			</form>
		</Fragment>
	);
};

export default FileUpload;
