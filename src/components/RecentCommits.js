import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const RecentCommits = ({ commits = [], owner, repo }) => {
    const recentCommits = commits.slice(0, 5);

    if (recentCommits.length === 0) {
        return <Typography>No recent commits</Typography>;
    }

    return (
        <>
            {recentCommits.map(commit => {
                const { sha, commit: { message, author } } = commit;
                const formattedDate = format(new Date(author.date), 'dd MMM yyyy');

                return (
                    <Box key={sha} sx={{
                        mb: 2,
                        p: 2,
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        background: '#f9f9f9'
                    }}>
                        <Typography variant="h6">{message}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {`by ${author.name} on ${formattedDate}`}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button
                                component={Link}
                                to={`/repo/${owner}/${repo}/commit/${sha}`}
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'none' }}
                            >
                                View Commit
                            </Button>
                        </Box>
                    </Box>
                );
            })}
        </>
    );
};

export default React.memo(RecentCommits);
