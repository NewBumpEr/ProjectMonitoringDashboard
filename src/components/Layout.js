import React from 'react';
import Navbar from './Navbar';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container sx={{ mt: 4 }}>
                {children}
            </Container>
        </>
    );
};

export default Layout;
