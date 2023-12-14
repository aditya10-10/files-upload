const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/database");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(fileUpload());


const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB();
