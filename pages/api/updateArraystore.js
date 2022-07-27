
import { MongoClient } from 'mongodb';

import { ObjectId } from 'mongodb';
    
    export default async function handler(req, res) {
            
                // connect to the database
                const client = await MongoClient.connect(
                        process.env.MONGODB_URI
                    );
                    const db = client.db();
                    const { _id, name, city, zip, state, storename, img1, img2 } = req.body;
                // update the published status of the post
                await db.collection('usavipstores').updateMany(
                    {
                        "_id": ObjectId(_id),
                    },
                    {
                        $set: 
                                    {   "name": name, 
                                        "city": city, 
                                        "zip": zip,
                                        "state": state,
                                        "storename" : storename,
                                        "img1": img1,
                                        "img2": img2,
                                                },                                
                    }
                   
                );
        
                return res.json({
                    message: "rPost updated successfully",
                    success: true,
                });
            
       
    }