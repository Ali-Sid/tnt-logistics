// import { Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Drawer, Button, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import DisabledByDefault from '@mui/icons-material/DisabledByDefault';
import SaveIcon from '@mui/icons-material/Save';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { NumberInput, NumberInputField } from '@chakra-ui/react';

function NewItemButton() {

    const [isOpen, setIsOpen] = useState(false);
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [count, setCount] = useState('');
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // const formRef = useRef(null);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setIsOpen(open);
    };

    useEffect(() => {
        // Fetch types
        fetch('http://localhost:3000/api/types')
            .then(response => response.json())
            .then(data => setTypes(data));

        // Fetch categories
        fetch('http://localhost:3000/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    // const generateEntries = (itemCode, itemName, numberOfEntries) => {
    //     // const baseCode = itemCode.split('-')[0];
    //     const entries = [];

    //     for (let i = 1; i <= numberOfEntries; i++) {
    //         // const categoryCode = `${baseCode}-${i}`;
    //         let categoryCode = i.toString().padStart(6, '0');
    //         // numbers.push(paddedNumber);
    //         const timestamp = new Date().toISOString();
    //         entries.push({ itemCode, itemName, categoryCode, timestamp });
    //     }

    //     return entries;
    // };

    const generateEntries = (itemCode, itemName) => {
        const timestamp = new Date().toISOString();
        return { itemCode, itemName, timestamp };
    };


    const sendEntriesToBackend = async (entries) => {
        try {
            const response = await axios.post('http://localhost:3000/item-list', entries);
            console.log('Entries added successfully:', response.data);
            return response.data
        } catch (error) {
            console.error('Error adding entries:', error);
        }
    };


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Add your form submission logic here
    //     // For example, you can send the form data to the server


    //     // Get form data
    //     // const formData = new FormData(formRef.current);
    //     // const itemCode = formData.get('itemCode');
    //     // const itemName = formData.get('itemName');

    //     console.log('Form data:', itemCode, itemName);

    //     const entries = generateEntries(itemCode, itemName);
    //     sendEntriesToBackend([entries]);
    //     console.log('Form submitted');
    //     // Close the drawer after form submission
    //     setIsOpen(false);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const formData = new FormData();
        // formData.append('itemCode', itemCode);
        // formData.append('itemName', itemName);


        try {
            const response = await axios.post('http://localhost:3000/item-list', { itemName, itemCode, selectedType, selectedCategory, count });

            if (response.status !== 201) {
                throw new Error('Network response was not ok');
            }

            console.log(response.data);
            window.location.reload()
            setIsOpen(false);
        } catch (error) {
            console.error('There was a problem with your Axios request:', error);
        }
    }


    return (
        <div>
            <Button sx={{ textTransform: 'none', fontSize: "16px", color: "#d32f2f" }} onClick={toggleDrawer(true)}><BookmarkAddIcon /> Add New</Button>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                <div>
                    <h2 style={{ textAlign: "left", paddingLeft: "20px", paddingTop: "20px" }}>Add New Item</h2>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", padding: "20px" }}>
                        {/* Add your form fields here */}
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <TextField
                                label="Item Code"
                                name='itemCode'
                                value={itemCode}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                // sx={{ width: "90%" }}
                                onChange={(event) => setItemCode(event.target.value)}
                            />
                            <TextField
                                label="Item Name"
                                name='itemName'
                                value={itemName}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                // sx={{ width: "90%" }}
                                onChange={(event) => setItemName(event.target.value)}
                            />
                            <TextField
                                label="Type"
                                name='types'
                                value={selectedType}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                sx={{ marginBottom: "20px" }}
                                select
                                onChange={(event) => setSelectedType(event.target.value)}
                            >
                                {types.map((type) => (
                                    <MenuItem key={type.type_id} value={type.type_name}>
                                        {type.type_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Category"
                                name='category'
                                value={selectedCategory}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                sx={{ marginBottom: "20px" }}
                                select
                                onChange={(event) => setSelectedCategory(event.target.value)}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.category_id} value={category.category_name}>
                                        {category.category_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                type='number'
                                label="Count"
                                name='count'
                                value={count}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                // sx={{ width: "90%" }}
                                sx={{ marginBottom: "20px" }}
                                onChange={(event) => setCount(event.target.value)}
                            />
                        </div>
                        {/* <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                            {/* <Button sx={{ width: "90%" }} type="submit" variant="contained" color="primary">
                                Save and New
                            </Button> */}
                        {/* <Button sx={{ width: "90%" }} type="submit" variant="contained" color="primary">
                                Save and Close
                            </Button>
                        </div> */}
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "10px", alignItems: "center" }}>
                            <Button fullWidth type='submit' startIcon={<SaveIcon />} variant='contained' color='error' sx={{ textTransform: 'none', fontSize: "16px" }} >Save</Button>
                            <Button fullWidth startIcon={<DisabledByDefault />} variant='outlined' onClick={toggleDrawer(false)} color='error' start sx={{ textTransform: 'none', fontSize: "16px" }}>Cancel</Button>
                        </div>

                    </form>
                    {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Button onClick={toggleDrawer(false)}>Close</Button>
                    </div> */}
                </div>
            </Drawer>
        </div>
    )
}

export default NewItemButton
