import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    title : {
        type :String,
        required:true,
        unique :false
    },
    description : {
        type :String,
        required:false,
        unique :false
    },
    brand:{
        type :String,
        required:true,
        unique :false
    },
    image:{
        type :String,
        unique :false
    },
   soldOut : {
        type:Boolean,
        default:false,
        required:true,
   },
   
   size : [
    {
        contenance : {type:Number , required:true , default:50},
        quantity : {type:Number , required:true , default:0},
        price : {
            type :Number,
            required:true,
            unique :false
        },
    }
   ],
    notes:[
        {type:String,
            default:"",
            required:true
        }
    ],
    sex: {
        type:String,
        enum : ["woman" , "man"],
        required:true,
    },
    
    avgRating : {
        type:Number,
        default:0,
    },
    totalRating : {
        type:Number,
        default:0,
    }
})

const Product = mongoose.model("Product" , productSchema)

export default Product