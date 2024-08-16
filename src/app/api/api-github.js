import axios from 'axios';

// Replace 'YOUR_GITHUB_TOKEN' with your personal GitHub access token
const token = 'YOUR_GITHUB_TOKEN';

const api = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        Authorization: `token ${token}`,
    },
});

export const fetchUserRepos = async (username) => {
    try {
        const response = await api.get(`/users/${username}/repos`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching repositories');
    }
};

export const fetchRepoDetails = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching repository details');
    }
};
