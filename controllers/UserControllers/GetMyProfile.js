import User from "../../Models/User.js"
const GetMyProfile = async(req,res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({succes:false , message:"user Not Found"})

        }
        return res.status(200).json({succes:false , message:"user Found" , data:user})

    } catch (error) {
        return res.status(500).json({succes:false , message:"internal server error"})
    }
}

export default GetMyProfile
