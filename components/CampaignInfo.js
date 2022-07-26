import { useState } from 'react';

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

   
  return (
    <div className='mt-4'>

        <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="campaignname" placeholder="Enter Campaign Name" required='required' onChange={handleAddFormChange}/>
                <input type="text" name="period" placeholder="Enter period" onChange={handleAddFormChange}/>
                <input type="text" name="reach" placeholder="Enter Reach" onChange={handleAddFormChange}/>
                <input type="text" name="visit" placeholder="Enter Visit" onChange={handleAddFormChange}/>
                <input type="text" name="participation" placeholder="Enter Participation" onChange={handleAddFormChange}/>    
                <input type="text" name="content" placeholder="Enter Image" onChange={handleAddFormChange}/>    
            <button type='submit'> Add </button>
        </form>
      <form >
      <table>
        <thead>
            <tr>   
                <th>Campaign Name</th>
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
                    <td> {cam.campaignname}</td>
                    <td> {cam.period}</td>
                    <td>{cam.reach}</td>
                    <td> {cam.visit}</td>
                    <td> {cam.participation}</td>
                    <td> {cam.content}</td>

               </tr>
      
            ))}        
        
        </tbody>
      </table>
      </form>
    </div>
  )
}


export default CampaignInfo