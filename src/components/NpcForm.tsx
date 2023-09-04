import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Typography, TextField, Button, Card, CardContent } from '@mui/material';

const NPCForm: React.FC = () => {
    const navigate = useNavigate();

    const initialNpcState = {
        appearance: '',
        beliefs: '',
        extras: '',
        name: '',
        secrets: '',
    };

    const [npc, setNpc] = useState(initialNpcState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNpc({ ...npc, [name]: value });
    };

    const handleSubmit = () => {
        api.post('/add-npc', npc)
        .then((response) => {
            console.log('NPC added successfully:', response.data);
            // Redirect to the list of NPCs
            navigate('/');
        })
        .catch((error) => {
            console.error('Error adding NPC:', error);
        });
    };

    return (
        <div>
        <Typography variant="h4" gutterBottom>Add NPC</Typography>
        <Card variant="outlined">
            <CardContent>
            <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={npc.name}
                onChange={handleInputChange}
            />
            <TextField
                name="appearance"
                label="Appearance"
                variant="outlined"
                fullWidth
                value={npc.appearance}
                onChange={handleInputChange}
            />
            <TextField
                name="beliefs"
                label="Beliefs"
                variant="outlined"
                fullWidth
                value={npc.beliefs}
                onChange={handleInputChange}
            />
            <TextField
                name="extras"
                label="Extras"
                variant="outlined"
                fullWidth
                value={npc.extras}
                onChange={handleInputChange}
            />
            <TextField
                name="secrets"
                label="Secrets"
                variant="outlined"
                fullWidth
                value={npc.secrets}
                onChange={handleInputChange}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add NPC
            </Button>
            </CardContent>
        </Card>
        </div>
    );
};

export default NPCForm;
