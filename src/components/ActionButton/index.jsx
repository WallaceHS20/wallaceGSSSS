import * as React from 'react';
import PropTypes from 'prop-types';
import { DialogsProvider } from '@toolpad/core/useDialogs';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import PaymentsIcon from '@mui/icons-material/Payments';
import Typography from '@mui/material/Typography';
import api from '../../api/api';
import { toast } from 'react-toastify';

const StyledButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
}));

function PaymentDialog({ open, onClose, sacado, cessionaria, loadDuplicates }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log('Payment date submitted:', data.paymentDate);
            console.log('Cessionária:', cessionaria);
            console.log('Sacado:', sacado);

            await api.put(`/assignee/${cessionaria.cnpj}/updateAssignee`, {
                "cessionaria_nome": cessionaria.nome,
                "cessionaria_score": cessionaria.score,
                "cessionaria_sacado": {
                    ...sacado,
                    "cessionaria_sacado_duplicadas_data_final": data.paymentDate,
                    "cessionaria_sacado_duplicata_status": "finalizado"
                }
            });

            toast.success("Pagamento confirmado");

            // Verifica se loadDuplicates é uma função antes de chamá-la
            if (typeof loadDuplicates === 'function') {
                loadDuplicates();
            }

            onClose(data.paymentDate);
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            toast.error('Erro ao atualizar: ' + error.message);
        }
    };

    return (
        <Dialog fullWidth open={open} onClose={() => onClose(null)}>
            <DialogTitle>
                Registrar pagamento para {sacado.cessionaria_sacado_nome} 
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        type="date"
                        variant="outlined"
                        {...register('paymentDate', { required: 'Data de pagamento é obrigatória' })}
                        error={!!errors.paymentDate}
                        helperText={errors.paymentDate ? errors.paymentDate.message : ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
                <Button
                    onClick={() => onClose(null)}
                    variant="contained"
                    color="error"
                    style={{ backgroundColor: '#FF6B6B' }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    style={{ backgroundColor: '#4CAF50' }}
                >
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

PaymentDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    sacado: PropTypes.shape({
        cessionaria_sacado_empresa: PropTypes.string.isRequired,
    }).isRequired,
    cessionaria: PropTypes.shape({
        nome: PropTypes.string.isRequired,
        cnpj: PropTypes.string.isRequired,
    }).isRequired,
    loadDuplicates: PropTypes.func.isRequired,
};

function DemoContent({ sacado, cessionaria, loadDuplicates }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (date) => {
        setOpen(false);
        if (date) {
            console.log('Payment date submitted:', date);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <StyledButton onClick={handleOpen}>
                <PaymentsIcon sx={{ fontSize: 40, color: '#8A9A5B' }} />
                <Typography variant="caption" color="textSecondary" align="center">
                    Registrar
                </Typography>
                <Typography variant="caption" color="textSecondary" align="center">
                    Pagamento
                </Typography>
            </StyledButton>
            <PaymentDialog 
                open={open} 
                onClose={handleClose} 
                sacado={sacado} 
                cessionaria={cessionaria} 
                loadDuplicates={loadDuplicates} 
            />
        </div>
    );
}

DemoContent.propTypes = {
    sacado: PropTypes.shape({
        cessionaria_sacado_empresa: PropTypes.string.isRequired,
    }).isRequired,
    cessionaria: PropTypes.shape({
        nome: PropTypes.string.isRequired,
        cnpj: PropTypes.string.isRequired,
    }).isRequired,
    loadDuplicates: PropTypes.func.isRequired,
};

export default function ActionButton({ sacado, cessionaria, loadDuplicates }) {
    return (
        <DialogsProvider>
            <DemoContent 
                sacado={sacado} 
                cessionaria={cessionaria} 
                loadDuplicates={loadDuplicates} 
            />
        </DialogsProvider>
    );
}
