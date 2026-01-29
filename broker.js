const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;

// Menjalankan server
server.listen(port, function () {
  console.log(`Server siap menerima data di port: ${port}`);
});

// Ketika ada yang connect
aedes.on('client', function (client) {
  console.log(`Client Terhubung: ${client ? client.id : 'Unknown'}`);
});

// Ketika ada yang disconnect
aedes.on('clientDisconnect', function (client) {
  console.log(`Client Terputus : ${client ? client.id : 'Unknown'}`);
});

// Saat ada yang mengirim data
aedes.on('publish', function (packet, client) {
  if (client) {
    console.log(`📨 [${client.id}] Kirim ke Topik: ${packet.topic}`);
    console.log(`   Isi: ${packet.payload.toString()}`);
    console.log('--------------------------------------------------');
  }
});