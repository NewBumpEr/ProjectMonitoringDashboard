import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCommitDetails } from '../app/api/api-github';
import { CircularProgress, Typography, Card, CardContent, Box, Button, Divider, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const CommitDetailsPage = () => {
    const { owner, repo, commitSha } = useParams();
    const navigate = useNavigate();
    const [commitDetails, setCommitDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commitData = await fetchCommitDetails(owner, repo, commitSha);
                setCommitDetails(commitData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [owner, repo, commitSha]);

    if (error) {
        return (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    if (!commitDetails) {
        return (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Card sx={{
            mt: 3,
            p: 3,
            background: '#f5f5f5',
            borderRadius: 4,
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            marginTop: 10,
            marginBottom: 3,
        }}>
            <CardContent>
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/repo/${owner}/${repo}`)}
                            sx={{ textTransform: 'none', borderRadius: 3, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
                        >
                            Return
                        </Button>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            Commit Details
                        </Typography>
                        <IconButton
                            target="_blank"
                            rel="noopener"
                            aria-label="Go to GitHub"
                            onClick={() => window.open(commitDetails.html_url, '_blank')}
                            sx={{ color: '#333' }}
                        >
                            <GitHubIcon fontSize="large" />
                        </IconButton>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                </Box>

                <Typography variant="h6" sx={{ mb: 2 }}>
                    <strong>Commit:</strong> {commitDetails.sha}
                </Typography>

                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                    <strong>Message:</strong> {commitDetails.commit.message}
                </Typography>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    <strong>Author:</strong> {commitDetails.commit.author.name} on {new Date(commitDetails.commit.author.date).toLocaleDateString()}
                </Typography>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    <strong>Files Changed:</strong>
                </Typography>

                <Box sx={{ mb: 2 }}>
                    {commitDetails.files.length > 0 ? (
                        commitDetails.files.map((file, index) => (
                            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#ffffff', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {file.filename}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
                                    Changes: {file.changes} lines
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Additions: {file.additions}, Deletions: {file.deletions}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No files changed.
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default CommitDetailsPage;
