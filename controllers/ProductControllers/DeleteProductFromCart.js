import User from '../../Models/User.js';

const DeleteProductFromCart = async (req, res) => {
    const userId = req.userId; // Assuming userId is correctly set in the request
    const { productId } = req.params;

    try {
        // Fetch the user document
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Filter out the product from purchases using toString() for comparison
        const initialLength = user.purchaces.length;
        console.log('Initial purchases length:', initialLength);

        // Corrected filtering with toString() for comparison
        user.purchaces = user.purchaces.filter((item) => {
            // Return the result of the comparison
            return item.product._id.toString() !== productId; // Using toString() for comparison
        });

        console.log('Filtered purchases length:', user.purchaces.length);

        if (user.purchaces.length === initialLength) {
            return res.status(400).json({ message: 'Product not found in user purchases' });
        }

        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: 'Product removed from purchases', data: user.purchaces });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while removing the product from purchases' });
    }
};

export default DeleteProductFromCart;
