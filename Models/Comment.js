import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    rating : {type :Number , required:true },
    product: { type: mongoose.Types.ObjectId, Ref: 'Product' },
    user: { type: mongoose.Types.ObjectId, Ref: 'User' },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment
