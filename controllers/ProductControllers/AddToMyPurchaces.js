import User from '../../Models/User.js';
import Product from '../../Models/Product.js'

const AddToMyPurchases = async (req, res) => {
    const { productId } = req.params;
    const userId = req.userId; 
    const {quantity , contenance} = req.body
    if(isNaN(quantity) || !quantity){
        return res.status(400).json({ success: false, message: "please enter a valid quantity" });
    }
     if(!contenance){
        return res.status(400).json({ success: false, message: "please select a size" });
    }
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found. You have to login or register." });
        }
        const product = user.purchaces.find(item => item.product.toString() === productId)
     
        if(!product){
            const user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { purchaces: {product :productId , quantity:quantity , contenance:contenance} } },
                { new: true } 
            );
            return res.status(200).json({
                success: true,
                message: "The product was added successfully to your purchases.",
                data : user.purchaces
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default AddToMyPurchases;
