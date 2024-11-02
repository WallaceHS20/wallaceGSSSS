import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchInput from '../../components/SearchInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AppMenu from '../../components/AppMenu/AppMenu';
import api from '../../api/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import ModalEdit from '../../components/ModalEdit';
import ModalDelete from '../../components/ModalDelete';
import Menu from '../../components/SideBarMenu';

export default function Users() {
    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(8);
    const [selectedProfile, setSelectedProfile] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const response = await api.get('/users/usersList');
            setUser(response.data);
            console.log(response.data);

        } catch (error) {
            console.log(error.message);
        }
    }

    // Calcular o número total de páginas
    const totalPages = Math.ceil(user.length / rowsPerPage);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const filteredRows = user.filter(row => {
        const matchesProfile = selectedProfile ? row.perfil === selectedProfile : true;
        const matchesSearch = row.nome.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesProfile && matchesSearch;
    });


    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

    return (
        <>
            <Menu />
            <div className="content-page">
                <h1 className='title-due'>Usuários</h1>
                <span className='description-due'>Usuários</span>
                <div className="duplicatesDueHeader">
                    <Select
                        value={selectedProfile}
                        onChange={(e) => setSelectedProfile(e.target.value)}
                        displayEmpty
                        sx={{ marginLeft: 2, minWidth: 200 }}
                    >
                        <MenuItem value="">
                            <em>Todos</em>
                        </MenuItem>
                        <MenuItem value="Operador">Operador</MenuItem>
                        <MenuItem value="Sacado">Sacado</MenuItem>
                        <MenuItem value="Cessionaria">Cessionária</MenuItem>
                    </Select>

                    <SearchInput
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}  // Atualiza o termo de busca
                    />
                </div>
                <div className="tableDuplicateDue">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell align="center">Tipo</TableCell>
                                    <TableCell align="center">Contato</TableCell>
                                    <TableCell align="center">E-mail</TableCell>
                                    <TableCell align="center">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRows.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.nome}
                                        </TableCell>
                                        <TableCell align="center">{row.perfil}</TableCell>
                                        <TableCell align="center">{row.celular}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">
                                            <ModalEdit user={row} reloadUsers={loadUsers}>
                                                <EditIcon sx={{ color: 'grey.900' }} />
                                            </ModalEdit>
                                            <ModalDelete user={row} reloadUsers={loadUsers}>
                                                <DeleteIcon sx={{ color: 'grey.900' }} />
                                            </ModalDelete>
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
