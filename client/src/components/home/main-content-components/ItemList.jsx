import { Avatar, Flex, useDisclosure } from '@chakra-ui/react'
import { Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import SelectedAssetContext from '../../../SelectedAssetContext';
import AddButton from '../../reusable-assets/AddButton';
import '../../../assets/list.scss'

function ItemList({onItemClick}) {
    const { setSelectedAsset } = useContext(SelectedAssetContext);
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newItem, setNewItem] = useState({ itemCode: '', itemName: '' });
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [selectedItem, setSelectedItem] = useState({ name: '', code: '' });

    const handleItemClick = (item) => {
        // setSelectedItem(item);
        onItemClick(item);
    };


    useEffect(() => {
        axios.get('http://localhost:3000/label')
            .then(response => {
                setTitle(response.data.name);
            })
            .catch(error => {
                console.error('Error fetching title:', error);
            });

        axios.get('http://localhost:3000/item-list')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching item list:', error);
            });
    }, []);

    const handleAssetClick = (item) => {
        setSelectedAsset(item);
        setSelectedRowId(item.item_id);
    };

    const handleInputChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleAddAsset = () => {
        axios.post('http://localhost:3000/item-list', newItem)
            .then(response => {
                setItems(prevAssets => [response.data, ...prevAssets]);
                onClose();
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    };



    return (
        <Box className='panel-style hide-scrollbar' overflowY="auto" minH="100vh" sx={{
            '&::-webkit-scrollbar': {
                width: '10px',
            },
            '&::-webkit-scrollbar-track': {
                background: 'gray.200',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'gray.500',
                borderRadius: '10px',
            }
        }}>
            <div className='title-bar panel-header'>
                <h2>{title}</h2>
                <AddButton onClick={onOpen} />
            </div>

            <div style={{ height: "100%", width: "100%", marginRight: "50px", maxHeight: "calc(100vh - 150px)", overflowY: "auto", padding: "20px" }}>
                <List spacing={3}>
                    {items.map((item, index) => (
                        <ListItem key={index} onClick={() => handleItemClick(item)} bg={selectedRowId === item.item_id ? '#f5f5f5' : 'transparent'} color={selectedRowId === item.item_id ? 'white' : 'black'} cursor="pointer">
                            <Flex justify="space-between" align="center" width="100%">
                                <Box width="70%">{item.item_name}</Box>
                                <Box width="30%" variant="body2">{item.item_code}</Box>
                            </Flex>
                        </ListItem>
                    ))}
                </List>
            </div>

            {/* <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(2px)" />
                <ModalContent border="1px" borderColor="gray.200" backgroundColor="#fff" padding="20px" borderRadius="md" w="500px" maxW="100%" h="fit-content" mx="auto" my="auto">
                    <ModalHeader as="h2" color="#575757">Add New Catalogue Item</ModalHeader>
                    <ModalBody display="flex" flexDirection="column" mt={5}>
                        <FormControl fullWidth label="Item Code" name="itemCode" InputLabelProps={{ style: { color: 'grey' } }}>
                            <Input variant='standard' label="Item Code" name="itemCode" InputLabelProps={{ style: { color: 'grey' } }} value={newItem.itemCode} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl fullWidth label="Item Name" name="itemName" InputLabelProps={{ style: { color: 'grey' } }} mt={4}>
                            <Input variant='standard' label="Item Name" name="itemName" InputLabelProps={{ style: { color: 'grey' } }} value={newItem.itemName} onChange={handleInputChange} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter mt={5} gap={5}>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button colorScheme="red" mr={3} onClick={handleAddAsset}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
        </Box>
    )
}

export default ItemList