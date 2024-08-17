import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAllStarEvents } from '../app/api/api-github';

const StarsOverTime = ({ owner, repo }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const processStarEvents = (events) => {
        const starsByDate = {};

        events.forEach(event => {
            const date = new Date(event.created_at).toISOString().split('T')[0];
            if (!starsByDate[date]) {
                starsByDate[date] = 0;
            }
            starsByDate[date]++;
        });

        return Object.keys(starsByDate).map(date => ({
            date,
            stars: starsByDate[date],
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const events = await fetchAllStarEvents(owner, repo);
                const processedData = processStarEvents(events);
                setData(processedData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [owner, repo]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
                <strong>Note:</strong> The graph displays data for the most recent days due to GitHub API limitations, which only provide a limited number of events per request. Historical data may not be fully represented.
            </p>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="stars" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StarsOverTime;
