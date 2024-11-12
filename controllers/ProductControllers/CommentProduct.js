import Comment from '../../Models/Comment.js'
import Product from '../../Models/Product.js'

const CommentProduct = async (req, res) => {
    const { productId } = req.params;
    const userId = req.userId;
    console.log('ProductId:', productId, 'UserId:', userId);

    try {
        const product = await Product.findById(productId);
        
        // Check if the product exists
        if (!product) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        // Create a new comment
        const comment = new Comment({
            user: userId,
            product: productId,
            text: req.body.text,
            rating: req.body.rating
        });

        // Save the comment
        await comment.save();

        // Get all comments for the product
        const comments = await Comment.find({ product: productId });

        // Update product ratings
        const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
        const avgRating = totalRating / comments.length;

        // Update the product's rating information
        product.totalRating = totalRating;
        product.avgRating = avgRating;

        // Save the product after updating ratings
        await product.save();

        return res.status(200).json({
            success: true,
            message: 'Comment added successfully',
            data: product
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
};

export default CommentProduct;
