import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const TermoModal = ({ open, handleClose, termsData, user }) => {
    const [acceptedTerms, setAcceptedTerms] = useState({});

    const handleAccept = async () => {
        const termsToUpdate = termsData.termo_item.map((item) => ({
            termo_item_nome: item.termo_item_nome,
            termo_item_aceite: acceptedTerms[item.termo_item_nome] || false,
            termo_item_data_aceite: acceptedTerms[item.termo_item_nome] ? new Date().toISOString() : null,
        }));

        const updatedUserData = {
            termo_atual: {
                termo_aceite: true,
                termo_item: termsToUpdate,
                termo_nome: termsData.nome_termo,
                termo_versao: termsData.versao,
            },
        };

        try {
            const response = await axios.put(`http://localhost:5000/users/${user.cpf_cnpj}/update`, updatedUserData);

            if (response.status === 200) {
                toast.success('Termos aceitos com sucesso!');
                handleClose();
            }
        } catch (error) {
            console.error('Erro ao atualizar os termos:', error);
            toast.error('Houve um erro ao atualizar os termos. Tente novamente.');
        }
    };

    const handleCheckboxChange = (item) => {
        setAcceptedTerms((prev) => ({
            ...prev,
            [item.termo_item_nome]: !prev[item.termo_item_nome],
        }));
    };

    if (!termsData) {
        return null;
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    padding: 4,
                    borderRadius: 2,
                    maxWidth: 600,
                    margin: 'auto',
                    boxShadow: 24,
                    maxHeight: '80vh',
                    overflow: 'auto',
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    Termos de Uso
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {termsData.descricao}
                </Typography>
                <Typography variant="h6" component="h3" sx={{ marginTop: 2 }}>
                    Termos Específicos:
                </Typography>
                <Box sx={{ marginTop: 1, marginBottom: 2 }}>
                    {termsData.termo_item.map((item) => (
                        <FormControlLabel
                            key={item.termo_item_nome}
                            control={
                                <Checkbox
                                    checked={acceptedTerms[item.termo_item_nome] || false}
                                    onChange={() => handleCheckboxChange(item)}
                                />
                            }
                            label={
                                <Typography variant="body2">
                                    {item.termo_item_descricao}
                                </Typography>
                            }
                        />
                    ))}
                </Box>
                <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        onClick={handleAccept}
                        sx={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#45a049',
                            },
                        }}
                    >
                        Aceitar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default TermoModal;
