import Product from "../../Models/Product.js";
import User from "../../Models/User.js";

const LikeProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;  // Assuming userId is set from middleware or JWT

  try {
    const LikedProduct = await Product.findById(productId);
    if (!LikedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).json({ success: false, message: "Failed to update likes" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { liked: productId } },
      { new: true }
    ).populate('liked');  

    if (!updatedUser) {
      return res.status(500).json({ success: false, message: "Failed to update user likes" });
    }

    return res.status(200).json({
      success: true,
      message: "Likes incremented successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "An error occurred" });
  }
};

export default LikeProduct;
