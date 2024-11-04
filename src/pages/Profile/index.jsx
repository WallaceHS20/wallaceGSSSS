import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import './profile.css';
import Menu from '../../components/SideBarMenu';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/user/userSlice';
import { fetchLatestTerm } from '../../redux/termo/termoSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [termsData, setTermsData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    console.log('qqqqq');
    console.log(user.user);
    

    const {
        register,
        handleSubmit,
        setValue, // Função para definir valores dos campos
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (user.user) {
            setValue('nome', user.nome);
            setValue('empresa', user.perfil);
            setValue('email', user.email);
            setValue('senha', user.senha);
            setValue('cpf_cnpj', user.cpf_cnpj);
            setValue('telefone', user.telefone);
            setValue('celular', user.celular);
            setValue('cep', user.cep);
            setValue('endereco', user.endereco);
            setValue('perfil', user.perfil);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            const resultAction = await dispatch(createUser(data));

            if (createUser.fulfilled.match(resultAction)) {
                const termsAction = await dispatch(fetchLatestTerm());

                if (fetchLatestTerm.fulfilled.match(termsAction)) {
                    setTermsData(termsAction.payload);
                    setModalOpen(true);
                } else {
                    console.error('Erro ao buscar termos:', termsAction.payload);
                }
            } else if (createUser.rejected.match(resultAction)) {
                console.error('Erro ao criar usuário:', resultAction.payload);
            }
        } catch (error) {
            console.error('Erro ao despachar a ação de cadastro:', error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Menu />
            <div className="content-page">
                <section className="signUp-profile-painel">
                    <main className='signUp-profile-painel-box'>
                        <h1>Dados de usuário</h1>
                        <form className='signUp-profile-painel-form' onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                {...register('nome', { required: 'Nome é obrigatório' })}
                                error={!!errors.nome}
                                helperText={errors.nome ? errors.nome.message : ''}
                                label="Nome"
                                fullWidth
                                margin="normal"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountCircleIcon sx={{ color: errors.nome ? 'var(--color-error)' : 'inherit' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                {...register('empresa', { required: 'Empresa é obrigatória' })}
                                error={!!errors.empresa}
                                helperText={errors.empresa ? errors.empresa.message : ''}
                                label="Empresa"
                                fullWidth
                                margin="normal"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <ApartmentIcon sx={{ color: errors.empresa ? 'var(--color-error)' : 'inherit' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                {...register('email', {
                                    required: 'E-mail é obrigatório',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Formato de e-mail inválido',
                                    },
                                })}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                                label="E-mail"
                                fullWidth
                                margin="normal"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmailIcon sx={{ color: errors.email ? 'var(--color-error)' : 'inherit' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                {...register('senha', {
                                    required: 'Senha é obrigatória',
                                    minLength: {
                                        value: 6,
                                        message: 'A senha deve ter pelo menos 6 caracteres',
                                    },
                                })}
                                error={!!errors.senha}
                                helperText={errors.senha ? errors.senha.message : ''}
                                label="Senha"
                                type="password"
                                fullWidth
                                margin="normal"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <KeyIcon sx={{ color: errors.senha ? '#dd5b59' : 'inherit' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                {...register('cpf_cnpj', { required: 'CPF/CNPJ é obrigatório' })}
                                error={!!errors.cpf_cnpj}
                                helperText={errors.cpf_cnpj ? errors.cpf_cnpj.message : ''}
                                label="CPF/CNPJ"
                                fullWidth
                                margin="normal"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <InsertDriveFileIcon sx={{ color: errors.cpf_cnpj ? 'var(--color-error)' : 'inherit' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                {...register('telefone', { required: 'Telefone é obrigatório' })}
                                error={!!errors.telefone}
                                helperText={errors.telefone ? errors.telefone.message : ''}
                                label="Telefone"
                                fullWidth
                                margin="normal"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LocalPhoneIcon sx={{ color: errors.telefone ? 'var(--color-error)' : 'inherit' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                {...register('celular', { required: 'Celular é obrigatório' })}
                                error={!!errors.celular}
                                helperText={errors.celular ? errors.celular.message : ''}
                                label="Celular"
                                fullWidth
                                margin="normal"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <PhoneIphoneIcon sx={{ color: errors.celular ? 'var(--color-error)' : 'inherit' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                {...register('cep', { required: 'CEP é obrigatório' })}
                                error={!!errors.cep}
                                helperText={errors.cep ? errors.cep.message : ''}
                                label="CEP"
                                fullWidth
                                margin="normal"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <MyLocationIcon sx={{ color: errors.cep ? 'var(--color-error)' : 'inherit' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                {...register('endereco', { required: 'Endereço é obrigatório' })}
                                error={!!errors.endereco}
                                helperText={errors.endereco ? errors.endereco.message : ''}
                                label="Endereço"
                                fullWidth
                                margin="normal"
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EditRoadIcon sx={{ color: errors.endereco ? 'var(--color-error)' : 'inherit' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div className='perfil-sign'>
                                <h2>Perfil</h2>
                                <RadioGroup {...register('perfil', { required: 'Perfil é obrigatório' })}>
                                    <FormControlLabel value="Cessionaria" control={<Radio />} label="Cessionária" />
                                    <FormControlLabel value="Sacado" control={<Radio />} label="Sacado" />
                                    <FormControlLabel value="Operador" control={<Radio />} label="Operador" />
                                </RadioGroup>
                                {errors.perfil && <p style={{ color: 'var(--color-error)' }}>{errors.perfil.message}</p>}
                            </div>
                            <button className='signUp-profile-painel-form-send' type="submit">
                                Cadastrar
                            </button>
                        </form>
                    </main>
                    <div className='capa-profile'>
                        <img src='./userB1.jpg' alt="Capa do Perfil" />
                    </div>
                </section>
            </div>
        </>
    );
}
