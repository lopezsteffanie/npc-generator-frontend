import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { Typography, TextField, Button, Card, CardContent, Box } from '@mui/material';

interface UpdateNPCFormProps {
    npc: {
        id: string;
        appearance: string;
        beliefs: string;
        extras: string;
        name: string;
        secrets: string;
    };
}

type UpdatedFields = {
    name?: string;
    appearance?: string;
    beliefs?: string;
    extras?: string;
    secrets?: string;
};

const UpdateNPCForm: React.FC<UpdateNPCFormProps> = ({ npc }) => {
    const navigate = useNavigate();
    const { npcId } = useParams();

    const initialUpdatedFields: UpdatedFields = {
        name: npc.name,
        appearance: npc.appearance,
        beliefs: npc.beliefs,
        extras: npc.extras,
        secrets: npc.secrets,
    };

    const [updatedFields, setUpdatedFields] = useState(initialUpdatedFields);

    const [formErrors, setFormErrors] = useState<Partial<Record<keyof UpdatedFields, boolean>>>({
        appearance: false,
        beliefs: false,
        name: false,
        secrets: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUpdatedFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };

    const handleSubmit = () => {
        const requiredFields: (keyof UpdatedFields)[] = ['appearance', 'beliefs', 'name', 'secrets'];
        const errors: Partial<Record<keyof UpdatedFields, boolean>> = {};

        requiredFields.forEach((field) => {
            if (!updatedFields[field]) {
                errors[field] = true;
            }
        });

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            api
                .patch(`/update-npc/${npcId}`, updatedFields)
                .then((response) => {
                    console.log('NPC updated successfully:', response.data);
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error updating NPC:', error);
                });
        }
    };

    const handleCancel = () => {
        navigate('/');
    }

    return (
        <div className="form-container">
            <Typography variant="h4" gutterBottom>Update NPC</Typography>
            <Card variant="outlined">
                <CardContent>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={updatedFields.name || ''}
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
                            value={updatedFields.appearance || ''}
                            onChange={handleInputChange}
                            error={formErrors.appearance}
                            helperText={formErrors.appearance ? 'Appearance is required.' : ''}
                        />
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            name="beliefs"
                            label="Beliefs"
                            variant="outlined"
                            fullWidth
                            value={updatedFields.beliefs || ''}
                            onChange={handleInputChange}
                            error={formErrors.beliefs}
                            helperText={formErrors.beliefs ? 'Beliefs is required.' : ''}
                        />
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            name="secrets"
                            label="Secrets"
                            variant="outlined"
                            fullWidth
                            value={updatedFields.secrets || ''}
                            onChange={handleInputChange}
                            error={formErrors.secrets}
                            helperText={formErrors.secrets ? 'Secrets is required.' : ''}
                        />
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            name="extras"
                            label="Extras"
                            variant="outlined"
                            fullWidth
                            value={updatedFields.extras || ''}
                            onChange={handleInputChange}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Update NPC
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

export default UpdateNPCForm;
