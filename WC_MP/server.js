const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const net = require('net');
const querystring = require('querystring');

const PORT = 3000;
let adminMessages = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;

  // ===== Web Module =====
  if (pathName === '/') {
    fs.createReadStream('./public/login.html').pipe(res);
  } 
  else if (pathName.startsWith('/exam')) {
    fs.createReadStream('./public/exam.html').pipe(res);
  } 
  else if (pathName === '/questions') {
    fs.createReadStream('./questions.json').pipe(res);
  } 
  // ===== Streams + PDF =====
  else if (pathName === '/download-pdf') {
    const filePath = path.join(__dirname, 'questions.pdf'); 
    res.writeHead(200, { 'Content-Type': 'application/pdf' });
    fs.createReadStream(filePath).pipe(res);
  }
  // ===== Buffers + FS for student answers =====
  else if (pathName === '/submit' && req.method === 'POST') {
    const studentId = parsedUrl.query.studentId || 'unknown';
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const answers = querystring.parse(body);
      const answerFile = `answers/${studentId}_answers.json`;

      if (!fs.existsSync('answers')) fs.mkdirSync('answers');
      fs.writeFile(answerFile, JSON.stringify(answers, null, 2), err => {
        if (err) { res.writeHead(500); res.end('Save Error'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>Answers saved for ${studentId}!</h1>`);
      });
    });
  }
  // ===== Networking (SSE for admin messages) =====
  else if (pathName === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    adminMessages.forEach(msg => res.write(`data: ${msg}\n\n`));

    const interval = setInterval(() => {
      while (adminMessages.length > 0) res.write(`data: ${adminMessages.shift()}\n\n`);
    }, 2000);

    req.on('close', () => clearInterval(interval));
  }
  // ===== Static files fallback =====
  else {
    const filePath = path.join(__dirname, 'public', req.url);
    if (fs.existsSync(filePath)) fs.createReadStream(filePath).pipe(res);
    else { res.writeHead(404); res.end("Not Found"); }
  }
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// ===== Networking: TCP Admin Server =====
const tcpServer = net.createServer(socket => {
  socket.on('data', data => {
    const msg = data.toString().trim();
    console.log("Admin says:", msg);
    adminMessages.push(msg); // broadcast via SSE
  });
});

tcpServer.listen(4000, () => console.log("Admin TCP server running on port 4000"));
