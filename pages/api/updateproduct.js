import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let p;
        for (let i = 0; i < req.body.length; i++) {
             p = await Product.findByIdAndUpdate(req.body[i]._id , req.body[i])
        }
        res.status(200).json({ success : "success" , p})
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);