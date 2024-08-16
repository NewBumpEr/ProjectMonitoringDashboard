import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { fetchRepoDetails } from '../app/api/api-github';

const RepoInfo = ({ owner, repo }) => {
    const [repoData, setRepoData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const data = await fetchRepoDetails(owner, repo);
                setRepoData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchRepoData();
    }, [owner, repo]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!repoData) {
        return <CircularProgress />;
    }

    return (
        <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
                <Typography variant="h5">{repoData.full_name}</Typography>
                <Typography variant="body1" gutterBottom>
                    {repoData.description}
                </Typography>
                <Typography variant="body2">
                    <strong>Stars:</strong> {repoData.stargazers_count}
                </Typography>
                <Typography variant="body2">
                    <strong>Forks:</strong> {repoData.forks_count}
                </Typography>
                <Typography variant="body2">
                    <strong>Watchers:</strong> {repoData.watchers_count}
                </Typography>
                <Typography variant="body2">
                    <strong>Open Issues:</strong> {repoData.open_issues_count}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RepoInfo;
