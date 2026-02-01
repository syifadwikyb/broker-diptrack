import Aedes from 'aedes';
import { createServer } from 'net';
import httpServer from 'http';
import ws from 'websocket-stream';

const aedes = new Aedes();

// =================================================
// PINTU 1: TCP (Port 1883) - Untuk Hardware & Backend
// =================================================
const port = 1883;
const server = createServer(aedes.handle);

server.listen(port, function () {
  console.log(`🚀 [TCP] Pintu Hardware siap di port: ${port}`);
});

// =================================================
// PINTU 2: WebSocket (Port 8888) - Untuk HP & Frontend
// =================================================
const wsPort = 8888;
const httpServerInstance = httpServer.createServer();

// Hubungkan WebSocket ke Aedes
ws.createServer({ server: httpServerInstance }, aedes.handle);

httpServerInstance.listen(wsPort, function () {
  console.log(`🌍 [WS]  Pintu Browser/HP siap di port: ${wsPort}`);
});

// =================================================
// LOGGING
// =================================================
aedes.on('client', function (client) {
  console.log(`🔌 Client Terhubung: ${client ? client.id : 'Unknown'}`);
});

aedes.on('clientDisconnect', function (client) {
  console.log(`❌ Client Terputus : ${client ? client.id : 'Unknown'}`);
});

aedes.on('publish', function (packet, client) {
  if (client) {
    console.log(`📨 [${client.id}] Topik: ${packet.topic}`);
  }
});