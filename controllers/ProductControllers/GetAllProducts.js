import Product from "../../Models/Product.js";

const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
        });
    } catch (error) {
        console.error("Error fetching products:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching products",
        });
    }
};

export default GetAllProducts;
