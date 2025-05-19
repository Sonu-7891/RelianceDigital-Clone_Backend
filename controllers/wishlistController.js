const Wishlist = require("../models/wishList.model");

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    let wishlist = await Wishlist.findOne({ user: userId })
      .populate("products")
      .lean();

    if (!wishlist) {
      wishlist = { products: [] };
    }

    res.json(wishlist.products);
  } catch (error) {
    console.error("Error getting wishlist:", error);
    res.status(500).json({ message: "Error getting wishlist" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Check if product is already in wishlist
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Error adding to wishlist" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }

    res.json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ message: "Error removing from wishlist" });
  }
};
