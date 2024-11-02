import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '../../components/SideBarMenu';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SearchInput from '../../components/SearchInput';
import api from '../../api/api';
import '../DuplicatesDue/duplicatesDue.css'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function DuplicatesCompleted() {
    const { user } = useSelector((state) => state.user);
    const [duplicates, setDuplicates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(8);
    const [selectedMonth, setSelectedMonth] = useState('00');

    useEffect(() => {
        loadDuplicates();
    }, []);

    async function loadDuplicates() {
        try {
            const response = await api.get(`/assignee/${user.cpf_cnpj}`);

            console.log('====================================');
            console.log(response);
            console.log('====================================');

            if (response.data && Array.isArray(response.data.cessionaria_sacado)) {
                const status = response.data.cessionaria_sacado.filter(
                    (item) => item.cessionaria_sacado_duplicata_status === 'finalizado'
                );

                setDuplicates(status);
            } else {
                console.error('Dados da resposta estão ausentes ou inválidos');
                toast.error('Dados da resposta estão ausentes ou inválidos.');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição para a API:', error);
            toast.error('Erro ao carregar dados das duplicatas.');
        }
    }

    const getFilteredRows = () => {
        let filteredRows = duplicates;

        if (selectedMonth !== '00') {
            filteredRows = filteredRows.filter((sacado) => {
                if (sacado.cessionaria_sacado_duplicadas_data_final) {
                    const vencimentoDate = new Date(sacado.cessionaria_sacado_duplicadas_data_final);
                    const month = vencimentoDate.getUTCMonth() + 1;
                    return month === parseInt(selectedMonth);
                }
                return false;
            });
        }

        if (searchTerm) {
            filteredRows = filteredRows.filter((sacado) =>
                sacado.cessionaria_sacado_nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filteredRows;
    };

    const totalPages = Math.ceil(getFilteredRows().length / rowsPerPage);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = getFilteredRows().slice(startIndex, startIndex + rowsPerPage);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const months = [
        { value: '00', label: 'Todos' },
        { value: '01', label: 'Janeiro' },
        { value: '02', label: 'Fevereiro' },
        { value: '03', label: 'Março' },
        { value: '04', label: 'Abril' },
        { value: '05', label: 'Maio' },
        { value: '06', label: 'Junho' },
        { value: '07', label: 'Julho' },
        { value: '08', label: 'Agosto' },
        { value: '09', label: 'Setembro' },
        { value: '10', label: 'Outubro' },
        { value: '11', label: 'Novembro' },
        { value: '12', label: 'Dezembro' }
    ];

    function formatDate(dateString) {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <Menu />
            <div className="content-page">
                <h1 className='title-due'>Duplicatas Finalizadas</h1>
                <span className='description-due'>Finalizado</span>
                <div className="duplicatesDueHeader">
                    <SearchInput
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Pesquisar pelo nome da empresa"
                    />
                    <TextField
                        id="outlined-select-month"
                        select
                        label="Mês"
                        value={selectedMonth}
                        onChange={(e) => {
                            setSelectedMonth(e.target.value);
                            setCurrentPage(1);
                        }}
                        style={{ width: '200px' }}
                    >
                        {months.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="tableDuplicateDue">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell align="center">Contato</TableCell>
                                    <TableCell align="center">E-mail</TableCell>
                                    <TableCell align="center">Vencimento</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRows.map((sacado) => (
                                    <TableRow key={sacado.cessionaria_sacado_id}>
                                        <TableCell>{sacado.cessionaria_sacado_nome}</TableCell>
                                        <TableCell align="center">{sacado.cessionaria_sacado_contato || 'Não informado'}</TableCell>
                                        <TableCell align="center">{sacado.cessionaria_sacado_email || 'Não informado'}</TableCell>
                                        <TableCell align="center">{formatDate(sacado.cessionaria_sacado_duplicadas_data_final)}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                color={
                                                    sacado.cessionaria_sacado_duplicata_status === 'vencida'
                                                        ? 'error'
                                                        : sacado.cessionaria_sacado_duplicata_status === 'A Vencer'
                                                            ? 'warning'
                                                            : 'success'
                                                }
                                            >
                                                {sacado.cessionaria_sacado_duplicata_status}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className='duplicatePagination'>
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handleChangePage}
                            variant="outlined"
                            color="primary"
                        />
                    </Stack>
                </div>
            </div>
        </>
    );
}
