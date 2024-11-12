import Product from "../../Models/Product.js"
import User from '../../Models/User.js'
const DislikedProduct = async(req,res) => {
    const {productId} = req.params
    const userId = req.userId
    try{
    const DislikedProduct = await Product.findByIdAndUpdate(productId , {$inc : {likes: -1}} , {new:true})
    if(!DislikedProduct){
        return res.status(400).json({succes:false , message:"product not found"})
    }
    const user = await User.findById(userId)
    if(!user){
        return res.status(400).json({succes:false , message:"user not found"})
    }
    user.liked = user.liked.filter(item => item.toString() !== productId)
    user.save()
    return res.status(200).json({succes:true , message:"product dislliked and removed succesfully"})

    } 
    catch(error) {
        console.log(error)
        return res.status(500).json({succes:false , message:"an error occured"})
    }
}


















export default DislikedProduct