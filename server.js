const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar datos JSON
app.use(express.json());

// Habilitar CORS para permitir solicitudes desde Netlify
app.use(cors({
    origin: 'https://dulcet-shortbread-05b960.netlify.app/', // Reemplaza con tu dominio en Netlify
    credentials: true // Para enviar cookies si es necesario
}));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para el login (API)
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Validar credenciales (simulación básica)
    if (username === 'German' && password === 'admin') {
        // Crear token de ejemplo (aquí podrías integrar JWT si lo deseas)
        const token = 'token-jwt-aqui';
        
        // Devolver respuesta exitosa con el token
        res.json({ success: true, token, username });
    } else {
        // Devolver error si las credenciales son incorrectas
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
});

// Ruta para el dashboard (sirviendo el archivo HTML)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

// Ruta protegida de datos para el dashboard (API)
app.get('/api/dashboard', (req, res) => {
    // En esta ruta irán los datos del ESP-32 que quieras mostrar
    res.json({ data: 'Aquí irán los datos del ESP-32 en el futuro' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
