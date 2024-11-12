// import User from '../../Models/User.js'


// const DeleteProductFromBag = async(req,res) => {
//     const userId = req.userId
//     const {productId} = req.params
//     try {
//         const user = await User.findByIdAndUpdate(userId , {
//             $pull : {$bag : productId  }
//         })
//         if(!user){
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json({ message: 'Product removed from bag' , data:[user.bag,productId
//         ] });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'An error occurred while removing the product from bag' });
//     }
// }

// export default DeleteProductFromBag


import User from '../../Models/User.js';

const DeleteProductFromBag = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.params;

    try {
        // Fetch the user document
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Filter the bag to remove the product
        user.bag = user.bag.filter(item => item.toString() !== productId);
        
        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: 'Product removed from bag', data: user.bag });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while removing the product from bag' });
    }
};

export default DeleteProductFromBag;
