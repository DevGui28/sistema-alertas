const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = 3000;
// const IP_DO_SERVIDOR = '192.168.1.104'; // Defina seu IP aqui

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Criar servidor HTTP
const server = app.listen(PORT, () => {
    // console.log(`Servidor rodando em http://${IP_DO_SERVIDOR}:${PORT}`);
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Criar servidor WebSocket
const wss = new WebSocket.Server({ server });

// Armazenar clientes conectados
const clients = new Set();

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado');
    clients.add(ws);

    ws.on('close', () => {
        console.log('Cliente desconectado');
        clients.delete(ws);
    });

    ws.on('error', (error) => {
        console.error('Erro no WebSocket:', error);
        clients.delete(ws);
    });
});

// Endpoint para enviar alertas
app.post('/api/alert', (req, res) => {
    const { type, title, message, priority } = req.body;

    if (!type || !title || !message) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }

    const alert = {
        id: Date.now(),
        type, // 'fire', 'attack', 'emergency', 'evacuation'
        title,
        message,
        priority: priority || 'high', // 'high', 'critical'
        timestamp: new Date().toISOString()
    };

    // Broadcast para todos os clientes conectados
    let successCount = 0;
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(alert));
            successCount++;
        }
    });

    console.log(`Alerta enviado para ${successCount} clientes:`, alert);

    res.json({
        success: true,
        clientsNotified: successCount,
        alert
    });
});

// Endpoint para verificar status
app.get('/api/status', (req, res) => {
    res.json({
        server: 'online',
        connectedClients: clients.size,
        uptime: process.uptime()
    });
});

console.log('Sistema de Alertas iniciado!');
console.log(`Painel Admin: http://localhost:${PORT}/admin.html`);
console.log(`Cliente: http://localhost:${PORT}/client.html`);