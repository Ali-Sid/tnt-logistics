import axios from 'axios';
import React, { useState } from 'react'

function FrmAdditem() {
  const [itemName, setItemName] = useState('')
  const [itemCode, setItemCode] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append('itemCode', itemCode);
    // formData.append('itemName', itemName);
    

    try {
        const response = await axios.post('http://localhost:3000/item-list', {itemName, itemCode});

        if (response.status !== 201) {
            throw new Error('Network response was not ok');
        }

        console.log(response.data);
    } catch (error) {
        console.error('There was a problem with your Axios request:', error);
    }
};
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='code' type='text' onChange={(e) => setItemCode(e.target.value)}/><br />
            <input placeholder='name' type='text' onChange={(e) => setItemName(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default FrmAdditem