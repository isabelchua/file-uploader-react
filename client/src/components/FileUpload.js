import React, { Fragment, useState } from "react";
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";

const FileUpload = () => {
	const [file, setFile] = useState("");
	const [filename, setFilename] = useState("Choose File");
	const [uploadedFile, setUploadedFile] = useState({});
	const [message, setMessage] = useState("");
	const [uploadPercentage, setUploadPercentage] = useState(0);

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
				},
				onUploadProgress: ProgressEvent => {
					setUploadPercentage(
						parseInt(
							Math.round(
								(ProgressEvent.loaded * 100) / ProgressEvent.total
							)
						)
					);
					//clear percentage
					setTimeout(() => setUploadPercentage(0), 10000);
				}
			});
			const { fileName, filePath } = res.data;
			console.log(fileName);
			console.log(filePath);

			setUploadedFile({ fileName, filePath });
			setMessage("File Uploaded");
		} catch (err) {
			if (err.response.status === 500) {
				setMessage("There was a problem with the server");
			} else {
				setMessage(err.response.data.msg);
			}
		}
	};

	return (
		<Fragment>
			{message ? <Message msg={message} /> : null}
			<form onSubmit={onSubmit}>
				<input type="file" id="custom" onChange={onChange} />
				<label htmlFor="custom">{filename}</label>
				<Progress percentage={uploadPercentage} />
				<input type="submit" />
			</form>
			{uploadedFile ? (
				<div>
					<div>
						<h3>{uploadedFile.fileName}</h3>
						<img src={uploadedFile.filePath} alt="pic" />
					</div>
				</div>
			) : null}
		</Fragment>
	);
};

export default FileUpload;
