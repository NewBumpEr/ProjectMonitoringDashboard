import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const HomePage = () => {
    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 64px)',
                px: 2,
                py: 4
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Welcome to the Home Page
                </Typography>
                <Typography variant="h5">
                    This is the main area of your application.
                </Typography>
            </Box>
        </Container>
    );
};

export default HomePage;
