import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id:{type : String, required:true},
    name: {type: String, required:false},
    email: {type: String, required:false, unique:true },
    imageUrl : {type: String, required:false},
    cartItems: {type: Object, default: {} },
    wishlist: {type: Array, default: [] }
}, { minimize: false})

const User = mongoose.models.user || mongoose.model('user',userSchema)

export default User