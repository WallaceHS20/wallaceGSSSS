import { useEffect, useState} from "react";
import { Modal} from "@mui/material";
import './index.css'
import baseURL from "../../utils";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function ModalTermo({ open, onClose, dataForm }){

    const [dataTermo, setDataTermo] = useState([]);
    const [dataForms, setDataForms] = useState([]);
    const [day, setDay] = useState('');
    const [checkObrigatorio, setCheckObrigatorio] = useState(false);
    const [checkOpcional, setcheckOpcional] = useState(false);
    const [listTermos, setListTermos] = useState([]);
    const [statusAlert, setStatusAlert] = useState('');
    const [mensageAlert, setMensageAlert] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(()=>{
        termo();
        const data = new Date();
        const dataFormatada = data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        setDay(dataFormatada);
    }, [])


    useEffect(() => {
        if (listTermos.length > 0) {
            cadastroUsuario();
        }
    }, [listTermos]);


    async function termo(){
        try {
            const response = await fetch(`${baseURL}terms/latestTerm`, {
                method: "GET",
              });
    
            const data = await response.json();
            
            return setDataTermo(data)

        } catch (error) {
            console.log(error)
        }
    }

    const addTermos = () => {
        setDataForms(dataForm)
        let termos = []

        if(checkOpcional){
            const termosOpcionais = dataTermo.filter((x)=>x.prioridade == 2).map((y)=>({
                nome_termo: y.nome_termo,
                prioridade: 2,
                descricao: y.descricao,
                aceite: true,
                versao: y.versao
            }))

            termos = [...termos, ...termosOpcionais]
        }

        if(checkObrigatorio){
            const termosObrigatorios = dataTermo.filter((x)=>x.prioridade == 1).map((y)=>({
                nome_termo: y.nome_termo,
                prioridade: 1,
                descricao: y.descricao,
                aceite: true,
                versao: y.versao
            }))
            
            termos = [...termos, ...termosObrigatorios]

            setListTermos(termos);
        }
        else{
            setOpenSnackbar(true);
            setStatusAlert('error');
            setMensageAlert('É necessário aceitar os Termos de Uso obrigatórios para prosseguir com o cadastro.');
        }
    }

    async function cadastroUsuario(){
        try {
            const dado = {
                nome: dataForms.nome,
                email: dataForms.email,
                cpf_cnpj: dataForms.cpf_cnpj,
                telefone: dataForms.tel_cel,
                celular: dataForms.tel_cel,
                cep: dataForms.cep,
                endereco: dataForms.endereco,
                senha: dataForms.senha,
                termos: listTermos
            }

            const response = await fetch(`${baseURL}users/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dado),
            });

            const status = response.status;

            const result = await response.json();

            console.log('status', status || 'mensgaem', result.error)
            
            if( status === 201){
                setOpenSnackbar(true);
                setStatusAlert('success');
                setMensageAlert('Usuário criado com sucesso!');
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            }else{
                setOpenSnackbar(true);
                setStatusAlert('error');
                setMensageAlert(`Erro ao criar usuário: ${result.error}`);
            }
          
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return(
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal">
                    <div className="header">
                        <button className="btnClose" onClick={onClose}>X</button>
                    </div>
                    <div className="secondBox">
                        <div>
                            <h3>TERMO DE USO E CONDIÇÕES - {day}</h3>
                        </div>
                        <div className="boxTermo">
                            <p>Termos Obrigatorios: </p>
                            {
                                dataTermo.filter((x)=>x.prioridade == 1).map((x, index)=>{
                                    return(
                                        <p key={index}>{x.descricao}</p>
                                    )
                                })
                            }
                            <p>Termos Opcionais: </p>
                            {
                                dataTermo.filter((x)=>x.prioridade == 2).map((x, index)=>{
                                    return(
                                        <p key={index}>{x.descricao}</p>
                                    )
                                })
                            }
                        </div>

                        <hr/>

                        <div className="checkBox">
                            <div className="check">
                                <input 
                                    type="checkbox" 
                                    id="termosOpcionais" 
                                    name="termosOpcionais" 
                                    checked={checkOpcional}
                                    onChange={()=> setcheckOpcional(!checkOpcional)} 
                                />
                                <label htmlFor="termosOpcionais" >Aceita receber nossa newsletter com novidades e ofertas exclusivas.</label>
                            </div>
                            <div className="check">
                                <input 
                                    type="checkbox" 
                                    id="termosObrigatorio" 
                                    name="termosObrigatorio" 
                                    checked={checkObrigatorio} 
                                    onChange={()=> setCheckObrigatorio(!checkObrigatorio)} 
                                    />
                                <label htmlFor="termosObrigatorio">Li e concordo com os termos</label>
                            </div>
                        </div>
                        <button className="btnEnviar" onClick={addTermos}>Avançar</button>
                    </div>
                    
                </div>
            </Modal>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={5000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} variant="filled" severity={statusAlert} sx={{ width: '100%' }}>
                    {mensageAlert}
                </Alert>
            </Snackbar>
        </div>
    )
}