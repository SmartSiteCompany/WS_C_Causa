const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar variables de entorno desde .env
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar Nodemailer con correo corporativo de Hostinger
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    logger: true, // Habilitar el registro
    debug: true // Habilitar la depuración
});

// Ruta para manejar el envío del formulario
app.post('/contact', (req, res) => {
    const { first_name, email, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'destino@colectivocausa.org', // El correo donde quieres recibir los mensajes
        subject: `Nuevo mensaje de contacto: ${subject}`,
        text: `Nombre: ${first_name}\nEmail: ${email}\nAsunto: ${subject}\nMensaje:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ success: false });
        } else {
            console.log('Email enviado: ' + info.response);
            res.json({ success: true });
        }
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
