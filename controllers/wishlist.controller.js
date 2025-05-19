const Wishlist = require("../models/wishList.model");

exports.getWishlist = async (req, res) => {
  const userId = req.user._id;
  const wishlist = await Wishlist.findOne({ user: userId }).populate(
    "products"
  );
  res.json(wishlist ? wishlist.products : []);
};

exports.addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) wishlist = new Wishlist({ user: userId, products: [] });
  if (!wishlist.products.includes(productId)) wishlist.products.push(productId);
  await wishlist.save();
  res.json({ success: true });
};

exports.removeFromWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: userId });
  if (wishlist) {
    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();
  }
  res.json({ success: true });
};
