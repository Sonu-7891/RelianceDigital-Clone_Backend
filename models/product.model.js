const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  brand: {
    type: String,
    required: [true, "Please provide brand name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    min: [0, "Price cannot be negative"],
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please provide product category"],
  },
  images: [
    {
      type: String,
      required: [true, "Please provide at least one product image"],
    },
  ],
  stock: {
    type: Number,
    required: [true, "Please provide stock quantity"],
    min: [0, "Stock cannot be negative"],
    default: 0,
  },
  rating: {
    type: Number,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot be more than 5"],
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  features: [
    {
      type: String,
    },
  ],
  specifications: {
    type: Map,
    of: String,
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
productSchema.index({ name: "text", description: "text", brand: "text" });

module.exports = mongoose.model("Product", productSchema);
