import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder={editFormData.name}
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="address"
          value={editFormData.address}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="phone"
          value={editFormData.phone}
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
        <input
          type="text"
          required="required"
          placeholder="Enter an Zip..."
          name="zip"
          value={editFormData.zip}
          onChange={handleEditFormChange}
        ></input>
        <input
          type="text"
          required="required"
          placeholder="Enter an statet..."
          name="state"
          value={editFormData.state}
          onChange={handleEditFormChange}
        ></input>
        <input
          type="text"
          required="required"
          placeholder="Enter an URL..."
          name="storename"
          value={editFormData.storename}
          onChange={handleEditFormChange}
        ></input>
        <input
          type="text"
          required="required"
          placeholder="Enter an Image1..."
          name="img1"
          value={editFormData.img1}
          onChange={handleEditFormChange}
        ></input>
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
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;