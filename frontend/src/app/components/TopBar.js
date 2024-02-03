'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { organizations } from '@src/app/constants';
import Image from 'next/image';

const TopBar = () => {

    const router = useRouter();
    const { user } = useUser();
    const org_data = organizations[user?.org_id] || {}

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {user?.name}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Image src={org_data.logo}  alt={org_data.name} width={40} height={40}/>
                    </Typography>
                    <Avatar alt="Photo" src={user?.picture} />
                    <Button onClick={()=> router.push('/api/auth/logout')} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;