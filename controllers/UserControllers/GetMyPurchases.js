import User from '../../Models/User.js'


const GetMyPurchaces = async(req,res) => {
        const userId = req.userId
        try {
            const user = await User.findById(userId)
            .populate({
              path: 'purchaces',
              populate: {
                path: 'product'
              }
            });
          
            if(!user){
                return res.status(404).json({succes:false , message:"we could not find your profil"})
            }
            return res.status(200).json({succes:true , message:"we have fetched your profile succesfully" , data:user})

        } catch (error) {
            console.log(error)
            return res.status(500).json({succes:false , message:"internal server error"})

        }
}

export default GetMyPurchaces
