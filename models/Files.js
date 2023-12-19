const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC", doc);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: "587",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "Aditya Chauhan",
      to: doc.email,
      subject: "Document saved successfully to Cloudinary",
      html: `<h2>Post Upload</h2>  <p>File Uploaded view here: <a href = "${doc.imageUrl}">link</a></p> `,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
