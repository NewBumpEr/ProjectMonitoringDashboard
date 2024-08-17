import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguagesChart = ({ languages }) => {
    const [viewMode, setViewMode] = useState('chart');

    const totalSize = Object.values(languages).reduce((acc, size) => acc + size, 0);

    const chartData = {
        labels: Object.keys(languages),
        datasets: [
            {
                data: Object.values(languages).map(size => ((size / totalSize) * 100).toFixed(2)),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],
            },
        ],
    };

    const languagesArray = Object.keys(languages).map(language => ({
        language,
        percentage: ((languages[language] / totalSize) * 100).toFixed(2),
    }));

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button variant={viewMode === 'chart' ? 'contained' : 'outlined'} onClick={() => setViewMode('chart')}>
                    Chart
                </Button>
                <Button variant={viewMode === 'table' ? 'contained' : 'outlined'} onClick={() => setViewMode('table')} sx={{ ml: 2 }}>
                    Table
                </Button>
            </Box>

            {viewMode === 'chart' ? (
                <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                    <Pie data={chartData} />
                </div>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Language</strong></TableCell>
                            <TableCell align="right"><strong>Percentage (%)</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {languagesArray.map((row) => (
                            <TableRow key={row.language}>
                                <TableCell>{row.language}</TableCell>
                                <TableCell align="right">{row.percentage}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
};

export default LanguagesChart;
