import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import './termos.css'

const TermsModal = ({ open, handleClose, termsData, userData, cnpj }) => {
    const [acceptedTerms, setAcceptedTerms] = useState({});
    const navigate = useNavigate();

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
            console.log(updatedUserData);
            const response = await axios.put(`http://localhost:5000/users/${cnpj}/update`, updatedUserData);

            if (response.status === 200) {
                toast.success('Usuário cadastrado!');
                handleClose();
                navigate('/login');
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

    const notAccept = () =>{
        navigate('/')
    }

    if (!termsData) {
        return null; // Ou você pode retornar um loading, se preferir
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    maxWidth: 600,
                    width: '90%',
                    boxShadow: 24,
                    borderRadius: 2,
                    overflowY: 'auto',
                    maxHeight: '80vh',
                }}
            >
                <div className='termo-header' variant="h5" component="h2" gutterBottom>
                    Termos de Uso
                </div>
                <div className='termo-body' variant="body1" sx={{ marginBottom: 2 }}>
                    <div className="body-description">
                        {termsData.descricao}
                    </div>
                </div>
                <div className='termo-opcional-header' variant="h6" component="h3" sx={{ marginTop: 2 }}>
                    Termos Opcionais:
                </div>
                <div className='termo-opcional-body' sx={{ marginTop: 5, marginBottom: 2 }}>
                    {termsData.termo_item.map((item) => (
                        <FormControlLabel
                            className='item-check'
                            key={item.termo_item_nome}
                            control={
                                <Checkbox
                                    checked={acceptedTerms[item.termo_item_nome] || false}
                                    onChange={() => handleCheckboxChange(item)}
                                />
                            }
                            label={item.termo_item_descricao}
                        />
                    ))}
                </div>
                <div className='actions-buttons' sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        onClick={notAccept}
                        sx={{
                            backgroundColor: '#818181',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#555555',
                            },
                            marginRight: 2,
                        }}
                    >
                        Não aceitar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleAccept}
                        sx={{
                            backgroundColor: '#0C4EC9',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#063792',
                            },
                        }}
                    >
                        Aceitar
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default TermsModal;
