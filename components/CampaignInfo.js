import { useState } from 'react';
import React from 'react';
function CampaignInfo({campaigninfo}) {

    const [addFormData, setAddFormData] = useState({
        id:campaigninfo.id,
        campaignname: "",
        period: "",
        reach: "",
        visit: "",
        participation: "",
        content: "",
             
});
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
                _id: campaigninfo.id,
                campaignname: addFormData.campaignname,
                period: addFormData.period,
                reach: addFormData.reach,
                visit: addFormData.visit,
                participation: addFormData.participation,
                content: addFormData.content,
        };
      
       // const newStores = [...storeData, newStore];
        //setStoreData(newStore)
        const response = await fetch('/api/updateArray', 
        {
          method: 'POST',
          body: JSON.stringify(
            {
                _id: campaigninfo.id,
                campaignname: addFormData.campaignname,
                period: addFormData.period,
                reach: addFormData.reach,
                visit: addFormData.visit,
                participation: addFormData.participation,
                content: addFormData.content,
            }
          ),
          headers: {
            'Content-type': 'application/json'
          }
        })
        const data = await response.json();
        //console.log(storeData)
        // await axios.post('/api/dataInput', {
        // });
      }
      async function submitDelete(id){
        const res = await fetch('http://localhost:3000/api/delete',
        {
          method: 'DELETE',
          body: id,
        }
        )
      }
   
  return (
    <div className='m-8'>
       <div className='my-8 text-2xl pl-16 text-blue-600 text-3xl'>NEW CAMPAIGN</div>
        <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="campaignname" placeholder="Enter Campaign Name" required='required' onChange={handleAddFormChange}/>
                <input type="text" name="period" placeholder="Enter period" onChange={handleAddFormChange}/>
                <input type="text" name="reach" placeholder="Enter Reach" onChange={handleAddFormChange}/>
                <input type="text" name="visit" placeholder="Enter Visit" onChange={handleAddFormChange}/>
                <input type="text" name="participation" placeholder="Enter Participation" onChange={handleAddFormChange}/>    
                <input type="text" name="content" placeholder="Enter Image" onChange={handleAddFormChange}/>    
            <button type='submit' className='bg-blue-400 text-white px-5'> Add </button>
        </form>
      <form >
      <div className='my-8 text-2xl pl-16 text-blue-600 text-3xl'>CAMPAIGN HISTORY</div>
      <table>
        <thead>
            <tr className='text-lg'>   
                <th className='pr-4'>Campaign Name</th>
                <th>Period</th>
                <th>Reach</th>
                <th>Visit</th>
                <th>Participation</th> 
                <th>Content</th> 
            </tr>
        </thead>
        <tbody>    
        
               { campaigninfo.campaign.map((cam, index) => (
               <tr>
                    <td className='pr-8'> {cam.campaignname}</td>
                    <td className='pr-12 pl-8'> {cam.period}</td>
                    <td className='pr-12 pl-8'>{cam.reach}</td>
                    <td className='pr-12 pl-8'> {cam.visit}</td>
                    <td className='pr-12 pl-8'> {cam.participation}</td>
                    <td className='pr-12 pl-12'> {cam.content}</td>
                    <td className='pr-12 pl-12'> 
                    <button className='my-8 text-2xl pl-16 text-red-600 text-3xl' onClick={submitDelete(cam._id)}>Delete</button>
                    </td>

               </tr>
      
            ))}        
        
        </tbody>
      </table>
      </form>
    </div>
  )
}


export default CampaignInfo