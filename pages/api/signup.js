import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js")
// Without crypto js
// const handler = async (req, res) => {
//     if (req.method == 'POST') {
//         // console.log(req.body);
//             let u = new User(req.body)
//             await u.save()
//             res.status(400).json({ success : "This method is allowed" })
//         }

//     else {
//         res.status(400).json({ error: "This method is not allowed" })
//     }
// }

// export default connectDb(handler);


const handler = async (req, res) => {
    if (req.method == 'POST') {
        // console.log(req.body);
            const {name , email} = req.body;
            let u = new User({name , email , password: CryptoJS.AES.encrypt(req.body.password, 'secret123').toString() })
            await u.save()
            res.status(400).json({ success : "This method is allowed" })
        }

    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);