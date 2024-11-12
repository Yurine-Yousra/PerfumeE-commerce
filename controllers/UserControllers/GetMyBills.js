import Bill from '../../Models/Bill.js';
import User from '../../Models/User.js';

const GetMyBills = async (req, res) => {
    const userId = req.userId;

    try {
        // Find the user by ID to ensure the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find all bills associated with the user
        const bills = await Bill.find({ user: userId })
           

        if (!bills || bills.length === 0) {
            return res.status(200).json({ success: true, message: "No bills found", data: [] });
        }

        return res.status(200).json({ success: true, message: "Bills found", data: bills });

    } catch (error) {
        console.error("Error fetching bills:", error); // Log error to console for debugging
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default GetMyBills;
