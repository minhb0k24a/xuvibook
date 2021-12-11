const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>XuVi Books</title><meta charset="utf-8"/></head>');
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/user') {
    res.write('<html>')
    res.write('<head><title>XuVi Books</title><meta charset="utf-8"/></head>')
    res.write('<body><ul><li>Minh</li><li>Vi</li></ul></body>')
    res.write('</html>')
    return res.end()
  } 

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>XuVi Books</title><meta charset="utf-8"/></head>');
  res.write('<body><h1>Xin chào mọi người, đây là thư viện Xuvi books</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = {
  handler: requestHandler,
  someText: 'Some testing text'
};
