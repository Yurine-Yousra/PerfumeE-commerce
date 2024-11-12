import Product from '../../Models/Product.js'
const CreateProduct = async(req , res) => {
const {title , description , quantity , price  ,  sex , size ,notes , likes , avgRating, totalRating , brand } = req.body
if(!title || ! description || !quantity || !price || !sex){
    return res.status(400).json({sucess:false , message:"all fields are required"})
}
try{
    const NewProduct = new Product({
        title,
        description,
        quantity,
        price,
        size,
        notes,
        sex,
        likes,
        avgRating,
        totalRating,
        brand,
    })
    await NewProduct.save()
    return res.status(200).json({succes:true , message:'prodcut created SUccesfully' , data:NewProduct})
}
catch(error) {
    console.log(error)
    return res.status(500).json({succes:false , message:"an error occured"})
}
}

export default CreateProduct