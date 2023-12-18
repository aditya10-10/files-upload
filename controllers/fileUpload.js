const { request } = require("express");
const File = require("../models/Files");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file
    const file = req.files.file;

    console.log("file aa gya", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("path", path);

    // move file to folder

    file.mv(path, (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    });

    res.json({
      success: true,
      message: "File Upload Successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
};

function isFileSupported(fileType, supportedTypes) {
  return supportedTypes.includes(fileType);
}

async function uploadFile(file, folder, quality) {
  const options = { folder, max_file_size: 1024 };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log("body", req.body);

    const file = req.files.imageFile;
    // console.log("file", file);

    const supportedTypes = ["png", "jpg", "jpeg"];

    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("fileType", fileType);

    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    const response = await uploadFile(file, "File_upload");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "File Uploaded Successfully",
      data: response,
      imageUrl: response.secure_url,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log("body", req.body);

    const file = req.files.videoFile;
    // console.log("file", file);

    const supportedTypes = ["mov", "mp4"];

    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("fileType", fileType);

    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    const response = await uploadFile(file, "File_upload");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Video Uploaded Successfully",
      data: response,
      imageUrl: response.secure_url,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log("body", req.body);

    const file = req.files.imageFile;
    // console.log("file", file);

    const supportedTypes = ["png", "jpg", "jpeg"];

    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("fileType", fileType);

    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    const response = await uploadFile(file, "File_upload", 40);
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "File Uploaded Successfully",
      data: response,
      imageUrl: response.secure_url,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
