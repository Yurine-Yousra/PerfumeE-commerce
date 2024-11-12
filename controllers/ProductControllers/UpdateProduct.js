import Product from '../../Models/Product.js'
const UpdateProduct  = async(req, res) => {
    const {productId} = req.params
    const {title , description , quantity , price  , category , sex} = req.body
    try{
    const Product = await Product.findByIdAndUpdate(productId , {$set :req.body} , {new:true})
    return res.status(200).json({succes:true , message:"product updated succesfully" , data:Product})
    }
    catch(error) {
        console.log(error)
        return res.status(500).json({succes:false , message:"an error occured"})
    }
}

export default UpdateProduct