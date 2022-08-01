import React, { Fragment, useState } from 'react'
import { MongoClient} from 'mongodb';
import ReadOnlyRow from '../components/ReadOnlyRow';
import EditableRow from '../components/EditableRow';
import axios from 'axios';

function index({landingdata}) {
  //console.log(landingdata)
    const [ storeDatas, setStoreData ] = useState(landingdata)
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
    const [editFormData, setEditFormData ] = useState({
            name: "",
            address: "",
            phone: "",
            city: "",
            zip: "",
            state: "",
            storename: "",
            img1: "",
            img2: "", 
   })
   
    const [editContactId, setEditContactId] = useState(null);
    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
    const handleEditFormChange = (event) => {
      event.preventDefault();
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
      const newFormData = { ...editFormData};
      newFormData[fieldName] = fieldValue;
      setEditFormData(newFormData)
}
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
      
        const newStores = [...storeDatas, newStore];
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
        setAddFormData("")
        // await axios.post('/api/dataInput', {
        // });
      }
      const handleEditFormSubmit = async(event) => {
        event.preventDefault();
        const editedContact = {
                name: addFormData.name,
                city: editFormData.city,
                zip: editFormData.zip,
                state: editFormData.state,
                storename: editFormData.storename,
                img1: editFormData.img1,
                img2: editFormData.img2,
        };
        
        const newContacts = [...storeDatas];
        const index = storeDatas.findIndex((contact) => contact.id === editContactId);
        newContacts[index] = editedContact;
        setStoreData(newContacts);
       
        const response = fetch('./api/updateArraystore', {
          method: 'PUT',
          body: JSON.stringify({
            "_id": editContactId,
            "name": editFormData.name,
            "city": editFormData.city,
            "zip": editFormData.zip,
            "state": editFormData.state,
            "storename": editFormData.storename,
            "img1": editFormData.img1,
            "img2": editFormData.img2,
          }),
          headers: {
            'Content-type': 'application/json'
          }
        })
       
        //const data = await response.json()
        setEditContactId(null);
}
      const handleEditClick = (event, storeData) => {
        event.preventDefault();
        setEditContactId(storeData._id);
        const formValues = {
                  name: storeData.name,
                  address: storeData.address,
                  phone: storeData.phone,
                  city: storeData.city,
                  zip: storeData.zip,
                  state: storeData.state,
                  storename: storeData.storename,
                  img1: storeData.img1,
                  img2: storeData.img2,
        };
        setEditFormData(formValues)
}
      const handleCancelClick = () => {
        setEditContactId(null);
      }
          const handleDeleteClick = async (contactId) => {
            console.log(contactId);
          const newStores = [...storeDatas];
          const index = storeDatas.findIndex((contact) => contact._id === contactId);
          newStores.splice(index, 1);
          setStoreData(newStores);
          const deleteData = await axios.delete('/api/delete',{params:{_id:contactId}})
          .then(function (response) {
          console.log(response)
          })
          }
  return (
    <div className='ml-12'>
      <div className='text-cyan-700 font-bold underline text-3xl ml-10 my-6'>ADD NEW STORE</div>
      <div >
        <form onSubmit={handleAddFormSubmit} >
            <input type="text" name="name" placeholder="Enter name" required='required' onChange={handleAddFormChange}/>
            <input type="text" name="address" placeholder="Enter address" onChange={handleAddFormChange}/>
            <input type="text" name="phone" placeholder="Enter Phone Number" onChange={handleAddFormChange}/>
            <input type="text" name="city" placeholder="Enter City" onChange={handleAddFormChange}/>
            <input type="text" name="zip" placeholder="Enter Zip Code" onChange={handleAddFormChange}/>
            <input type="text" name="storename" placeholder="Enter URL" onChange={handleAddFormChange}/>
            <input type="text" name="img1" placeholder="Enter Image1" onChange={handleAddFormChange}/>
            <input type="text" name="img2" placeholder="Enter Image2" onChange={handleAddFormChange}/>
            <button type='submit' className='bg-blue-400 text-white px-5'> Add </button>
        </form>
        </div>
        <div className='text-cyan-700 font-bold underline text-3xl ml-10 my-6'>VIP STORE LIST</div>
        <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Store Name</th>
              <th>Category</th>
              <th>City</th>
              <th>State</th> 
              <th>Zip Code</th>             
              <th>Image1</th>         
            </tr>
          </thead>
          <tbody className='mt-10'>       
              {storeDatas.map((contact) => (
                <Fragment>
                 {editContactId === contact._id ? (
                    <EditableRow 
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}/>
                 ): (
                    <ReadOnlyRow 
                    storeData = {contact}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick} />
                 )}     
                </Fragment>
              ))}           
          </tbody>
        </table>
        </form>
        <div className='mb-12 '></div>
    </div>
  )
}

export const getServerSideProps = async() => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustertim.koved.mongodb.net/Landing?retryWrites=true&w=majority`
    );
const db = client.db();
const myCollection = db.collection('usavipstores');
const myData = await myCollection.find({}, {state: 1}).toArray(); 
client.close();
  //const res = await axios.get('https://ghanabraid.com/api/store');
  return {
    props: {
      landingdata: myData.map(Data => ({
        _id: Data._id.toString() ,
        name: Data.name || null,   
        city: Data.city || null,
        zip: Data.zip || null,
        state: Data.state || null,
        storename: Data.storename || null,
        img1: Data.img1, 
        img2: Data.img2 || null,
  }))
     
    }
  }
}
export default index