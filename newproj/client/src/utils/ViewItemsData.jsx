import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ViewItemsData() {

    const [data, setData] = useState(null);
    const { itemCode } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/category-list/${itemCode}`);
                const newData = await response.json();
                console.log('Received data:', newData); // Log received data
                setData(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [itemCode]); // Dependency array to refetch data when itemCode changes

    if (!data) {
        return <div>Loading...</div>;
    }
    if (data.error) {
        return <div>Error: {data.error}</div>;
    }


    // Ensure data is an array and has at least one element before accessing its properties
    const firstItem = data[0];
    if (!firstItem) {
        return <div>No data available.</div>;
    }

  return (
    <div>
        <List sx={{width: "100%"}}>
            <ListItem alignItems='flex-start'>
                <ListItemText primary={firstItem.ItemName} secondary={
                    <>
                    <Typography sx={{display: "inline"}} component="span" variant='body2' color="text.primary">Nothing</Typography>
                    </>
                } />
            </ListItem>
            <Divider />
        </List>
    </div>
  )
}

export default ViewItemsData