import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import IconButton from '@mui/material/IconButton';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './ModalEdit.css';
import api from '../../api/api';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ModalEdit({ children, user, reloadUsers }) {
    const [open, setOpen] = React.useState(false);

    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleClickOpen = () => {
        setOpen(true);

        if (user) {
            setValue('nome', user.nome);
            setValue('perfil', user.perfil);
            setValue('celular', user.celular);
            setValue('email', user.email);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data) => {
        try {
            await api.put(`/users/${user.cpf_cnpj}/update`, {
                ...data,
                cpf_cnpj: user.cpf_cnpj
            });
            toast.success('Edição Concluída');
            handleClose();
            // Call reloadUsers to refresh the user list
            if (reloadUsers) reloadUsers();
        } catch (error) {
            console.error(error);
            toast.error('Falha ao registrar');
        }
    };

    return (
        <React.Fragment>
            <Button variant="text" endIcon={children} onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'xl'}
            >
                <div className="modalEdit-header">
                    <h1>Editar Dados</h1>
                    <IconButton onClick={handleClose} color="error" size="large">
                        <CancelPresentationIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <div className="modalEdit-body">
                    <form className='modalEdit-form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="modalEdit-form-group">
                            <TextField
                                label="Nome"
                                variant="outlined"
                                fullWidth
                                {...register('nome', { required: 'Nome é obrigatório' })}
                                error={!!errors.nome}
                                helperText={errors.nome ? errors.nome.message : ''}
                            />
                        </div>

                        <div className="modalEdit-form-group">
                            <FormControl fullWidth variant="outlined" error={!!errors.tipo}>
                                <InputLabel id="tipo-label">Tipo</InputLabel>
                                <Controller
                                    name="perfil"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            labelId="tipo-label"
                                            label="Tipo"
                                            {...field}
                                        >
                                            <MenuItem value="">
                                                <em>Selecione o Tipo</em>
                                            </MenuItem>
                                            <MenuItem value="Sacado">Sacado</MenuItem>
                                            <MenuItem value="Operador">Operador</MenuItem>
                                            <MenuItem value="Cessionaria">Cessionária</MenuItem>
                                        </Select>
                                    )}
                                    rules={{ required: 'Tipo é obrigatório' }}
                                />
                                {errors.tipo && <span className="error-message">{errors.tipo.message}</span>}
                            </FormControl>
                        </div>

                        <div className="modalEdit-form-group">
                            <TextField
                                label="celular"
                                variant="outlined"
                                fullWidth
                                {...register('celular', { required: 'Contato é obrigatório' })}
                                error={!!errors.celular}
                                helperText={errors.celular ? errors.celular.message : ''}
                            />
                        </div>

                        <div className="modalEdit-form-group">
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                {...register('email', {
                                    required: 'Email é obrigatório',
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: 'Email inválido'
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                        </div>

                        <div className="modalEdit-form-group">
                            <Button className='cancel-edit-button' onClick={handleClose} variant="outlined" color="secondary">
                                Voltar
                            </Button>
                        </div>

                        <div className="modalEdit-form-group modalEdit-submit">
                            <Button className='send-edit-button' type="submit">
                                Enviar
                            </Button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </React.Fragment>
    );
}

