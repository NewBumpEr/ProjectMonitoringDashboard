import React from 'react';
import {Box, Container, Typography} from '@mui/material';

const NotFound = () => {
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
            <Box sx={{textAlign: 'center', mt: 5}}>
                <Typography variant="h3" color="error">
                    404 - Page Not Found
                </Typography>
                <Typography variant="h6">
                    The page you are looking for doesn't exist.
                </Typography>
            </Box>
        </Container>
    );
};

export default NotFound;
