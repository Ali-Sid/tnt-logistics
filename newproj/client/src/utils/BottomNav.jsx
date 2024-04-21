import { BottomNavigation, BottomNavigationAction, Box, CssBaseline, List, ListItemButton, ListItemText, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';

function refreshMessages() {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  
    return Array.from(new Array(50)).map(
      () => messageExamples[getRandomInt(messageExamples.length)],
    );
  }

function BottomNav() {

    const [value, setValue] = useState(0);
    const ref = useRef(null);
    // const [messages, setMessages] = useState(() => refreshMessages());


    // useEffect(() => {
    //     ref.current.ownerDocument.body.scrollTop = 0;
    //     setMessages(refreshMessages());
    // }, [value, setMessages]);
    return (
        <div>
            <Box sx={{ pb: 7 }} ref={ref}>
                {/* <CssBaseline />
                <List>
                    {messages.map(({ primary, secondary, person }, index) => (
                        <ListItemButton key={index + person}>
                            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
                            <ListItemText primary={primary} secondary={secondary} />
                        </ListItemButton>
                    ))}
                </List>
                */}
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box>
        </div>
    )
}

export default BottomNav