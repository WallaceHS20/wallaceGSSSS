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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


import './profile.css';
import Menu from '../../components/SideBarMenu';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/user/userSlice';


export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();

    // SETANDO VALORES NOS CAMPOS AO CARREGAR
    useEffect(() => {
        if (user.user) {
            setValue('nome', user.user.nome);
            setValue('empresa', user.user.perfil);
            setValue('email', user.user.email);
            setValue('cpf_cnpj', user.user.cpf_cnpj);
            setValue('telefone', user.user.telefone);
            setValue('celular', user.user.celular);
            setValue('cep', user.user.cep);
            setValue('endereco', user.user.endereco);
            setValue('perfil', user.user.perfil);
        }

    }, [user.user, setValue]);

    console.log(user.user);
    

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Mapeie `termo_item` com os valores mais recentes dos checkboxes
            const termoAtual = {
                "termo_aceite": true,
                termo_item: user.user.termo_atual.termo_item.map((item, index) => ({
                    termo_item_nome: item.termo_item_nome,
                    termo_item_aceite: data.termo_item[index].termo_item_aceite, // Pega o valor atualizado do checkbox
                })),
            };
    
            // CORPO REQUISIÇÃO
            const requestData = {
                ...data,
                termo_atual: termoAtual,
                termo_log: []
            };
    
            const resultAction = await dispatch(updateUser(requestData));
    
            if (updateUser.fulfilled.match(resultAction)) {
                setLoading(false);
            } 
            
            else if (updateUser.rejected.match(resultAction)) {
                console.error('Erro ao atualizar usuário:', resultAction.payload);
                setLoading(false);
            }
        } 
        
        catch (error) {
            console.error('Erro ao despachar a ação de atualização:', error);
            setLoading(false);
        }
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
                                disabled
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
                                {...register('cpf_cnpj', { required: 'CNPJ é obrigatório' })}
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

                            <FormControl fullWidth margin="normal" variant="standard">
                                <InputLabel id="perfil-label">Perfil</InputLabel>
                                <Controller
                                    name="perfil"
                                    disabled
                                    control={control}
                                    defaultValue={user.user?.perfil || ''} // Valor inicial do perfil do usuário
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="perfil-label"
                                            label="Perfil"
                                            fullWidth
                                        >
                                            <MenuItem value="Cessionaria">Cessionária</MenuItem>
                                            <MenuItem value="Operador">Cliente</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>

                            {/* TERMOS DE USO */}
                            <div className="termos-opcionais">
                                <h2>Termos Opcionais</h2>
                                {user.user?.termo_atual?.termo_item?.map((item, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Controller
                                                name={`termo_item[${index}].termo_item_aceite`} // Nome ajustado para capturar corretamente no onSubmit
                                                control={control}
                                                defaultValue={item.termo_item_aceite}
                                                render={({ field }) => (
                                                    <Checkbox
                                                        {...field}
                                                        checked={field.value}
                                                        onChange={(e) => field.onChange(e.target.checked)} // Atualiza o valor quando o usuário marca/desmarca
                                                    />
                                                )}
                                            />
                                        }
                                        label={item.termo_item_nome}
                                    />
                                ))}
                            </div>

                            <div className="signUp-profile-painel-form-send">
                                <button type="submit">
                                    Atualizar
                                </button>
                            </div>

                        </form>
                    </main>
                </section>
            </div>
        </>
    );
}
