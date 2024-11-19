import React from 'react';
import {Container, Typography, Paper, Link, Divider, Box} from '@mui/material';

const AboutPage = () => {
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
            <Paper
                sx={{
                    padding: 3,
                    mb: 4,
                    width: '100%',
                    maxWidth: 800,
                    mt: 10,
                    boxShadow: 3,
                    fontFamily: 'Roboto, sans-serif',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    About Project Monitoring Dashboard
                </Typography>
                <Typography variant="body1" paragraph>
                    Project Monitoring Dashboard is an open-source web application designed to interact with GitHub
                    repositories.
                    It provides a user-friendly interface to view and analyze your repositories, making it easier to
                    track project
                    progress and collaborate effectively.
                </Typography>
                <Typography variant="body1" paragraph>
                    As an open-source project, we welcome contributions from the community. Feel free to explore the
                    code, report
                    issues, and suggest improvements. This application is an excellent tool for understanding how to
                    work with
                    GitHub's API and participating in a collaborative software project.
                </Typography>
            </Paper>

            <Divider sx={{my: 2}}/>

            <Paper
                sx={{
                    padding: 3,
                    mb: 4,
                    width: '100%',
                    maxWidth: 800,
                    boxShadow: 3,
                    fontFamily: 'Roboto, sans-serif',
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions or feedback, feel free to reach out to us:
                </Typography>
                <Typography variant="body1">
                    Email: <Link href="mailto:bumpermytrovtsiy@gmail.com">bumpermytrovtsiy@gmail.com</Link>
                </Typography>
                <Typography variant="body1">
                    GitHub: <Link href="https://github.com/NewBumpEr" target="_blank" rel="noopener">Bump_Er</Link>
                </Typography>
            </Paper>

            <Divider sx={{my: 2}}/>

            <Paper
                sx={{
                    padding: 3,
                    mb: 4,
                    width: '100%',
                    maxWidth: 800,
                    boxShadow: 3,
                    fontFamily: 'Roboto, sans-serif',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: {xs: 'column', sm: 'row'},
                    }}
                >
                    <Box sx={{mb: {xs: 2, sm: 0}}}>
                        <img
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt="GitHub Mark"
                            style={{
                                width: '80px',
                                height: '80px',
                                '@media (max-width: 600px)': {
                                    width: '60px',
                                    height: '60px',
                                },
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        component="p"
                        align="center"
                        sx={{
                            color: '#000',
                            '& a': {
                                color: '#1976d2',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            },
                        }}
                    >
                        Thank you,{' '}
                        <Link href="https://github.com" target="_blank" rel="noopener">
                            GitHub
                        </Link>
                        , for providing the tools and platform to make our projects possible!
                    </Typography>
                    <Box sx={{mt: {xs: 2, sm: 0}}}>
                        <img
                            src="https://github.githubassets.com/assets/GitHub-Logo-ee398b662d42.png"
                            alt="GitHub Logo"
                            style={{
                                width: '130px',
                                height: 'auto',
                                '@media (max-width: 600px)': {
                                    width: '100px',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default AboutPage;
