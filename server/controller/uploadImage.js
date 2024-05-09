const imageInfo = require("../model/imageSchema");

async function uploadImage(req, res) {
  const rawData = req.file;
  if (rawData) {
    const uploadDate = new Date();
    const extensionName = rawData.filename.slice(
      rawData.filename.lastIndexOf(".") + 1
    );

    const fileData = {
      filename: rawData.filename,
      size: rawData.size,
      uploadDate,
      extensionName,
      link: `http://localhost:3000/uploads/${rawData.filename}`,
    };

    const image = new imageInfo(fileData);
    await image.save();
    res.status(201).send("uploaded successfully");
  }
}

module.exports = uploadImage;
