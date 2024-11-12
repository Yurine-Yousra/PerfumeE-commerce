import User from '../../Models/User.js'

const GetMyLikedProducts = async(req,res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId).populate('liked')
        if(!user){
            return res.status(404).json({succes:false , message:"we could not find your profil"})
        }
        else {
            return   res.status(200).json({succes :true , message : "liked products fetched succesfully" , data:user.liked})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({succes:false , message:"internal server error"})
    }
}

export default GetMyLikedProducts
