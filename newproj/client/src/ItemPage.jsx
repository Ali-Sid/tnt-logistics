import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, Typography, TableContainer, TableHead, TableRow, Drawer, IconButton, Button, DialogContent, DialogTitle, Dialog, TableSortLabel, TextField } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Input } from '@chakra-ui/react'
import axios from 'axios';
import { EditIcon } from '@chakra-ui/icons';
import DrawerAdd2Cat from './utils/DrawerAdd2Cat';
import { useNavigate } from 'react-router-dom';
import NewItemButton from './utils/NewItemButton';
import DrawerAdditem from './utils/DrawerAdditem';
import DisabledByDefault from '@mui/icons-material/DisabledByDefault';
import SaveIcon from '@mui/icons-material/Save';
import PageviewIcon from '@mui/icons-material/Pageview';
import DrawerViewItem from './utils/DrawerViewItem';
import SearchBar from './utils/SearchBar';
import BottomNav from './utils/BottomNav';
import { useMediaQuery } from '@mui/material';


function ItemPage() {
    const [items, setItems] = useState([]);
    const [numberOfEntries, setNumberOfEntries] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [price, setPrice] = useState('')
    const [barcode, setBarcode] = useState('')
    const [description, setDescription] = useState('')
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('item_id');
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [itemCode, setItemCode] = useState('')
    const [itemName, setItemName] = useState('')
    const [openCatDrawer, setOpenCatDrawer] = useState(false);
    const [openViewDrawer, setOpenViewDrawer] = useState(false);
    const [dateInput, setDateInput] = useState(null)
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const tableCellStyle = {
        fontSize: isMobile ? '0.8rem' : '0.875rem',
        padding: isMobile ? '4px 8px' : '16px',
    };


    const navigate = useNavigate()
    // const [drawerTitle, setDrawerTitle] = useState('');

    // const handleOpenDrawer = (item) => {
    //     setSelectedItem(item);
    //     setDrawerTitle(`Add to Catelogue - ${item.item_name}`);
    //     setOpenDrawer(true);
    // }

    const handleRowClick = (itemCode) => {
        navigate(`/category-list/${itemCode}`);
    };


    const handleOpen = (item) => {
        setSelectedItem(item);
        setItemCode(item.item_code); // Set item code based on the selected row's item_code
        setItemName(item.item_name);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/item-list');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchData();
    }, []);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     switch (name) {
    //         case 'itemCode':
    //             setItemCode(value);
    //             break;
    //         case 'itemName':
    //                 setItemName(value);
    //                 break;
    //         case 'numberOfEntries':
    //             setNumberOfEntries(parseInt(value));
    //             break;
    //         case 'unitPrice':
    //             setPrice(parseInt(value));
    //             break;
    //         case 'dateInput':
    //                 setDateInput(value);
    //                 break;
    //         case 'description':
    //             setDescription(value);
    //             break;
    //         default:
    //             break;
    //     }
    // };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "itemCode") setItemCode(value);
        if (name === "itemName") setItemName(value);
        if (name === "numberOfEntries") setNumberOfEntries(parseInt(value));
        if (name === "unitPrice") setPrice(parseInt(value));
        if (name === "barcode") setBarcode(parseInt(value));
        if (name === "dateInput") setDateInput(value);
        if (name === "description") setDescription(value);
    };

    const generateEntries = (itemCode, itemName, numberOfEntries, description, dateInput) => {
        // const baseCode = itemCode.split('-')[0];
        const entries = [];

        for (let i = 1; i <= numberOfEntries; i++) {
            // const categoryCode = `${baseCode}-${i}`;
            let catalogueCode = i.toString().padStart(6, '0');
            // numbers.push(paddedNumber);
            const timestamp = new Date().toISOString();
            entries.push({ itemCode, itemName, catalogueCode, timestamp, description, dateInput });
        }

        return entries;
    };

    const sendEntriesToBackend = async (entries) => {
        try {
            const response = await axios.post('http://localhost:3000/category-list', entries);
            console.log('Entries added successfully:', response.data);
        } catch (error) {
            console.error('Error adding entries:', error);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const entries = generateEntries(itemCode, itemName, numberOfEntries, description, dateInput);
        sendEntriesToBackend(entries);
        handleCloseCatDrawer();
    };

    const createSortHandle = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    // Function to handle opening drawer for editing item
    const handleOpenDrawer = (cell) => {
        setSelectedItem(cell);
        setOpenDrawer(true);
    };
    // Function to handle opening drawer for editing item
    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    };
    // Function to handle opening drawer for Adding to catalogue
    const handleCatDrawer = (item) => {
        setItemCode(item.item_code);
        setItemName(item.item_name);
        setSelectedItem(item);
        setOpenCatDrawer(true);
    };
    // Function to handle opening drawer for Adding to catalogue
    const handleCloseCatDrawer = () => {
        setOpenCatDrawer(false);
    };

    // Function to handle opening drawer for Adding to catalogue
    const handleViewDrawer = (item) => {
        setItemCode(item.item_code);
        setItemName(item.item_name);
        setSelectedItem(item);
        setOpenViewDrawer(true);
    };
    // Function to handle opening drawer for Adding to catalogue
    const handleCloseViewDrawer = () => {
        setOpenViewDrawer(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/item-list/${selectedItem.item_id}`, {
                itemCode: selectedItem.item_code,
                itemName: selectedItem.item_name
            });

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            console.log(response.data);
            setOpenDrawer(false);
            window.location.reload()
        } catch (error) {
            console.error('There was a problem with your Axios request:', error);
        }

    }

    return (
        <Box sx={{ width: "100%"}}>
            <div style={{ display: "flex", maxWidth: isMobile && "100%", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                <div><h1>Items</h1></div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "right" }}>
                    <NewItemButton itemCode={itemCode} itemName={itemName} />
                    <SearchBar />
                </div>
            </div>
            {isMobile ? (
                // <div style={{overflowX: 'auto', maxWidth: isMobile ? '100%' : 'none'}}>
                <TableContainer sx={{ overflowX: 'auto', boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)" }}>
                    <Table sx={{width: "max-content"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableCellStyle}>
                                    <TableSortLabel
                                        active={orderBy === 'item_id'}
                                        direction={orderBy === 'item_id' ? order : 'asc'}
                                        onClick={createSortHandle('item_id')}
                                    >
                                        #
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                    <TableSortLabel
                                        active={orderBy === 'item_code'}
                                        direction={orderBy === 'item_code' ? order : 'asc'}
                                        onClick={createSortHandle('item_code')}
                                    >
                                        Item Code
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                    <TableSortLabel
                                        active={orderBy === 'item_name'}
                                        direction={orderBy === 'item_name' ? order : 'asc'}
                                        onClick={createSortHandle('item_name')}
                                    >
                                        Item Name
                                    </TableSortLabel>
                                </TableCell>
                                {/* <TableCell>
                            <TableSortLabel
                                active={orderBy === 'item_create_date'}
                                direction={orderBy === 'item_create_date' ? order : 'asc'}
                                onClick={createSortHandle('item_create_date')}
                            >
                                Created
                            </TableSortLabel>
                        </TableCell> */}
                                <TableCell style={tableCellStyle} sx={{ textAlign: "center" }}>A2C</TableCell>
                                <TableCell style={tableCellStyle} sx={{ textAlign: "center" }}>Edit</TableCell>
                                <TableCell style={tableCellStyle} sx={{ textAlign: "center" }}>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={index} onClick={() => handleRowClick(item.item_code)} style={{
                                    backgroundColor: selectedRowId === item.item_id ? '#f5f5f5' : 'transparent',
                                    color: selectedRowId === item.item_id ? 'white' : 'black',
                                    cursor: 'pointer'
                                }}
                                >
                                    <TableCell style={tableCellStyle}>{item.item_id}</TableCell>
                                    <TableCell style={tableCellStyle}>{item.item_code}</TableCell>
                                    <TableCell style={tableCellStyle}>{item.item_name}</TableCell>
                                    {/* <TableCell>{formatDate(item.item_create_date)}</TableCell> */}
                                    <TableCell style={tableCellStyle}>
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleCatDrawer(item) }}>
                                            <PlaylistAddIcon sx={{ color: "#d32f2f" }} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={tableCellStyle}>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpenDrawer(item) }}><EditIcon boxSize={18} color="#d32f2f" /></Button>
                                    </TableCell>
                                    <TableCell style={tableCellStyle}>
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleViewDrawer(item) }}>
                                            <PageviewIcon sx={{ color: "#d32f2f" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                /* </div> */
            ) : (
                <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%', boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableCellStyle}>
                                    <TableSortLabel
                                        active={orderBy === 'item_id'}
                                        direction={orderBy === 'item_id' ? order : 'asc'}
                                        onClick={createSortHandle('item_id')}
                                    >
                                        #
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                    <TableSortLabel
                                        active={orderBy === 'item_code'}
                                        direction={orderBy === 'item_code' ? order : 'asc'}
                                        onClick={createSortHandle('item_code')}
                                    >
                                        Item Code
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={tableCellStyle}>
                                    <TableSortLabel
                                        active={orderBy === 'item_name'}
                                        direction={orderBy === 'item_name' ? order : 'asc'}
                                        onClick={createSortHandle('item_name')}
                                    >
                                        Item Name
                                    </TableSortLabel>
                                </TableCell>
                                {/* <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'item_create_date'}
                                    direction={orderBy === 'item_create_date' ? order : 'asc'}
                                    onClick={createSortHandle('item_create_date')}
                                >
                                    Created
                                </TableSortLabel>
                            </TableCell> */}
                                <TableCell style={tableCellStyle} sx={{ textAlign: "center" }}>A2C</TableCell>
                                <TableCell style={tableCellStyle} sx={{ textAlign: "center" }}>Edit</TableCell>
                                <TableCell style={tableCellStyle} sx={{ textAlign: "center" }}>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={index} onClick={() => handleRowClick(item.item_code)} style={{
                                    backgroundColor: selectedRowId === item.item_id ? '#f5f5f5' : 'transparent',
                                    color: selectedRowId === item.item_id ? 'white' : 'black',
                                    cursor: 'pointer'
                                }}
                                >
                                    <TableCell style={tableCellStyle}>{item.item_id}</TableCell>
                                    <TableCell style={tableCellStyle}>{item.item_code}</TableCell>
                                    <TableCell style={tableCellStyle}>{item.item_name}</TableCell>
                                    {/* <TableCell>{formatDate(item.item_create_date)}</TableCell> */}
                                    <TableCell style={tableCellStyle}>
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleCatDrawer(item) }}>
                                            <PlaylistAddIcon sx={{ color: "#d32f2f" }} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={tableCellStyle}>
                                        <Button onClick={(e) => { e.stopPropagation(); handleOpenDrawer(item) }}><EditIcon boxSize={18} color="#d32f2f" /></Button>
                                    </TableCell>
                                    <TableCell style={tableCellStyle}>
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleViewDrawer(item) }}>
                                            <PageviewIcon sx={{ color: "#d32f2f" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {/* <BottomNav /> */}

            {/* Drawer component */}
            <DrawerAdditem
                open={openCatDrawer}
                handleClose={handleCloseCatDrawer}
                itemName={itemName}
                itemCode={itemCode}
                handleChange={handleChange}
                handleSave={handleSave}
                numberOfEntries={numberOfEntries}
                price={price}
                description={description}
                dateInput={dateInput}
                barcode={barcode}
            />
            {/* View Drawer */}
            <DrawerViewItem
                open={openViewDrawer}
                handleClose={handleCloseViewDrawer}
                itemName={itemName}
                itemCode={itemCode}
                handleChange={handleChange}
                handleSave={handleSave}
            // numberOfEntries={numberOfEntries}
            // price={price}
            // description={description}
            // dateInput={dateInput}
            // barcode={barcode}
            />
            {/* <Drawer
                anchor="right"
                open={openCatDrawer}
                onClose={handleCloseCatDrawer}
            >
                <div style={{ width: "300px", padding: "20px" }}>
                    <Typography variant="h5">Add to Catalogue</Typography>
                    {/* Add your drawer content here */}
            {/* <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            label="Item Code"
                            name='itemCode'
                            value={selectedItem ? selectedItem.item_code : ''}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            sx={{ marginBottom: "20px" }}
                            onChange={(event) => setSelectedItem({ ...selectedItem, item_code: event.target.value })}
                        />
                        <TextField
                            label="Item Name"
                            name='itemName'
                            value={selectedItem ? selectedItem.item_name : ''}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            sx={{ marginBottom: "20px" }}
                            onChange={(event) => setSelectedItem({ ...selectedItem, item_name: event.target.value })}
                        />
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button type="submit" variant="contained" color="primary" sx={{ marginRight: "10px" }}>
                                Save
                            </Button>
                            <Button onClick={handleCloseDrawer} variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </Drawer> */}

            {/* Drawer */}
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={handleCloseDrawer}
            >
                <div style={{ width: "300px", padding: "20px" }}>
                    <h2 style={{ textAlign: "left" }}>Edit Item</h2>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            label="Item Code"
                            name='itemCode'
                            value={selectedItem ? selectedItem.item_code : ''}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            sx={{ marginBottom: "20px" }}
                            onChange={(event) => setSelectedItem({ ...selectedItem, item_code: event.target.value })}
                        />
                        <TextField
                            label="Item Name"
                            name='itemName'
                            value={selectedItem ? selectedItem.item_name : ''}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            sx={{ marginBottom: "20px" }}
                            onChange={(event) => setSelectedItem({ ...selectedItem, item_name: event.target.value })}
                        />
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "10px", alignItems: "center" }}>
                            <Button fullWidth type='submit' startIcon={<SaveIcon />} variant='contained' color='error' sx={{ textTransform: 'none', fontSize: "16px" }} >Save</Button>
                            <Button fullWidth startIcon={<DisabledByDefault />} variant='outlined' onClick={handleCloseDrawer} color='error' start sx={{ textTransform: 'none', fontSize: "16px" }}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </Drawer>
        </Box>
    );
}

export default ItemPage;
