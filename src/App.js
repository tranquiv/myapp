import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, TextField, Box} from '@mui/material';
import Form1 from './Views/Form1';
import DownloadExcelButton from './Components/DownloadExcelButton';
import DataView from './Views/DataView';
import LogoutIcon  from '@mui/icons-material/Logout';

const users = [
  {
    pin: '12345',
    role: 'admin', // Acceso total, acceso exclusivo a notas confidenciales
  },
  {
    pin: '54321',
    role: 'limited', // Secretaria, Solo carga de datos y primer tab
  },
  {
    pin: '67890',
    role: 'no-upload', // Gente que va a hacer las providencias y lo demás
  },
];

// Simulación de autenticación (esto lo ideal sería migratorio a un contexto global o similar)
const fakeAuth = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  userRole: localStorage.getItem("userRole") || null, // Rol del usuario
  login(pin, navigate, setUpdate) { // Acepta `setUpdate` como argumento
    const user = users.find((u) => u.pin === pin);
    if (user) {
    this.isAuthenticated = true;
    this.userRole = user.role;
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("userRole", user.role);
    setUpdate((prev) => !prev);
    navigate('/form1'); // Redirigir después del login
  } else {
    alert('PIN incorrecto');
  }
},
logout(navigate, setUpdate) { // Acepta 'setUpdate' como argumento
  this.isAuthenticated = false;
  this.userRole = null;
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userRole");
  setUpdate((prev) => !prev); // Forzar la actualizacion
  navigate('/login'); // Redirigir al login despues de cerrar sesion
},
};


// Barra de navegación (solo se muestra si está logueado)
const Navigation = ({setUpdate}) => {
  const navigate = useNavigate(); // Obtener navigate

  return ( 
  <AppBar position="static">
    <Toolbar>
      {/* eMostrar "Cargar Datos" solo para admin y limited */}
      <Button color="inherit" component={Link} to="/form1">Cargar Datos</Button>

      {/* Mostrar "Cargados" para todos los usuarios*/}      
      <Button color="inherit" component={Link} to="/datos">Cargados</Button>

      {/* Boton de descarga (solo para admin) */}
      {fakeAuth.userRole === 'admin' && <DownloadExcelButton />}

      {/* Boton de logout */}
      <Box sx={{ marginLeft: 'auto' }} />
      <Button
      color="inherit"
      startIcon={<LogoutIcon/>}
      onClick={() => fakeAuth.logout(navigate, setUpdate)} // Pasar `setUpdate` como argumento
      >
        Salir
      </Button>
    </Toolbar>
  </AppBar>
);
};

// Página de Login
const Login = ({setUpdate}) => {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    fakeAuth.login(pin, navigate, setUpdate); // Pasar `setUpdate` como argumento
  };


  return (
      <div style={{ textAlign: 'center', marginTop: '100px'}}>
        <h2>Iniciar Sesión</h2>
        <TextField
        label="Ingrese su PIN"
        variant="outlined"
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        inputProps={{maxLength: 5 }} // Limitar a 5 digitos
        style={{marginBottom: '20px' }}
        />
        <br />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Ingresar
        </Button>
      </div>
  );
};

// Componente principal con lógica condicional
const App = () => {
  const [selectedRow, setSelectedRow] = useState(null); // Registro seleccionado
  const [update, setUpdate] = useState(false); // Estado para forzar la actualizacion

  return (
    <Router>
      {fakeAuth.isAuthenticated ? (
        // Si está logueado, muestra la barra y las rutas protegidas
        <>
      <Navigation setUpdate={setUpdate} />
      <Routes>
        <Route path="/" element={<Navigate to="/form1" />} />
        {/* Ruta para carga de datos (solo admin y limited) */}
        <Route 
          path="/form1" 
          element={
          <Form1 
            selectedRow={selectedRow}
            onCancel={() => setSelectedRow(null)}
            userRole={fakeAuth.userRole} // Pasar el rol del usuario
          />
        } 
        />
        {/* Ruta para otros tabs (solo admin y no-upload) */}
        <Route path="*" element={<Navigate to="/form1" />} />
        
        </Routes>
        </>
        ) : (
        // Si NO está logueado, solo muestra el login y nada más
        <Routes>
          <Route path="/" element={<Login setUpdate={setUpdate} />} />
          <Route path="/login" element={<Login setUpdate={setUpdate} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;