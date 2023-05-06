const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema({
    name:{type: String , required: true},
    email:{type: String , required : true , unique : true},
    password:{type: String , required: true}
}, {timeStamps: true})

export default mongoose.models.User || mongoose.model("User" , UserSchema)
// mongoose.models = {}
// export default mongoose.model("User" , UserSchema);