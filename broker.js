import Aedes from 'aedes';
import { createServer } from 'net';
import httpServer from 'http';
import ws from 'websocket-stream';

const aedes = new Aedes();
const port = 1883;

const server = createServer(aedes.handle);
server.listen(port, '0.0.0.0', function () {
  console.log(`[TCP] Pintu Hardware siap di port: ${port}`);
});

const wsPort = 8888;
const httpServerInstance = httpServer.createServer();

ws.createServer({ server: httpServerInstance }, aedes.handle);

httpServerInstance.listen(wsPort, '0.0.0.0', function () {
  console.log(`[WS] Pintu Browser: ${wsPort}`);
});

aedes.on('client', function (client) {
  console.log(`Client Terhubung: ${client ? client.id : 'Unknown'}`);
});