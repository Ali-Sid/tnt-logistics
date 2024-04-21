import { Box, Button, ButtonGroup, Dialog, DialogContent, DialogTitle, Divider, Drawer, Grid, IconButton, Input, List, ListItem, ListItemText, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import DisabledByDefault from '@mui/icons-material/DisabledByDefault';
import DisplayData from '../DisplayData';
import ViewItemsData from './ViewItemsData';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { BarcodeScanner } from 'react-qr-barcode-scanner';
import { CloseIcon } from '@chakra-ui/icons';


function DrawerViewItem({ open, handleClose, itemName, itemCode, handleChange, handleSave, numberOfEntries, price, description, dateInput, barcode }) {
  const [data, setData] = useState(null);
  const [openScanner, setOpenScanner] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F70F0F", // Set the primary color to red
      },
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/category-list/${itemCode}`);
        const newData = await response.json();
        // if (Array.isArray(newData)) {
        //   setData(newData);
        // } else {
        //   console.error('API response is not an array:', newData);
        // }
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

  // Check if data is empty
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const handleOpenScanner = () => {
    setOpenScanner(true);
  };

  const handleCloseScanner = () => {
    setOpenScanner(false);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
    >
      <div style={{ padding: "20px", width: "300px" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", overflow: "hidden", textOverflow: "ellipsis", width: '100%' }}>
          <Typography variant="h5" color='#5c5c5c' noWrap>
            {itemName}
          </Typography>
          <Box sx={{ padding: "2px", border: "1px solid #d32f2f", backgroundColor: "#d32f2f", color: "#fff", borderRadius: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "50px" }}>
            <Typography variant='h5' fontWeight={700} fontSize={25}>{data.length}</Typography>
          </Box>
        </div>
        {/* Display item code as a smaller text below the name */}
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" color='#a8a7a7' gutterBottom>
            {itemCode}
          </Typography>
          <Typography variant="subtitle1" color='#a8a7a7' gutterBottom>In Stock</Typography>
        </div>
        {/* <Divider sx={{ mb: "5px" }} /> */}
        <div style={{ border: "1px solid #d32f2f", borderRadius: "2px", padding: "0 5px 0 5px", backgroundColor: "#d32f2f" }}>
          <Typography borderRadius="5px" variant='p' color="#fff">Items in Catalogue</Typography>
        </div>
        {/* <DisplayData itemCode={itemCode} itemName={itemName}/> */}
        {/* <ViewItemsData itemName={itemName} /> */}

        {/* Display "Data not available" if there's no data */}
        {!data ? (
          <Typography variant="body1" color='#a8a7a7'>Data not available</Typography>
        ) : (
        <List sx={{ width: '100%' }}>
          {Array.isArray(data) && data.map((entry) => (
            <div key={entry.id}>
              <ListItem alignItems='flex-start'>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <ListItemText
                    primary={entry.ItemName}
                    secondary={
                      <>
                        <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='#a8a7a7'>
                          {entry.CatalogueCode}
                        </Typography>
                        {/* {` - ${entry.event_timestamp}`} */}
                      </>
                    }
                  />
                  <IconButton onClick={handleOpenScanner}>
                    <DocumentScannerIcon sx={{ color: "#d32f2f" }} />
                  </IconButton>
                  <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={openScanner}
                    onClose={handleCloseScanner}
                    PaperProps={{
                      sx: {
                        position: "fixed",
                        top: 10,
                        left: 0,
                        right: 0,
                        m: "0 auto",
                      },
                    }}
                    sx={{
                      '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for dim effect
                      },
                    }}
                  >
                    <DialogTitle>
                      <Grid container>
                        <Grid item>Scanner</Grid>
                        <Grid item xs="auto">
                          <IconButton aria-label="close" onClick={handleCloseScanner}>
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </DialogTitle>
                    <DialogContent>
                      {/* Your popup content goes here */}
                      <p>This is where you can place the scanner functionality or any other content you want to display in the popup.</p>
                    </DialogContent>
                  </Dialog>
                </Box>
              </ListItem>
              <Divider sx={{ margin: "-10px" }} />
            </div>
          ))}
        </List>
        )}

        {/* <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", gap: "10px", justifyContent: "space-around" }}>
          <Button fullWidth startIcon={<SaveIcon />} variant='contained' color='error' sx={{ textTransform: 'none', fontSize: "16px" }} onClick={handleSave}>Save</Button>
          <Button fullWidth startIcon={<DisabledByDefault />} variant='outlined' onClick={handleClose} color='error' start sx={{ textTransform: 'none', fontSize: "16px" }}>Cancel</Button>
        </div> */}
      </div>
    </Drawer>
  )
}

export default DrawerViewItem;
