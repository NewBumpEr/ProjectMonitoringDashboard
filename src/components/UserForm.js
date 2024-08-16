import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const UserForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) {
            onSubmit(username);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Enter GitHub username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Find Repositories
            </Button>
        </Box>
    );
};

export default UserForm;
