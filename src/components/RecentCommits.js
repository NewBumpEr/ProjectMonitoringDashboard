import React from 'react';
import { Typography, Box, Divider, Button } from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const RecentCommits = ({ commits, owner, repo }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ maxHeight: 400, overflowY: 'auto', border: '1px solid #ddd', borderRadius: 2, p: 2, backgroundColor: '#fafafa' }}>
                {commits.slice(0, 5).map((commit, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {commit.commit.message}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            by {commit.commit.author.name} on {format(new Date(commit.commit.author.date), 'dd MMMM yyyy')}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate(`/repo/${owner}/${repo}/commit/${commit.sha}`)}
                            >
                                View Commit
                            </Button>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default RecentCommits;
