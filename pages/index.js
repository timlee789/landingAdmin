import React, { useState } from 'react'
import { MongoClient} from 'mongodb';
import ReadOnlyRow from '../components/ReadOnlyRow';
import axios from 'axios';

function index({landingdata}) {
  //console.log(landingdata)
    const [ storeData, setStoreData ] = useState(landingdata)
    const [addFormData, setAddFormData] = useState({
            name: "",
            address: "",
            phone: "",
            city: "",
            zip: "",
            state: "",
            storename: "",
            img1: "",
            img2: "",         
    });
   
    const [editContactId, setEditContactId] = useState(null);
    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
  
    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        const newStore = {
                name: addFormData.name,
                address: addFormData.address,
                phone: addFormData.phone,
                city: addFormData.city,
                zip: addFormData.zip,
                state: addFormData.state,
                storename: addFormData.storename,
                img1: addFormData.img1,
                img2: addFormData.img2,
        };
      
        const newStores = [...storeData, newStore];
        setStoreData(newStores)
        const response = await fetch('/api/dataInput', 
        {
          method: 'POST',
          body: JSON.stringify(
            {
                  name: addFormData.name,
                  address: addFormData.address,
                  phone: addFormData.phone,
                  city: addFormData.city,
                  zip: addFormData.zip,
                  state: addFormData.state,
                  storename: addFormData.storename,
                  img1: addFormData.img1,
                  img2: addFormData.img2,
            }
          ),
          headers: {
            'Content-type': 'application/json'
          }
        })
        const data = await response.json();
        console.log(storeData)
        // await axios.post('/api/dataInput', {
        // });
      }

 
    const handleDeleteClick = async (contactId) => {
      console.log(contactId);
    const newStores = [...storeData];
    const index = storeData.findIndex((contact) => contact._id === contactId);
    newStores.splice(index, 1);
    setStoreData(newStores);
    const deleteData = await axios.delete('/api/delete',{params:{_id:contactId}})
    .then(function (response) {
    console.log(response)
    })
    }
  return (
    <div className='bg-cyan-200'>
        <form onSubmit={handleAddFormSubmit}>
            <input type="text" name="name" placeholder="Enter name" required='required' onChange={handleAddFormChange}/>
            <input type="text" name="address" placeholder="Enter address" onChange={handleAddFormChange}/>
            <input type="text" name="phone" placeholder="Enter Phone Number" onChange={handleAddFormChange}/>
            <input type="text" name="city" placeholder="Enter City" onChange={handleAddFormChange}/>
            <input type="text" name="zip" placeholder="Enter Zip Code" onChange={handleAddFormChange}/>
            <input type="text" name="storename" placeholder="Enter URL" onChange={handleAddFormChange}/>
            <input type="text" name="img1" placeholder="Enter Image1" onChange={handleAddFormChange}/>
            <input type="text" name="img2" placeholder="Enter Image2" onChange={handleAddFormChange}/>
            
            <button type='submit'> Add </button>
        </form>
        <div className='bg-cyan-200'>High Class</div>
        <table>
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Phone</th>
              <th>Store Address</th>
              <th>City</th>
              <th>State</th> 
              <th>Zip Code</th> 
              <th>Store URL</th>
              <th>Image1</th>
             
            </tr>
          </thead>
          <tbody className='mt-4'>
              {storeData.map((dat) => (
                <ReadOnlyRow 
                  storeData = {dat}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
          </tbody>
        </table>

    </div>
  )
}

export const getServerSideProps = async() => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustertim.koved.mongodb.net/Landing?retryWrites=true&w=majority`
    );
const db = client.db();
const myCollection = db.collection('usavipstores');
const myData = await myCollection.find({}, {storename: 1}).toArray(); 
client.close();
  //const res = await axios.get('https://ghanabraid.com/api/store');
  return {
    props: {
      landingdata: myData.map(Data => ({
        id: Data._id.toString() ,
        name: Data.name || null,
        phone: Data.phone || null,
        address: Data.address || null,
        city: Data.city || null,
        zip: Data.zip || null,
        state: Data.state || null,
        storename: Data.storename || null,
        img1: Data.img1, 
  }))
     
    }
  }
}
export default index