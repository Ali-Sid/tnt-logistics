import { Button, Dialog, DialogActions, DialogContent, Divider, Drawer, Input, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import React from 'react'

function DrawerAdd2Cat({ open, handleCloseDrawer, itemName, itemCode, handleChange, handleSave, numberOfEntries, price, description }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#F70F0F", // Set the primary color to red
            },
        },
    });
    return (
        <div>
            <Drawer
                anchor="right"
                open={open}
                onClose={handleCloseDrawer}
            >
                <div style={{ width: "300px", padding: "20px" }}>
                    <h2 style={{ textAlign: "center" }}>Edit Item</h2>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography variant="h4" color='#1B1A1A'>
                            {itemName}
                        </Typography>
                        {/* Display item code as a smaller text below the name */}
                        <Typography variant="subtitle1" color='red' gutterBottom>
                            {itemCode}
                        </Typography>
                    </div>
                    <Divider sx={{ mb: "5px" }} />
                    <Typography variant='h6'>Add To Catalogue</Typography>
                    <Input sx={{ mt: "10px", mb: "10px" }} fullWidth variant='outline' type='date' /><br />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Unit Price"
                        type="number"
                        fullWidth
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
                        name="barcode"
                        // value={price}
                        onChange={handleChange}
                    />
                    <br />
                    <textarea
                        placeholder="Description"
                        type="textfield"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        style={{ width: "95%", borderRadius: "5px", fontFamily: "inherit", color: "#000", border: "1px solid #CCC5C5", height: "80px", margin: "5px 0 0 0", padding: "10px" }}
                    />
                    <div style={{ border: "2px solid red", backgroundColor: "#f1f1f1", borderRadius: "5px", padding: "5px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                sx={{
                                    "& .MuiInputLabel-root": { color: "#F70F0F" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            backgroundColor: "#FFF",
                                            color: "#000",
                                        },
                                    },
                                }}
                                autoFocus margin='dense' label='Repeat' type='number' name='numberOfEntries' value={numberOfEntries} onChange={handleChange}
                            />
                        </ThemeProvider>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button onClick={handleCloseDrawer}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                </div>
            </Drawer>

        </div>
    )
}

export default DrawerAdd2Cat