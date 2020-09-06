const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

//upload endpoint

app.post("/upload", (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: "No file was uploaded" });
	}
	const file = req.files.file;
	file.mv(`${__direname}/client/public/uploads/${file.name}`, err => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
		res.json({ fileName: file.name, filePath: `/uploads/${filename}` });
	});
});

app.listen(5000, () => console.log("Server Started"));