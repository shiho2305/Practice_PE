import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    discountPercentage: {
        type: Number,
    },
    images: [
        {
            url: String,
            caption: String
        },
    ],
    quantity: {
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    
});

let Product = mongoose.model('Product', productSchema);
export default Product;