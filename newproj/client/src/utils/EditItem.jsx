import React, { useState } from 'react';
import { Drawer, Button, TextField } from '@mui/material';
import axios from 'axios';

function EditItem({ initialItem, onSave }) {
    const [isOpen, setIsOpen] = useState(false);
    const [itemCode, setItemCode] = useState(initialItem?.itemCode || '');
    const [itemName, setItemName] = useState(initialItem?.itemName || '');
    const [selectedType, setSelectedType] = useState(initialItem?.selectedType || '');
    const [selectedCategory, setSelectedCategory] = useState(initialItem?.selectedCategory || '');

    const toggleDrawer = (open) => () => {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.put(`http://localhost:3000/item-list/${initialItem.id}`, {itemName, itemCode});
    
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
    
            console.log(response.data);
            setIsOpen(false);
            onSave(); // Notify parent component that item has been saved
        } catch (error) {
            console.error('There was a problem with your Axios request:', error);
        }
    }
    

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                {initialItem ? 'Edit' : 'Add New'}
            </Button>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                <div>
                    <h2 style={{ textAlign: "center" }}>{initialItem ? 'Edit Item' : 'Add New Item'}</h2>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "500px", }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <TextField
                                label="Item Code"
                                name='itemCode'
                                value={itemCode}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                sx={{ width: "90%" }}
                                onChange={(event) => setItemCode(event.target.value)}
                            />
                            <TextField
                                label="Item Name"
                                name='itemName'
                                value={itemName}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                sx={{ width: "90%" }}
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
                        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                            <Button sx={{ width: "90%" }} type="submit" variant="contained" color="primary">
                                {initialItem ? 'Save Changes' : 'Save and Close'}
                            </Button>
                        </div>
                    </form>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Button onClick={toggleDrawer(false)}>Close</Button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default EditItem;
