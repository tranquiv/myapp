import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Grid, // Importa Grid para el diseño responsivo
} from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const Form1 = () => {
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
    recepcion: '',
    ME: '',
    seguimiento: '',
    docsol: '',
    destinatario2: '',
    cargo: '',
    dependencia: '',
    recepcion2: '',
    observacion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validación básica
      if (!formData.numero || !formData.remitente) {
        alert('Por favor, completa los campos obligatorios.');
        return;
      }
  
      // Guardar en Firestore
      await addDoc(collection(db, 'formularios'), formData);
      alert('Datos guardados exitosamente');
  
      // Limpiar el formulario
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
    recepcion: '',
    ME: '',
    seguimiento: '',
    docsol: '',
    destinatario2: '',
    cargo: '',
    dependencia: '',
    recepcion2: '',
    observacion: '',
      });
    } catch (error) {
      console.error('Error al guardar los datos: ', error.message);
      alert('Hubo un error al guardar los datos: ' + error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registro de Mesas de Entradas
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Primera columna */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Número"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fecha"
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
            <TextField
              label="Remitente"
              name="remitente"
              value={formData.remitente}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Resumen"
              name="resumen"
              value={formData.resumen}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Número de Recepción"
              name="nroRecepcion"
              value={formData.nroRecepcion}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
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
            <TextField
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>

          {/* Segunda columna */}
          <Grid item xs={12} md={4}>
          <FormControl fullWidth margin="normal">
              <InputLabel>Estado</InputLabel>
              <Select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <MenuItem value="Pendiente">
                </MenuItem>
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="finalizado">Finalizado</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Destinatarios"
              name="destinatarios"
              value={formData.destinatarios}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Providencia"
              name="providencia"
              value={formData.providencia}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Recepción"
              name="recepcion"
              value={formData.recepcion}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="ME"
              name="ME"
              value={formData.ME}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Documento solicitado</InputLabel>
              <Select
                name="docsol"
                value={formData.docsol}
                onChange={handleChange}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value="Dictamen Conjunto">Dictamen</MenuItem>
                <MenuItem value="Dictamen Conjunto">Dictamen Conjunto</MenuItem>
                <MenuItem value="Resolucion">Resolución</MenuItem>
                <MenuItem value="Convenio">Convenio</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Tercera columna */}
          <Grid item xs={12} md={4}>
           
            <TextField
              label="Destinatario 2"
              name="destinatario2"
              value={formData.destinatario2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Dependencia"
              name="dependencia"
              value={formData.dependencia}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Recepción 2"
              name="recepcion2"
              value={formData.recepcion2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Observación"
              name="observacion"
              value={formData.observacion}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        {/* Botón de guardar */}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Guardar
        </Button>
      </form>
    </Container>
  );
};

export default Form1;