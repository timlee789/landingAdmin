import React from 'react';
import {MongoClient, ObjectId} from 'mongodb'
import CampaignInfo from "../../components/CampaignInfo";

export async function getStaticPaths(){
        const client = await MongoClient.connect(
                `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustertim.koved.mongodb.net/Landing?retryWrites=true&w=majority`
                );
        const db = client.db();
        const myCollection = db.collection('usavipstores');
        const store = await myCollection.find({}, {_id: 1}).toArray(); 
        client.close();
                // const res = await axios.get('http://localhost:3000/api/store');
                // const posts = await res.json();
                // console.log(posts);
                // const  paths = users.map((store) => ({
                //         params: {storename: store.storename.toString()},
                // }))
                return {
                 paths : store.map((data) => ({
                        params: {id: data._id.toString()}})),
                fallback: false
                }
               
}

export async function getStaticProps(context){
         const storeid = context.params.id;
        const client = await MongoClient.connect(
                `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustertim.koved.mongodb.net/Landing?retryWrites=true&w=majority`
                );
        const db = client.db();
        const myCollection = db.collection('usavipstores');
        const store = await myCollection.findOne({_id: ObjectId(storeid)}); 
        //const myData = users
        client.close();
        // const res = await axios.get('http://localhost:3000/api/store');
        // const posts = await res.json();
        
        return{
                props:{  
                        storeinfo:{ 
                                id: store._id.toString(),
                                storename: store.storename || null,
                                name: store.name || null,
                                phone: store.phone || null,
                                address: store.address || null,
                                city: store.City || null,
                                zip: store.zip || null,
                                state: store.state || null,
                                img1: store.img1 || null,
                                campaign: store.campaign || null,
                               
                        }    
                        },
                }
        }

export default function Campaign({storeinfo}){
     console.log(storeinfo)
    return(
            <div>     
                <CampaignInfo campaigninfo={storeinfo} />        
            </div>
    )

}