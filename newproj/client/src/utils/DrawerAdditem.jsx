import { Button, ButtonGroup, Divider, Drawer, Input, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import DisabledByDefault from '@mui/icons-material/DisabledByDefault';

function DrawerAdditem({ open, handleClose, itemName, itemCode, handleChange, handleSave, numberOfEntries, price, description, barcode }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F70F0F", // Set the primary color to red
      },
    },
  });

  // Function to get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
    // return `${day} - ${month} - ${year}`;
  };

  // Initialize dateInput state with current date
  const [dateInput, setDateInput] = useState(getCurrentDate());

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
    >
      <div style={{ padding: "20px", width: "300px" }}>
        <Typography variant="h4" color='#5c5c5c'>
          {itemName}
        </Typography>
        {/* Display item code as a smaller text below the name */}
        <Typography variant="subtitle1" color='#a8a7a7' gutterBottom>
          {itemCode}
        </Typography>
        {/* <Divider sx={{ mb: "5px" }} /> */}
        <div style={{border: "1px solid #d32f2f", borderRadius: "2px", padding: "0 5px 0 5px", backgroundColor: "#d32f2f"}}>
        <Typography borderRadius="5px" variant='p' color="#fff">Add To Catalogue</Typography>
        </div>
        {/* <Input sx={{ mt: "10px", mb: "10px" }} variant='outline' name='dateInput' value={dateInput} onChange={handleChange} fullWidth type='date' /><br /> */}
        <Input
          sx={{ mt: "10px", mb: "10px" }}
          variant='outline'
          name='dateInput'
          value={dateInput}
          onChange={handleChange}
          fullWidth
          type='date'
        />
        <TextField
          autoFocus
          margin="dense"
          label="Unit Price"
          type="number"
          fullWidth
          // sx={{width: "70%"}}
          name="unitPrice"
          value={price}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Barcode"
          type="number"
          fullWidth
          // sx={{width: "70%"}}
          name="barcode"
          value={barcode}
          onChange={handleChange}
        />
        <br />
        {/* <DatePicker
                label="Controlled picker"
                // value={value}
                // onChange={(newValue) => setValue(newValue)}
            /> */}
        {/* <TextareaAutosize
                aria-label="minimum height"
                minRows={3} // Set the minimum number of rows
                placeholder="Type your text here..."
            // Other props as needed
            /> */}
        {/* <TextField
                autoFocus
                margin="dense"
                label="Description"
                type="textfield"
                fullWidth
                name="description"
                value={description}
                onChange={handleChange}
            /> */}
        <textarea placeholder="Description"
          type="textfield"
          name="description"
          value={description}
          onChange={handleChange}
          style={{ width: "93%", borderRadius: "5px", fontFamily: "inherit", color: "#000", border: "1px solid #CCC5C5", height: "80px", margin: "5px 0 0 0", padding: "10px" }}
        />
        {/* <div style={{ border: "2px solid red", backgroundColor: "#f1f1f1", borderRadius: "5px", padding: "5px", display: "flex", flexDirection: "column", alignItems: "center" }}> */}
        <ThemeProvider theme={theme}>
          <TextField
            sx={{
              "& .MuiInputLabel-root": { color: "#F70F0F" }, // Target label for red color
              "& .MuiOutlinedInput-root": { // Target outlined input for red border
                "& fieldset": {
                  // backgroundColor: "#FFF",
                  // color: "#000",
                },
              },
            }}
            autoFocus margin='dense' label='Repeat' type='number' fullWidth name='numberOfEntries' value={numberOfEntries} onChange={handleChange} />
        </ThemeProvider>
        {/* </div> */}
        {/* <ThemeProvider theme={theme}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Repeat"
                    type="number"
                    fullWidth
                    name="numberOfEntries"
                    value={numberOfEntries}
                    onChange={handleChange}
                    sx={{
                        "& .MuiInputLabel-root": { color: "#F70F0F" }, // Target label for red color
                        "& .MuiOutlinedInput-root": { // Target outlined input for red border
                            "& fieldset": {
                                borderColor: "#F70F0F",
                            },
                        },
                    }}
                />
            </ThemeProvider> */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", gap: "10px", justifyContent: "space-around" }}>
          <Button fullWidth startIcon={<SaveIcon />} variant='contained' color='error' sx={{ textTransform: 'none', fontSize: "16px" }} onClick={handleSave}>Save</Button>
          <Button fullWidth startIcon={<DisabledByDefault />} variant='outlined' onClick={handleClose} color='error' start sx={{ textTransform: 'none', fontSize: "16px" }}>Cancel</Button>
        </div>
      </div>
    </Drawer>
  )
}

export default DrawerAdditem;
