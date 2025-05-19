const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["COD", "CREDIT_CARD", "DEBIT_CARD", "UPI"],
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "COMPLETED", "FAILED"],
    default: "PENDING",
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PENDING",
  },
  trackingNumber: {
    type: String,
  },
  estimatedDelivery: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp before saving
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
