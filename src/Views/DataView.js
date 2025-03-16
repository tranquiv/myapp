import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography,
} from '@mui/material';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const DataView = ({ onRowClick }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'formularios'), orderBy('numero'));
                const querySnapshot = await getDocs(q);
                const fetchedData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        numero: data.numero || "N/A",
                        remitente: data.remitente || "Desconocido",
                        fecha: data.fecha || "Sin fecha",
                        descripcion: data.descripcion || "Sin descripción",
                        observacion: data.observacion || "Sin observación",
                    };
                });
                setData(fetchedData);
            } catch (error) {
                setError("Error al cargar los datos. Intente de nuevo más tarde.");
                console.error('Error al obtener los datos: ', error.message);
            }
        };

        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        return data.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm]);

    const paginatedData = useMemo(() => {
        return filteredData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    }, [filteredData, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (row) => {
        onRowClick(row);
        navigate('/form1');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Vista de Datos
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <TextField
                label="Buscar"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Número</TableCell>
                            <TableCell>Remitente</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Observación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow 
                                key={row.id}
                                hover
                                onClick={() => handleRowClick(row)}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell>{row.numero}</TableCell>
                                <TableCell>{row.remitente}</TableCell>
                                <TableCell>{row.fecha}</TableCell>
                                <TableCell>{row.descripcion}</TableCell>
                                <TableCell>{row.observacion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
};

export default DataView;