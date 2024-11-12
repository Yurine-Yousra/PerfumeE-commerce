import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
    user : {type:mongoose.Types.ObjectId , Ref:'User'},
    total : {type:Number , default:0},
    products : [
        {
                product : {type:String}
            ,
                quantity : {type:Number},
                contenance : {type:Number},
                price : {type :Number}
        }
        
    ]

} , {timestamps :true}
)

const Bill = mongoose.model('Bill' , BillSchema)

export default Bill 