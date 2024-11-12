import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo :{type :String , required:false , unique:false},
    bag : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    purchaces : [
        {
        product :  {   
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity :  {   
            type:Number,
            default:0
        },
        contenance :  {   
            type:Number,
            default:0
        },
        }
       
    ],
});

const User = mongoose.model('User', userSchema);

export default User
