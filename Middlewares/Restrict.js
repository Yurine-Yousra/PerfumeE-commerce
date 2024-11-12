import User from "../Models/User.js"
const Restrict = emails => async(req,res,next) => {
    const id = req.id
    const user = await User.findById(id)
    console.log(user)
    if(!emails.includes(user.email)){
        return res.status(400).json({succes:false , message:"permission denied you are not allowed to perform this action"})
    }
    next()
}

export default Restrict