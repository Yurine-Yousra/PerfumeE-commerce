import Product from '../../Models/Product.js'

const DeleteProduct = async(req,res) => {
    const {productId} = req.params
    try{
    const Deletedproduct = await Product.findByIdAndDelete(productId)
    return res.status(200).json({succes :true , message:"this item was deleted succesfully" , data:Deletedproduct}) 
    }
    catch(error){
        console.log(error)
        return res.status(500).json({succes:false , message:"an error occured"})
    }
}

export default DeleteProduct