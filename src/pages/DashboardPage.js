import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import RepoList from '../components/RepoList';
import RepoInfo from '../components/RepoInfo';
import { fetchUserRepos } from '../app/api/api-github';
import { Container, Box, Grid, Paper, Typography, CircularProgress, Divider } from '@mui/material';

const DashboardPage = () => {
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [error, setError] = useState(null);
    const [reposFetched, setReposFetched] = useState(false);

    const handleFetchRepos = async (username) => {
        try {
            const reposData = await fetchUserRepos(username);
            setRepos(reposData);
            setSelectedRepo(null);
            setReposFetched(true);
        } catch (error) {
            console.error('Error fetching repos:', error);
            setError('Unable to fetch repositories.');
        }
    };

    const handleSelectRepo = (repo) => {
        setSelectedRepo(repo);
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 64px)',
                px: 2,
                py: 4,
            }}
        >
            <Typography variant="h3" component="h1" gutterBottom>
                GitHub Dashboard
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 800, mb: 4 }}>
                <Paper sx={{ padding: 2, mb: 3 }}>
                    <UserForm onSubmit={handleFetchRepos} />
                </Paper>
            </Box>

            {reposFetched && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Repositories
                            </Typography>
                            {error && <Typography color="error">{error}</Typography>}
                            {repos.length > 0 ? (
                                <RepoList repos={repos} onSelectRepo={handleSelectRepo} />
                            ) : (
                                <CircularProgress />
                            )}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Repository Details
                            </Typography>
                            {selectedRepo ? (
                                <RepoInfo owner={selectedRepo.owner.login} repo={selectedRepo.name} />
                            ) : (
                                <Typography>Select a repository to see details</Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default DashboardPage;
