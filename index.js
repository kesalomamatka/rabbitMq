const fs = require('fs')
let http = require('http');

http.createServer( function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(fs.readFileSync('./output.txt', 'utf8'));
    res.end();
}).listen(8080);
