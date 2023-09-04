import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import NpcDisplay from './NpcDisplay';
import '../styles.css';

const NpcList: React.FC = () => {
    const [npcs, setNpcs] = useState<any[]>([]);
    const [selectedNpc, setSelectedNpc] = useState<any>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editedNpc, setEditedNpc] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(() => {
        api.get('/get-all-npcs')
        .then((response) => {
            console.log(response.data)
            setNpcs(response.data);
        })
        .catch((error) => {
            console.error('Error fetching NPCs:', error);
        });
    }, []);

    const handleDeleteClick = (npc: any) => {
        setSelectedNpc(npc);
        setDeleteDialogOpen(true);
    };

    const handleUpdateClick = (npc: any) => {
        setEditedNpc(npc);
        navigate(`/update/${npc.id}`, { state: { npc } });
    }

    const handleDeleteConfirmed = () => {
        if (selectedNpc) {
            api.delete(`/delete-npc/${selectedNpc.id}`)
                .then(() => {
                    // Close the dialog
                    setDeleteDialogOpen(false);
                    // Refresh the NPC list
                    setNpcs((prevNpcs) => prevNpcs.filter((npc) => npc.id !== selectedNpc.id));
                })
                .catch((error) => {
                    console.error('Error deleting NPC:', error);
                    // Close the dialog
                    setDeleteDialogOpen(false);
                });
        }
    };

    const handleDeleteDialogClose = () => {
        setSelectedNpc(null);
        setDeleteDialogOpen(false);
    };

    const goToNpcForm = () => {
        navigate('/add')
    }

    return (
        <div className="centered-container">
        <Typography variant="h4" gutterBottom>NPC List</Typography>
        <Button variant="contained" color="primary" onClick={goToNpcForm} className="button">
                Add NPC
        </Button>
        <div className="npc-grid">
            {npcs.map((npc) => (
                    <div key={npc.id} className="npc-card">
                        <NpcDisplay npc={npc} onDeleteClick={handleDeleteClick} onUpdateClick={handleUpdateClick} />
                    </div>
            ))}
        </div>

        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this NPC?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteDialogClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDeleteConfirmed} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default NpcList;
