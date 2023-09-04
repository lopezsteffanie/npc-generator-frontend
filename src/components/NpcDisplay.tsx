import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import '../styles.css';

interface NPCDisplayProps {
    npc: {
        appearance: string;
        beliefs: string;
        extras: string;
        id: string;
        name: string;
        secrets: string;
    };
    onDeleteClick: (npc: any) => void;
}

const NPCDisplay: React.FC<NPCDisplayProps> = ({ npc, onDeleteClick }) => {
    return (
        <Card variant="outlined" className="card">
            <CardContent>
                <Typography variant="h6">{npc.name}</Typography>
                <Typography><strong>Appearance:</strong> {npc.appearance}</Typography>
                <Typography><strong>Beliefs:</strong> {npc.beliefs}</Typography>
                {npc.extras && (
                    <Typography><strong>Extras:</strong> {npc.extras}</Typography>
                )}
                <Typography><strong>Secrets:</strong> {npc.secrets}</Typography>
            </CardContent>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => onDeleteClick(npc)}
                className="button"
            >
                Delete
            </Button>
        </Card>
    );
};

export default NPCDisplay;
