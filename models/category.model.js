const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide category name"],
    trim: true,
    unique: true,
    maxlength: [50, "Category name cannot be more than 50 characters"],
  },
  description: {
    type: String,
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create index for search functionality
categorySchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Category", categorySchema);
