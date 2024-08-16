import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import RepoInfo from '../components/RepoInfo';

const RepoDetailsPage = () => {
    const { username, repoName } = useParams();

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
            <Typography variant="h4" align="center" gutterBottom>
                Repository Details
            </Typography>

            <Card sx={{ width: '100%', mb: 4 }}>
                <CardContent>
                    <RepoInfo owner={username} repo={repoName} />
                </CardContent>
            </Card>
        </Container>
    );
};

export default RepoDetailsPage;
