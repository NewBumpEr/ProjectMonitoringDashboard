import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress, IconButton, Box, Divider, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { fetchRepoDetails, fetchRepoPullRequests, fetchRepoCommits, fetchRepoTopics } from '../app/api/api-github';
import { Link } from 'react-router-dom';

const RepoInfo = ({ owner, repo }) => {
    const [repoData, setRepoData] = useState(null);
    const [pullRequests, setPullRequests] = useState([]);
    const [commits, setCommits] = useState([]);
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const repoDetails = await fetchRepoDetails(owner, repo);
                setRepoData(repoDetails);

                const pullRequestsData = await fetchRepoPullRequests(owner, repo);
                setPullRequests(pullRequestsData);

                const commitsData = await fetchRepoCommits(owner, repo);
                setCommits(commitsData);

                const topicsData = await fetchRepoTopics(owner, repo);
                setTopics(topicsData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [owner, repo]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!repoData) {
        return <CircularProgress />;
    }

    return (
        <Card sx={{ mt: 3, p: 2, background: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5">{repoData.full_name}</Typography>
                    <IconButton
                        href={repoData.html_url}
                        target="_blank"
                        rel="noopener"
                        aria-label="Go to GitHub repository"
                        sx={{ color: '#333' }}
                    >
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                </Box>
                <Typography variant="body1" gutterBottom>
                    {repoData.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2">
                    <strong>Stars:</strong> {repoData.stargazers_count}
                </Typography>
                <Typography variant="body2">
                    <strong>Forks:</strong> {repoData.forks_count}
                </Typography>
                <Typography variant="body2">
                    <strong>Watchers:</strong> {repoData.subscribers_count}
                </Typography>
                <Typography variant="body2">
                    <strong>Open Issues:</strong> {repoData.open_issues_count}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2">
                    <strong>Open Pull Requests:</strong> {pullRequests.length}
                </Typography>
                <Typography variant="body2">
                    <strong>Recent Commits:</strong> {commits.length}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/repo/${owner}/${repo}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                            View More Details
                        </Button>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RepoInfo;
