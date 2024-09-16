const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar datos JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));


// Ruta para el login (API)
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Validar credenciales (simulación básica)
    if (username === 'German' && password === 'admin') {
        res.json({ success: true, token: 'token-jwt-aqui' });
    } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
});

// Ruta para el dashboard (API)
/*app.get('/api/dashboard', (req, res) => {
    res.json({ data: 'Aquí irán los datos del ESP-32 en el futuro' });
}); */

// Ruta para el dashboard (debería ser una solicitud GET)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
