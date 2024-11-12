import Product from '../../Models/Product.js';
import User from '../../Models/User.js';
import Bill from '../../Models/Bill.js';

const ConfirmPurchases = async (req, res) => {
  const userId = req.userId;
  let myProducts = [];  
  let total = 0;  

  try {
    
    const user = await User.findById(userId).populate({
      path :'purchaces',
      populate : {
        path :'product'
      }
    }
    );
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.purchaces.length === 0) {
      return res.status(400).json({ success: false, message: "You need to add products to your cart" });
    }


    for (const item of user.purchaces) {
      const productFromDb = await Product.findById(item.product._id);
      if (!productFromDb) {
        return res.status(400).json({ success: false, message: `Product with ID ${item.product} not found` });
      }

      // Find the correct size and validate stock
      const sizeIndex = productFromDb.size.findIndex((el) => el.contenance === item.contenance);
      if (sizeIndex === -1) {
        return res.status(400).json({ success: false, message: `Size with contenace ${item.contenance} not found for ${productFromDb.title}` });
      }

      const sizeFromProduct = productFromDb.size[sizeIndex];


      if (!sizeFromProduct) {
        return res.status(400).json({ success: false, message: `Size with contenace ${item.contenance} not found for ${productFromDb.title}` });
      }

      if (item.quantity > sizeFromProduct.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product ${productFromDb.title}. Available: ${size.quantity}, Requested: ${item.quantity}`,
        });
      }

      // Calculate total cost
      total += sizeFromProduct.price * item.quantity;

      // Update the product stock
      sizeFromProduct.quantity -= item.quantity;
      productFromDb.size[sizeIndex].quantity -= item.quantity

      await productFromDb.save()
       user.purchaces = []
       await user.save()

      // Prepare the product data for the bill  purchase interface
      myProducts.push({
        product: productFromDb.title,
        contenance: item.contenance,
        quantity: item.quantity,
        price : sizeFromProduct.price
      });
    }

    // Wait for all product updates to finish

    // Create and save the bill
    const bill = new Bill({
      user: userId,
      products: myProducts,
      total: total,
    });

    await bill.save();

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Purchase completed successfully",
      data: bill,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default ConfirmPurchases;
