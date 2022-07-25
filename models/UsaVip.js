import mongoose from "mongoose";


const usavipShema = new mongoose.Schema(
    {
        _id: {type: String },
        name: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        zip: {type: String, required: true},
        state: {type: String, required: true},
        storename: {type: String, required: true},
        img1: {type: String, required: true},
        img2: {type: String, required: false},
        img3: {type: String, required: false},
    },
   
);
const Usavip = mongoose.models.Usavip || mongoose.model('Usavip', usavipShema);
export default Usavip;