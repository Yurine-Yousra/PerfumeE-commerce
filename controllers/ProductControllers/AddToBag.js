import User from '../../Models/User.js';

const AddToMyPurchases = async (req, res) => {
    const { productId } = req.params;
    const userId = req.userId; // Adjusted extraction

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found. You have to login or register." });
        }
        const product = user.bag.find(item => item.toString() === productId)
        if(product) {
            return res.status(200).json({succes:true , message:"this product exists already in your bag" , exist:true})
        }
        else{
            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { bag: productId } },
                { new: true } // Return the updated document
            );
            return res.status(200).json({
                success: true,
                message: "The product was added successfully to your bag.",
                exist:false
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default AddToMyPurchases;
