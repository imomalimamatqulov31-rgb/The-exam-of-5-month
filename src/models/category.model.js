const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true
  },
   category_number: {
    type: Number,
    unique: true
  },
}, { timestamps: true,
    versionKey: false
 });

module.exports = mongoose.model("Category", categorySchema);

