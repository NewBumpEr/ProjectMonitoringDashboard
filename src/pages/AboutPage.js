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
                    repositories. It provides a user-friendly interface to view, manage, and analyze your repositories,
                    making it easier to track project progress and collaborate effectively.
                </Typography>
                <Typography variant="body1" paragraph>
                    As an open-source project, we welcome contributions from the community. Feel free to explore the
                    code, report issues, and suggest improvements. This application is an excellent tool for
                    understanding how to work with GitHub's API and participating in a collaborative software project.
                </Typography>
            </Paper>

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
                    Getting Started
                </Typography>
                <Typography variant="body1" paragraph>
                    To get started with our application, follow these steps:
                </Typography>
                <Box component="ol" sx={{ml: 4, fontFamily: 'Roboto, sans-serif'}}>
                    <Typography variant="body1" paragraph>
                        <strong>1. Obtain a GitHub Access Token:</strong>
                        <br/>
                        To interact with GitHub repositories, you'll need a personal GitHub access token. This token
                        allows us to access your GitHub repositories and display their details.
                    </Typography>
                    <Box component="ul" sx={{mb: 2, fontFamily: 'Roboto, sans-serif'}}>
                        <li>
                            Go to GitHub (<Link href="https://github.com" target="_blank" rel="noopener"
                                                sx={{textDecoration: 'underline'}}>https://github.com</Link>) and log in
                            to your account.
                        </li>
                        <li>
                            Click on your profile picture in the top right corner and select "Settings".
                        </li>
                        <li>
                            In the left sidebar, click on "Developer settings".
                        </li>
                        <li>
                            Select "Personal access tokens".
                        </li>
                        <li>
                            Click on "Generate new token".
                        </li>
                        <li>
                            Give your token a descriptive name, select the scopes or permissions you'd like to grant
                            this token (e.g., <code>repo</code> for repository access), and click "Generate token".
                        </li>
                        <li>
                            Copy your new personal access token and paste it into the configuration of the application.
                        </li>
                    </Box>
                    <Typography variant="body1" paragraph>
                        <strong>2. Fork the Repository:</strong>
                        <br/>
                        Our project is open source and you are welcome to contribute! To start working on it, you need
                        to fork the repository.
                    </Typography>
                    <Box component="ul" sx={{mb: 2, fontFamily: 'Roboto, sans-serif'}}>
                        <li>
                            Visit our GitHub repository page (<Link
                            href="https://github.com/NewBumpEr/ProjectMonitoringDashboard" target="_blank" rel="noopener"
                            sx={{textDecoration: 'underline'}}>here</Link>).
                        </li>
                        <li>
                            Click on the "Fork" button at the top right of the page to create a copy of the repository
                            in your own GitHub account.
                        </li>
                        <li>
                            Clone your forked repository to your local machine using <code>git clone</code>.
                        </li>
                    </Box>
                    <Typography variant="body1" paragraph>
                        <strong>3. Set Up Your Development Environment:</strong>
                        <br/>
                        Follow the instructions in the repository's CONTRIBUTING to set up your local development environment
                        and start contributing.
                    </Typography>
                </Box>
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
        </Container>
    );
};

export default AboutPage;
