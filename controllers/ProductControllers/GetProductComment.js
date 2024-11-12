import Comment from "../../Models/Comment.js"
const GetProductComment = async(req,res) => {
    const {productId} = req.params
    try{
    const comments = await Comment.find()
    const Productcomments =  comments.filter((comment) => comment.product.toString() === productId)
    return res.status(200).json({succes:true , message:"comment fetched succesfully" , data: Productcomments})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({succes:false , message:"an error occured"})
    }

}

export default GetProductComment