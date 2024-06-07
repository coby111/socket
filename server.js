const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Inicializacion del servidor Express y el servidor HTTP
 * Creacion de la instancia de Socket.IO
 */
app.prepare().then(() => {
    const server = express();
    const httpServer = createServer(server);
    const io = new Server(httpServer);
    //Evento de noexión de Socket
    io.on('connection', (socket) => {
        console.log('New client connected');
        //Manejador de evento
        socket.on('buttonClicked', () => {
            console.log('Button was clicked');
            //Emite el evento a todos los lcientes conectados
            io.emit('buttonClickNotification', 'The button was clicked!');
        });
        //maneja la desconexion 
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    //Maneja todas las solicitudes HTTP utilizando Next.js
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
