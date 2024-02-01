'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const TopBar = () => {

    const router = useRouter();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Metrics
                    </Typography>
                    <Button onClick={()=> router.push('/api/auth/logout')} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;