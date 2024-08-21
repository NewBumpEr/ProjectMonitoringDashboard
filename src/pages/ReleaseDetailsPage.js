import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRepoRelease } from '../app/api/api-github';
import { CircularProgress, Typography, Card, CardContent, Box, Button, Divider, IconButton, List, ListItem, ListItemText, ListItemIcon, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ReleaseDetailsPage = () => {
    const { owner, repo, releaseId } = useParams();
    const navigate = useNavigate();
    const [release, setRelease] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReleaseData = async () => {
            try {
                const releaseData = await fetchRepoRelease(owner, repo, releaseId);
                setRelease(releaseData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchReleaseData();
    }, [owner, repo, releaseId]);

    if (error) {
        return (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    if (!release) {
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
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
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
                            Release Details
                        </Typography>
                        {release.html_url && (
                            <Tooltip title="View on GitHub" arrow>
                                <IconButton
                                    target="_blank"
                                    rel="noopener"
                                    aria-label="Go to GitHub"
                                    onClick={() => window.open(release.html_url, '_blank')}
                                    sx={{ color: '#333' }}
                                >
                                    <GitHubIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <Divider sx={{ my: 2 }} />
                </Box>

                <Typography variant="h6" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {release.name || 'No Title'}
                </Typography>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    <strong>Tag:</strong> {release.tag_name}
                </Typography>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    <strong>Created At:</strong> {new Date(release.created_at).toLocaleDateString()}
                </Typography>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    <strong>Description:</strong>
                </Typography>

                <Box sx={{ mb: 2, p: 2, borderRadius: 2, background: '#ffffff', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} children={release.body || 'No description available'} />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    <strong>Assets:</strong>
                </Typography>

                <List>
                    {release.assets.map((asset) => (
                        <ListItem key={asset.id} sx={{ py: 1, borderBottom: '1px solid #ddd' }}>
                            <ListItemIcon>
                                <DownloadIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={asset.name}
                                secondary={`${(asset.size / 1024 / 1024).toFixed(2)} MB`}
                            />
                            <Button
                                variant="outlined"
                                href={asset.browser_download_url}
                                target="_blank"
                                rel="noopener"
                                sx={{ ml: 2, textTransform: 'none' }}
                            >
                                Download
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default ReleaseDetailsPage;
