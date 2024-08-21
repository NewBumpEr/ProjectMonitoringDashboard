import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ReleaseSection = ({ releases = [], owner, repo }) => {
    const recentReleases = releases.slice(0, 5);

    if (recentReleases.length === 0) {
        return <Typography>No recent releases</Typography>;
    }

    return (
        <>
            {recentReleases.map(release => {
                const { id, name, tag_name, created_at, body } = release;
                const formattedDate = new Date(created_at).toLocaleDateString();

                return (
                    <Box key={id} sx={{
                        mb: 2,
                        p: 2,
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        background: '#f9f9f9'
                    }}>
                        <Typography variant="h6">{name || tag_name}</Typography>
                        <Typography variant="body2" color="textSecondary">{formattedDate}</Typography>
                        {body && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {body.length > 100 ? `${body.substring(0, 100)} ...` : body}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button
                                component={Link}
                                to={`/repo/${owner}/${repo}/releases/${id}`}
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'none' }}
                            >
                                View Details
                            </Button>
                        </Box>
                    </Box>
                );
            })}
        </>
    );
};

export default ReleaseSection;
