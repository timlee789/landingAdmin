import React from "react";
import Link from 'next/link';

const ReadOnlyRow = ({ storeData, handleEditClick, handleDeleteClick}) => {
  return (
   
    <tr className="">
                <td>          
                   <button
                     type="button"
                     onClick={(event) => handleEditClick(event, storeData)}
                     className=" mr-5 px-4 bg-blue-400 text-white text-center">
                     EDIT
                   </button>
                  
                  <button  type="button" onClick={() => handleDeleteClick(storeData._id)}
                   className=" mr-5 px-4 bg-red-500 text-white text-center">
                     Delete
                   </button> 

                   <Link href={`campaign/${storeData._id}`}> 
                   <a> <button type="button"
                   className=" mr-10 px-4 bg-lime-700 text-white text-center">
                     Campaign
                   </button></a>
                   </Link>
                 </td>
      <td >{storeData.name}</td>
      <td className="pl-1">{storeData.img2}</td>  
      <td>{storeData.city}</td>
      <td>{storeData.state}</td>
      <td>{storeData.zip}</td>
      
      <td>{storeData.img1}</td>       
    </tr>
  );
};

export default ReadOnlyRow;