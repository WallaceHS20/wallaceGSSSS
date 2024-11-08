import React from 'react';
import './SignIn.css';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/user/userSlice'


export default function SignIn() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // OPERAÇÃO LOGIN
    const onSubmit = async (data) => {
        try {
            const resultAction = await dispatch(loginUser(data));

            if (loginUser.fulfilled.match(resultAction)) {
                navigate('/home');
            } else if (loginUser.rejected.match(resultAction)) {
                console.error('Erro ao fazer login:', resultAction.payload);
            }
        } catch (error) {
            console.error('Erro ao despachar a ação de login:', error);
        }
    }

    return (
        <div className='signUp'>

            <img className='signUp-logo-img' src='./logob1.png' alt="Logo" />

            <section className="signUp-login-painel">
                <img className='signUp-login-painel-img' src='./scorelg.png' alt="Painel Logo" />
                <main className='signUp-login-painel-box'>
                    <h1>Login</h1>
                    <h5>Estamos felizes em vê-lo. Entre para continuar.</h5>
                    <form className='signUp-login-painel-form' onSubmit={handleSubmit(onSubmit)}>

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
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmailIcon
                                                sx={{
                                                    color: errors.senha ? 'var(--color-error)' : 'inherit', // Condiciona a cor do ícone
                                                }} />
                                        </InputAdornment>
                                    ),
                                    style: {
                                        padding: '5px',
                                    },
                                },
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
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <KeyIcon
                                                sx={{
                                                    color: errors.senha ? '#dd5b59' : 'inherit',
                                                }} />
                                        </InputAdornment>
                                    ),
                                    style: {
                                        padding: '5px',
                                    },
                                },
                            }}
                        />

                        <button className='signUp-login-painel-form-send' type="submit">
                            Entrar
                        </button>

                    </form>
                </main>
            </section>
        </div>
    );
}