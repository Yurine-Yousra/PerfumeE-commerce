import User from '../../Models/User.js'
import bcrypt from 'bcryptjs'
const Register = async(req,res) => {
const {username , email , password} = req.body
if(!username || ! email || ! password) {
    return res.status(400).json({succes:false , message:"All fields are required"})
}
try{
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({succes:false , message:"this email exists already"})
    }
    const hashedPassword = await bcrypt.hash(password , 10)
    const NewUser =  new User({
        email,
        username,
        password :hashedPassword,
    })
    await NewUser.save()
    return res.status(200).json({succes:true , message:"the user is created succesfully" , data:NewUser})
}
catch(error){
    console.log(error)
    return res.status(500).json({succes:false , message:"en error has occured"})
}

}

export default Register