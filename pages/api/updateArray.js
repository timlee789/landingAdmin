
import { MongoClient } from 'mongodb';

import { ObjectId } from 'mongodb';
    
    export default async function handler(req, res) {
            
                // connect to the database
                const client = await MongoClient.connect(
                        process.env.MONGODB_URI
                    );
                    const db = client.db();
                    const { _id, campaignname, period, reach, visit, participation, content } = req.body;
                // update the published status of the post
                await db.collection('usavipstores').updateMany(
                    {
                        "_id": ObjectId(_id),
                    },
                    {
                        $push: 
                                    { "campaign" : { "campaignname": campaignname, 
                                                    "period": period, 
                                                    "reach": reach,
                                                    "visit": visit,
                                                    "participation" : participation,
                                                    "content": content
                                                }},                                
                    }
                    // [ 
                    //    { $set:
                    //     {campaign : 
                    //         [
                    //             { 'cate1': 'fullName', "cate2": "ldjflads;fj;sa"},
                    //             { 'cate1': 'fullName', "cate2": "ldjflads;fj;sa"},
                    //         ]
                    //     }
                    //     } 
                    // ]
                );
        
                // return a message
                return res.json({
                    message: "rPost updated successfully",
                    success: true,
                });
            
       
    }