import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import RepoList from '../components/RepoList';
import { fetchUserRepos } from '../app/api/api-github';
import { Box, Container } from '@mui/material';

const ReposPage = () => {
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);

    const handleFetchRepos = async (username) => {
        try {
            const reposData = await fetchUserRepos(username);
            setRepos(reposData);
        } catch (error) {
            console.error('Error fetching repos:', error);
            setError('Unable to fetch repositories.');
        }
    };

    const handleSelectRepo = (repo) => {
        console.log('Selected repository:', repo);
    };

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
            <Box sx={{ width: '100%', maxWidth: 600, mb: 4 }}>
                <UserForm onSubmit={handleFetchRepos} />
            </Box>
            {error && <p>{error}</p>}
            {repos.length > 0 && (
                <Box sx={{ width: '100%', maxWidth: 600 }}>
                    <RepoList repos={repos} onSelectRepo={handleSelectRepo} />
                </Box>
            )}
        </Container>
    );
};

export default ReposPage;
