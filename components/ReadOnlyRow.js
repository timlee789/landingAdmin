import React from "react";
import Link from 'next/link';

const ReadOnlyRow = ({ storeData, handleEditClick}) => {
  return (
    <tr>
      <td>{storeData.name}</td>
      <td>{storeData.id}</td>
      <td>{storeData.address}</td>
      <td>{storeData.phone}</td>
      <td>{storeData.city}</td>
      <td>{storeData.zip}</td>
      <td>{storeData.state}</td>
      <td>{storeData.storename}</td>
      {/* <td>{storeData.img1}</td>   */}
      <td>
      <Link href={`campaign/${storeData.id}`}> 
        <a> <button type="button">
          Campaign
        </button></a>
        </Link>

        <button
          type="button"
          onClick={(event) => handleEditClick(event, storeData)}
        >
          Edit
        </button>
        {/* <button  type="button" onClick={() => handleDeleteClick(storeData._id)}>
          Delete
        </button> */}


      </td>
    </tr>
  );
};

export default ReadOnlyRow;