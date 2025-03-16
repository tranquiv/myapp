import React, { useEffect, useState } from 'react';
import {
    Container,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    Grid,
    Tabs,
    Tab,
    Box,
} from '@mui/material';
import {
    AddHome as InicioIcon,
    Verified as MientrasIcon,
    Grading as FinIcon,
} from '@mui/icons-material';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import CleanigServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';

// Asegúrate de inicializar Firebase y exportar db desde tu archivo de configuración
import { db } from '../firebaseConfig'; // Ajusta esta ruta según tu configuración


const Form1 = ({ selectedRow, onCancel, useRole }) => {

    //estado que almacena  todos los campos del formualario
    const [formData, setFormData] = useState({
        numero: '',
        fecha: '',
        remitente: '',
        resumen: '',
        nroRecepcion: '',
        fechaRecepcion: '',
        descripcion: '',
        estado: '',
        destinatarios: '',
        providencia: '',
        ME: '',
        seguimiento: '',
        docsol1: '',
        destinatario2: '',
        cargo: '',
        dependencia: '',
        recepcion2: '',
        observacion: '',
        destinatario1: '',
    });

    const [tabValue, setTabValue] = useState(0);

    // Cargar los datos seleccionados en el formulario
    useEffect(() => {
        if (selectedRow) {
            setFormData(selectedRow);
        }
    }, [selectedRow]);


    //manejo de cambios genéricos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //actualiza el estado usando el nombre del campo
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // buscar documento
    const handleSearch = async () => {
        try {
            if (!formData.numero) {
                alert('Por favor, ingresa un número para buscar.');
                return;
            }

            const docRef = doc(db, 'formularios', formData.numero);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFormData(docSnap.data());
                alert('Registro encontrado');
            } else {
                alert('No se encontró ningún registro con ese número.');
            }
        } catch (error) {
            console.error('Error al buscar el registro: ', error.message);
            alert('Hubo un error al buscar el registro: ' + error.message);
        }
    };

    //guardar/ actualizar
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.numero || !formData.remitente) {
                alert('Por favor, completa los campos obligatorios.');
                return;
            }

            await setDoc(doc(db, 'formularios', formData.numero), formData);
            alert('Datos guardados exitosamente!');

            setFormData({
                numero: '',
                fecha: '',
                remitente: '',
                resumen: '',
                nroRecepcion: '',
                fechaRecepcion: '',
                descripcion: '',
                destinatarios: '',
                providencia: '',
                ME: '',
                destinatario1: '',
                docsol1: '',
                destinatario2: '',
                cargo: '',
                dependencia: '',
                recepcion2: '',
                observacion: '',
                seguimiento: '',
                estado: '',
            });
        } catch (error) {
            console.error('Error al guardar los datos: ', error.message);
            alert('Hubo un error al guardar los datos: ' + error.message);
        }
    };

    //limpiar
    const limpiar = () => {
        setFormData({
            numero: '',
            fecha: '',
            remitente: '',
            resumen: '',
            nroRecepcion: '',
            fechaRecepcion: '',
            descripcion: '',
            estado: '',
            destinatarios: '',
            providencia: '',
            ME: '',
            seguimiento: '',
            docsol1: '',
            destinatario2: '',
            cargo: '',
            dependencia: '',
            recepcion2: '',
            observacion: '',
        });
    }

    //eliminar
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'formularios', formData.numero));
            alert('Registro eliminado exitosamente');

            setFormData({
                numero: '',
                fecha: '',
                remitente: '',
                resumen: '',
                nroRecepcion: '',
                fechaRecepcion: '',
                descripcion: '',
                estado: '',
                destinatarios: '',
                providencia: '',
                ME: '',
                seguimiento: '',
                docsol1: '',
                destinatario2: '',
                cargo: '',
                dependencia: '',
                recepcion2: '',
                observacion: '',
            });
        } catch (error) {
            console.error('Error al eliminar el registro: ', error.message);
            alert('Hubo un error al eliminar el registro: ' + error.message);
        }
    };

    return (
        //se aplica el tema oscuro
        //como dodos los demas elemntos van dentro los afecta a todos.

        <Container>
            <Typography variant="h6" gutterBottom>
                Registro de Mesas de Entradas
            </Typography>

            {/* los tabs son lo botones para navegar entre los tres paneles de arriba: Inicio, Sin Nota y Con Nota */}
            <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab
                    label={
                        <Box display="flex" alignItems="center">
                            <InicioIcon fontSize="small" sx={{ mr: 1 }} />
                            Inicio
                        </Box>
                    }
                />
                <Tab
                    label={
                        <Box display="flex" alignItems="center">
                            <MientrasIcon fontSize="small" sx={{ mr: 1 }} />
                            Prov. Sin Nota
                        </Box>
                    }
                />
                <Tab
                    label={
                        <Box display="flex" alignItems="center">
                            <FinIcon fontSize="small" sx={{ mr: 1 }} />
                            Prov. Con Nota
                        </Box>
                    }
                />
            </Tabs>
            {/* el from es para la recoleccion de datos */}
            <form onSubmit={handleSubmit}>
                {/* los box son los paneles en si, en ellas estan los elementos correspondientes a las secciones*/}
                {/* En este caso Box 0 corresponde a al apartado de Inicio */}
                <Box hidden={tabValue !== 0}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Número de M.E."
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleSearch}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Fecha recibido"
                                name="fecha"
                                type="date"
                                value={formData.fecha}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Remitente"
                                name="remitente"
                                value={formData.remitente}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <TextField
                                label="Resumen"
                                name="resumen"
                                value={formData.resumen}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box hidden={tabValue !== 1}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Destinatarios"
                                name="destinatarios"
                                value={formData.destinatarios}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Providencia"
                                name="providencia"
                                value={formData.providencia}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Recepción"
                                name="recepcion"
                                value={formData.recepcion}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="ME"
                                name="ME"
                                value={formData.ME}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Seguimiento</InputLabel>
                                <Select
                                    name="seguimiento"
                                    value={formData.seguimiento}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Ninguno</em>
                                    </MenuItem>
                                    <MenuItem value="pendiente">Pendiente</MenuItem>
                                    <MenuItem value="finalizado">Finalizado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Documento solicitado</InputLabel>
                                <Select
                                    name="docsol1"
                                    value={formData.docsol1}
                                    onChange={handleChange}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="Dictamen Conjunto">Dictamen Conjunto</MenuItem>
                                    <MenuItem value="Resolución">Resolución</MenuItem>
                                    <MenuItem value="Convenio">Convenio</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Box hidden={tabValue !== 2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Número de Recepción"
                                name="nroRecepcion"
                                value={formData.nroRecepcion}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Fecha de Recepción"
                                name="fechaRecepcion"
                                type="date"
                                value={formData.fechaRecepcion}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                                    <MenuItem value="Finalizado">Finalizado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Destinatario 2"
                                name="destinatario2"
                                value={formData.destinatario2}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Cargo"
                                name="cargo"
                                value={formData.cargo}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Dependencia"
                                name="dependencia"
                                value={formData.dependencia}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Recepción 2"
                                name="recepcion2"
                                value={formData.recepcion2}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Descripción"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Observación"
                                name="observacion"
                                value={formData.observacion}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={2}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<CleanigServicesIcon />}
                        onClick={limpiar}
                    >
                        Limpiar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                    >
                        Eliminar
                    </Button>

                </Box>
            </form>
        </Container>
    );
};

export default Form1;