const net = require('net');
const client = net.createConnection({ port: 4000 }, () => {
  console.log("Connected. Type messages to broadcast to students:");
  process.stdin.on('data', data => { client.write(data.toString().trim()); });
});

client.on('data', data => console.log("Server:", data.toString()));
