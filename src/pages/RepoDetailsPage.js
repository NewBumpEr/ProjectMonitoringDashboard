import React, {useState, useEffect} from 'react';
import {
    Typography, CircularProgress, Card, CardContent, Divider, Box, Chip, Button, IconButton, Collapse
} from '@mui/material';
import {useParams, useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import {
    fetchRepoDetails, fetchRepoPullRequests, fetchRepoCommits, fetchRepoTopics, fetchRepoReleases
} from '../app/api/api-github';
import GitHubIcon from "@mui/icons-material/GitHub";
import StarsOverTime from '../components/StarsOverTime';
import LanguagesChart from '../components/LanguagesChart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import RecentCommits from '../components/RecentCommits';
import ReleaseSection from '../components/ReleaseSection';

const RepoDetailsPage = () => {
    const navigate = useNavigate();
    const {owner, repo} = useParams();
    const [repoData, setRepoData] = useState(null);
    const [pullRequests, setPullRequests] = useState([]);
    const [commits, setCommits] = useState([]);
    const [topics, setTopics] = useState([]);
    const [releases, setReleases] = useState([]);
    const [languages, setLanguages] = useState({});
    const [error, setError] = useState(null);
    const [showLanguages, setShowLanguages] = useState(false);
    const [showStars, setShowStars] = useState(false);
    const [showCommits, setShowCommits] = useState(false);
    const [showReleases, setShowReleases] = useState(false);

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

                const response = await fetch(repoDetails.languages_url);
                const languagesData = await response.json();
                setLanguages(languagesData);

                const releasesData = await fetchRepoReleases(owner, repo);
                setReleases(releasesData);
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
        return <CircularProgress/>;
    }

    const formattedDateCreate = format(new Date(repoData.created_at), 'dd MMMM yyyy');
    const formattedDateUpdate = format(new Date(repoData.updated_at), 'dd MMMM yyyy');

    return (
        <Card sx={{
            mt: 3,
            p: 2,
            background: '#fafafa',
            borderRadius: 4,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            marginTop: 10,
            marginBottom: 3,
        }}>
            <CardContent>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/")}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 3,
                            bgcolor: '#1976d2',
                            '&:hover': {bgcolor: '#1565c0'}
                        }}
                    >
                        Return
                    </Button>
                    <IconButton
                        href={repoData.html_url}
                        target="_blank"
                        rel="noopener"
                        aria-label="Go to GitHub repository"
                        sx={{color: '#333'}}
                    >
                        <GitHubIcon fontSize="large"/>
                    </IconButton>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <Typography variant="h5" sx={{flexGrow: 1}}>
                        {repoData.full_name}
                    </Typography>
                    <Typography variant="body2" sx={{ml: 2, color: '#555'}}>
                        <strong>License:</strong> {repoData.license ? repoData.license.name : 'N/A'}
                    </Typography>
                </Box>

                <Typography variant="body1" gutterBottom>
                    {repoData.description}
                </Typography>

                <Divider sx={{my: 2}}/>

                <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 2}}>
                    <Box sx={{flex: '1 1 auto'}}>
                        <Typography variant="body2">
                            <strong>Stars:</strong> {repoData.stargazers_count}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Forks:</strong> {repoData.forks_count}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Watchers:</strong> {repoData.subscribers_count}
                        </Typography>
                    </Box>
                    <Box sx={{flex: '1 1 auto'}}>
                        <Typography variant="body2">
                            <strong>Created At:</strong> {formattedDateCreate}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Last Update:</strong> {formattedDateUpdate}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{my: 2}}/>

                <Box sx={{display: 'flex', flexDirection: 'column', mb: 2}}>
                    <Typography variant="body2">
                        <strong>Topics:</strong>
                    </Typography>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1}}>
                        {topics.map((topic, index) => (
                            <Chip key={index} label={topic} variant="outlined" sx={{margin: 0.5}}/>
                        ))}
                    </Box>
                </Box>

                <Divider sx={{my: 2}}/>

                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="body2">
                        <strong>Languages used in project:</strong>
                    </Typography>
                    <IconButton onClick={() => setShowLanguages(!showLanguages)}>
                        {showLanguages ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                </Box>
                <Collapse in={showLanguages}>
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                        <LanguagesChart languages={languages}/>
                    </Box>
                </Collapse>

                <Divider sx={{my: 2}}/>

                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="body2">
                        <strong>Stars over time:</strong>
                    </Typography>
                    <IconButton onClick={() => setShowStars(!showStars)}>
                        {showStars ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                </Box>
                <Collapse in={showStars}>
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                        <StarsOverTime repo={repo} owner={owner}/>
                    </Box>
                </Collapse>

                <Divider sx={{my: 2}}/>

                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="body2">
                        <strong>Recent Commits:</strong>
                    </Typography>
                    <IconButton onClick={() => setShowCommits(!showCommits)}>
                        {showCommits ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                </Box>
                <Collapse in={showCommits}>
                    <Box sx={{mt: 2}}>
                        <RecentCommits commits={commits} owner={owner} repo={repo}/>
                    </Box>
                </Collapse>

                <Divider sx={{my: 2}}/>

                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="body2">
                        <strong>Releases:</strong>
                    </Typography>
                    <IconButton onClick={() => setShowReleases(!showReleases)}>
                        {showReleases ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                </Box>
                <Collapse in={showReleases}>
                    <Box sx={{mt: 2}}>
                        <ReleaseSection releases={releases} owner={owner} repo={repo} />
                    </Box>
                </Collapse>

                <Divider sx={{my: 2}}/>
            </CardContent>
        </Card>
    );
};

export default RepoDetailsPage;
