import Product from "../../Models/Product.js"
const GetProduct = async(req,res) => {
    const {productId} = req.params
    console.log(productId)
    try{
    const product = await Product.findById(productId)
    return res.status(200).json({succes:true , message:"product fetched succesfully" , data:product})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({succes:false , message:"an error occured"})
    }
}

export default GetProduct