import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';
import './form.css'


const CadastroForm = ({ onSubmit }) => {
    return(
        <form onSubmit={onSubmit} className='form'>
            <TextField
                id='input-with-icon-textfield'
                label='Nome'
                name='nome'
                
                required
                slotProps={{
                input: {
                    startAdornment: (
                    <InputAdornment position='start'>
                        <img src='/user-alt-1-svgrepo-com.svg'/>
                    </InputAdornment>
                    ),
                },
                }}
            />
            <TextField
                id='cpf_cnpj'
                label='CPF/CNPJ'
                type='number'
                name='cpf_cnpj'
                required
                slotProps={{
                input: {
                    startAdornment: (
                    <InputAdornment position='start'>
                        <img src='/id-card-svgrepo-com.svg'/>
                    </InputAdornment>
                    ),
                },
                }}
            />
            <TextField
                id='tel_cel'
                label='Telefone/Celular'
                type='number'
                name='tel_cel'
                slotProps={{
                input: {
                    startAdornment: (
                    <InputAdornment position='start'>
                        <img src='/telephone-signal-svgrepo-com.svg'/>
                    </InputAdornment>
                    ),
                },
                }}
            />
            <TextField
                id='cep'
                label='CEP'
                type='number'
                name='cep'
                required
                slotProps={{
                input: {
                    startAdornment: (
                    <InputAdornment position='start'>
                        <img src='/place-marker-svgrepo-com.svg'/>
                    </InputAdornment>
                    ),
                },
                }}
            />
            <TextField
                id='endereco'
                label='Endereço'
                type='text'
                name='endereco'
                required
                slotProps={{
                input: {
                    startAdornment: (
                    <InputAdornment position='start'>
                        <img src='/house-user-svgrepo-com.svg'/>
                    </InputAdornment>
                    ),
                },
                }}
            />
            <TextField
                id='email'
                label='E-mail'
                type='email'
                name='email'
                required
                slotProps={{
                input: {
                    startAdornment: (
                    <InputAdornment position='start'>
                        <img src='/email-1573-svgrepo-com.svg'/>
                    </InputAdornment>
                    ),
                },
                }}
            />
            <TextField
                id='senha'
                label='Senha'
                type='password'
                name='senha'
                required
                slotProps={{
                input: {
                    startAdornment: (
                    <InputAdornment position='start'>
                        <img src='/password-svgrepo-com.svg'/>
                    </InputAdornment>
                    ),
                },
                }}
            />
            <div className='btnDiv'>
                <button type='submit' className='btnForm'>Cadastrar</button>
            </div>
            
        </form>
    )
}

CadastroForm.propTypes = {
    onSubmit: PropTypes.func.isRequired, // Valida que onSubmit é obrigatório e deve ser uma função
};

export default CadastroForm