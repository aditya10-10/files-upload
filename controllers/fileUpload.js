const File = require("../models/Files");

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file
    const file = req.files.file;

    console.log("file aa gya", file);

    let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".") [1]}`;
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
