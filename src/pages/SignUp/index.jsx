import React from 'react';
import { useState, useEffect } from 'react';
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
import Loader from '../../components/Loader'

import TermsModal from '../../components/TermoCondicoes/ModalTermoCondicoes';

import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/user/userSlice';
import { fetchLatestTerm } from '../../redux/termo/termoSlice'

export default function SignUp() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [termsData, setTermsData] = useState(null);
  const [loader, setLoader] = useState(false)


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const cnpj = watch('cpf_cnpj');

  const onSubmit = async (data) => {
    try {
      setLoader(true)
      const resultAction = await dispatch(createUser(data));

      if (createUser.fulfilled.match(resultAction)) {
        const termsAction = await dispatch(fetchLatestTerm());

        if (fetchLatestTerm.fulfilled.match(termsAction)) {
          setTermsData(termsAction.payload);
          setModalOpen(true);
          setLoader(false)
        }

        else {
          console.error('Erro ao buscar termos:', termsAction.payload);
          setLoader(false)
        }

      }

      else if (createUser.rejected.match(resultAction)) {
        console.error('Erro ao criar usuário:', resultAction.payload);
        setLoader(false)
      }

    } catch (error) {
      console.error('Erro ao despachar a ação de cadastro:', error);
      setLoader(false)
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
};

  return (
    <div className='signUp'>
      {loader && <Loader/>}
      <img className='signUp-logo-img' src='./logob1.png' alt="Logo" />
      <section className="signUp-login-painel">
        <img className='signUp-login-painel-img' src='./scorelg.png' alt="Painel Logo" />
        <main className='signUp-login-painel-box'>
          <h1>Cadastre-se</h1>
          <form className='signUp-login-painel-form' onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('nome', { required: 'Nome é obrigatório' })}
              error={!!errors.nome}
              helperText={errors.nome ? errors.nome.message : ''}
              label="Nome"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircleIcon sx={{ color: errors.email ? 'var(--color-error)' : 'inherit' }} />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <ApartmentIcon sx={{ color: errors.email ? 'var(--color-error)' : 'inherit' }} />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <InsertDriveFileIcon sx={{ color: errors.email ? 'var(--color-error)' : 'inherit' }} />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LocalPhoneIcon sx={{ color: errors.email ? 'var(--color-error)' : 'inherit' }} />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PhoneIphoneIcon sx={{ color: errors.email ? 'var(--color-error)' : 'inherit' }} />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MyLocationIcon sx={{ color: errors.email ? 'var(--color-error)' : 'inherit' }} />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EditRoadIcon sx={{ color: errors.email ? 'var(--color-error)' : 'inherit' }} />
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
            <button className='signUp-login-painel-form-send' type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </section>
      <TermsModal open={modalOpen} handleClose={handleCloseModal} cnpj={cnpj} termsData={termsData} />
    </div>
  );
}
