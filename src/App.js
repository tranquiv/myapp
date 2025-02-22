import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';
import Form1 from './Views/Form1';

// Simulación de autenticación
const fakeAuth = {
  isAuthenticated: false,
  login(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  logout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

// Barra de navegación
const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/form1">
          Cargar Datos
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

// Componente de ruta protegida
const PrivateRoute = ({ children }) => {
  return fakeAuth.isAuthenticated ? children : <Navigate to="/login" />;
};

// Página de Login
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    fakeAuth.login(() => {
      navigate("/form1");
    });
  };

  return (
    <Container>
      <Box textAlign="center" mt={4}>
        <Typography variant="h4">Iniciar Sesión</Typography>
        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
          Ingresar
        </Button>
      </Box>
    </Container>
  );
};

// Componente principal con enrutamiento
const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Form1 />} />
        <Route path="/form1" element={<PrivateRoute><Form1 /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;