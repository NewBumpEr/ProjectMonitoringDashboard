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

export const fetchRepoPullRequests = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/pulls`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching pull requests');
    }
};

export const fetchRepoTopics = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/topics`, {
            headers: {
                Accept: 'application/vnd.github.mercy-preview+json'
            }
        });
        return response.data.names;
    } catch (error) {
        throw new Error('Error fetching repository topics');
    }
};


export const fetchRepoCommits = async (owner, repo) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/commits`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching commits');
    }
};

export const fetchAllStarEvents = async (owner, repo) => {
    const allEvents = [];
    let page = 1;
    const perPage = 50;

    while (true) {
        try {
            const response = await api.get(`/repos/${owner}/${repo}/events`, {
                params: {
                    per_page: perPage,
                    page,
                },
            });

            const starEvents = response.data.filter(event => event.type === 'WatchEvent');
            allEvents.push(...starEvents);

            if (response.data.length < perPage) {
                break;
            }

            page++;
        } catch (error) {
            console.error('Error fetching star events:', error);
            throw new Error('Error fetching star events');
        }
    }

    return allEvents;
};
