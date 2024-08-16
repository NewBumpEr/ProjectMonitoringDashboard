import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const RepoList = ({ repos, onSelectRepo }) => {
    return (
        <List>
            {repos.map(repo => (
                <ListItem
                    button
                    key={repo.id}
                    component={Link}
                    onClick={() => onSelectRepo(repo)}
                >
                    <ListItemText primary={repo.name} />
                </ListItem>
            ))}
        </List>
    );
};

export default RepoList;
