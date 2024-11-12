import User from "../../Models/User"
const DeleteUserProfile = async(req,res) => {
    const {userId} = req.userId
    try{
    const user = await User.findByIdAndDelete(userId)
    return res.status(200).json({succes:true , message:"user deleted succesfully" , data:user})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({succes:false , message:"an error occred"})
    }
}

export default DeleteUserProfile
