import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

// WITHOUT CRYPTO JS 
// const handler = async (req, res) => {
//     if (req.method == 'POST') {
//         //  console.log(req.body);
//         let user = await User.findOne({ email: req.body.email })
//         if (user) {
//             if (req.body.email == user.email && req.body.password == user.password) { }
//             res.status(400).json({ success: true, email: user.email, name: user.name })
//         }
//         else {
//             res.status(400).json({ success: false, error: "Invalid credentials" })
//         }
//     }
//     else {
//         res.status(400).json({ success: false, error: "No user found" })
//     }
// }

// export default connectDb(handler);

// WITH CRYPTO JS
const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ email: req.body.email })

        const bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
        // console.log(bytes.toString(CryptoJS.enc.Utf8))
        var decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedPass) {
                // res.status(200).json({ success: true, email: user.email, name: user.name })
                var token = jwt.sign({ email: user.email, name: user.name }, 'jwt123' ,{
                    expiresIn : '7d'});
                res.status(200).json({success: true , token})
            }
            else {
                res.status(400).json({ success: false, error: "Invalid credentials" })
            }
        }
        else{
            res.status(400).json({ success: false, error: "No user found" })
        }

    }
    else {
        res.status(400).json({ success: false, error: "No user found" })
    }
}

export default connectDb(handler);