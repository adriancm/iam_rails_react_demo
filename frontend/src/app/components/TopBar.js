import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { redirect } from 'next/navigation'

const TopBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Metrics
                    </Typography>
                    <Button onClick={()=> redirect('/api/auth/logout')} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;