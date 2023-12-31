import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Typography, TextField, Button, Card, CardContent, Box } from '@mui/material';

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
    const [formErrors, setFormErrors] = useState({
        appearance: false,
        beliefs: false,
        name: false,
        secrets: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNpc({ ...npc, [name]: value });
        setFormErrors({ ...formErrors, [name]: false });
    };

    const handleSubmit = () => {
        const requiredFields = ['appearance', 'beliefs', 'name', 'secrets'];
        const errors: any = {};

        requiredFields.forEach((field) => {
            if (!npc[field as keyof typeof npc]) {
                errors[field] = true;
            }
        });

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            api
                .post('/add-npc', npc)
                .then((response) => {
                    console.log('NPC added successfully:', response.data);
                    // Redirect to the list of NPCs
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error adding NPC:', error);
                });
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="form-container">
            <Typography variant="h4" gutterBottom>Add NPC</Typography>
            <Card variant="outlined">
                <CardContent>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={npc.name}
                            onChange={handleInputChange}
                            error={formErrors.name}
                            helperText={formErrors.name ? 'Name is required.' : ''}
                        />
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            name="appearance"
                            label="Appearance"
                            variant="outlined"
                            fullWidth
                            value={npc.appearance}
                            onChange={handleInputChange}
                            error={formErrors.appearance}
                            helperText={
                                formErrors.appearance
                                    ? 'Appearance is required.'
                                    : ''
                            }
                        />
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            name="beliefs"
                            label="Beliefs"
                            variant="outlined"
                            fullWidth
                            value={npc.beliefs}
                            onChange={handleInputChange}
                            error={formErrors.beliefs}
                            helperText={
                                formErrors.beliefs ? 'Beliefs is required.' : ''
                            }
                        />
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            name="secrets"
                            label="Secrets"
                            variant="outlined"
                            fullWidth
                            value={npc.secrets}
                            onChange={handleInputChange}
                            error={formErrors.secrets}
                            helperText={
                                formErrors.secrets ? 'Secrets is required.' : ''
                            }
                        />
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            name="extras"
                            label="Extras"
                            variant="outlined"
                            fullWidth
                            value={npc.extras}
                            onChange={handleInputChange}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Add NPC
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCancel}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default NPCForm;
