import CadastroForm from '../../components/formCadastro'
import ModalTermo from '../../components/modalTermo';
import { useState } from 'react';
import './index.css'


export default function CadastroLogin(){
    const [openModal, setModalOpen] = useState(false);
    const [dataForm, setDataForm] = useState([]);

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            nome: formData.get('nome'),
            cpf_cnpj: formData.get('cpf_cnpj'),
            tel_cel: formData.get('tel_cel'),
            cep: formData.get('cep'),
            endereco: formData.get('endereco'),
            email: formData.get('email'),
            senha: formData.get('senha'),
        };
        
        setDataForm(data)

        event.target.reset();

        setModalOpen(true);
    };
    
    const handleCloseModal = (()=>{
        setModalOpen(false)
    })

    return(
        <div className='container_menu'>
            <div className='entrar'>
                <img src='/logoSignin.svg' alt='logo signin'></img>
                <h1>JÁ POSSUI CONTA ?</h1>
                <p>Acesse sua conta agora mesmo.</p>
                <button className='btnEnviar'>Entrar</button>
            </div>

            <div className='cadastro'>
                <div className='gridText'>
                    <h2>CRIE SUA CONTA</h2>
                    <p>Registre-se e tenha acesso a insights valiosos.</p>
                </div>
                <div className='gridInput'>
                    <CadastroForm onSubmit={handleSubmit}/>
                </div>
                {
                    openModal && (
                        <ModalTermo open={openModal} onClose={handleCloseModal} dataForm={dataForm} />
                    )
                }
            </div>
        </div>
    )
}