import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './modalDelete.css'
import api from '../../api/api';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDelete({ children, user, reloadUsers }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function DeleteUser(cpf_cnpj) {
    const response = api.delete(`/users/${cpf_cnpj}/deleteUser`)

    .then((result) =>{
      toast.success(`Usuário ${user.nome} deletado.`)
      handleClose()
      reloadUsers()
    })

    .catch((error) =>{
      console.log(error);
      
    })
  }

  return (
    <React.Fragment>
      <Button variant="text" endIcon={children} onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle> Tem certeza que deseja excluir {user.nome}?</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <div className='modalDelete-actions'>
            <Button variant="contained" color="error" onClick={handleClose}>Não</Button>
            <Button variant="contained" color="success" onClick={() => DeleteUser(user.cpf_cnpj)}>Sim</Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
