import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
        <td>   
        <button type="button" onClick={handleCancelClick}  className=" mr-5 px-4 bg-blue-400 text-white text-center">
          Cancel
        </button>
        <button type="submit"  className=" mr-1 px-4 bg-gray-500 text-white text-center">SAVE</button>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Store Name"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
     
       <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an Category..."
          name="img2"
          value={editFormData.img2}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an City..."
          name="city"
          value={editFormData.city}
          onChange={handleEditFormChange}
        ></input>
        </td>
        <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an statet..."
          name="state"
          value={editFormData.state}
          onChange={handleEditFormChange}
        ></input>
        </td>
        <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an Zip..."
          name="zip"
          value={editFormData.zip}
          onChange={handleEditFormChange}
        ></input>
        </td>
       
        <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an Image1..."
          name="img1"
          value={editFormData.img1}
          onChange={handleEditFormChange}
        ></input>
        </td>
       
    
    </tr>
  );
};

export default EditableRow;