import User from '../../Models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const GenerateJwtToken = (id) => {
    const JWT__SECRET__KEY =  process.env.JWT_SECRET
    return jwt.sign({id} , JWT__SECRET__KEY, { expiresIn : "15d"})
}

const Login = async(req,res) => {
    const {email , password} = req.body
    if(!email || !password)  {
    res.status(400).json({succes:false , message:"All fields are required"})
    }
try{
    const user = await User.findOne({email})
    if(!user){
    return res.status(400).json({succes:false , message:"user with such email not found"})
    }
    const isMatched = await bcrypt.compare(password , user.password)
    if(!isMatched){
        return res.status(400).json({succes:false , message:"wrong password"})
    }
    const token =  GenerateJwtToken(user._id )
    const {password:userPassword , ...rest} = user._doc
    return res.status(200).json({succes:true , message:"you are logged in succesfully" , data:{...rest , token} })
}
catch(error){
    console.log(error)
    return res.status(500).json({succes:false , message:"an error has occured"})
}
}

export default Login