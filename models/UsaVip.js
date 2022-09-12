import mongoose from "mongoose";


const usavipstoreSchema = new mongoose.Schema(
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
        campaign: 
        [
            { 
                campaignname: {type: String, required: false},
                period: {type: String, required: false},
                reach: {type: String, required: false},
                visit: {type: String, required: false},
                participation: {type: String, required: false},
                content: {type: String, required: false},
            },
        ],
    },
   
);
const Usavipstore = mongoose.models.Usavipstore || mongoose.model('Usavipstore', usavipstoreSchema);
export default Usavipstore;