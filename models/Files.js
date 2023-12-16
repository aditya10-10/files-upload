const mongoose = require("mongoose");

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

// fileSchema.post("save", async function (doc) {
//   try {
//     console.log("DOC", doc);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// });

const File = mongoose.model("File", fileSchema);
module.exports = File;
