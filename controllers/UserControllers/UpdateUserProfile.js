import User from '../../Models/User.js'

const UpdateUserProfile = async(req,res) => {
    const  userId = req.userId
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({succes:false , message:'user not found'})

        }
        req.body.email ? req.body.email : req.body.email = user.email
        req.body.username ? req.body.username : req.body.username = user.username
        if(req.body.email && req.body.username){
            const userWithSameEmail = await User.findOne({email : req.body.email})
            if(userWithSameEmail && userId === userWithSameEmail._id.toString()){
    //there is no probleme the email is mine and i did not change it
    user.email = req.body.email
    user.username = req.body.username
    await user.save()
    return res.status(200).json({succes:true , message:"user Updated Succesfully" , data :user})
            }
            if(userWithSameEmail && userId !== userWithSameEmail._id.toString()){
                return res.status(400).json({succes:false , message:'email exist already please change it'})
            }
            if(!userWithSameEmail){
                user.email = req.body.email
            user.username = req.body.username
            await user.save()
            return res.status(200).json({succes:true , message:"user Updated Succesfully" , data :user})
            }
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({succes:false , message:'an error occured'})
    }
  
}

export default UpdateUserProfile
