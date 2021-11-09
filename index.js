const fs = require('fs')
let http = require('http');
//listen on 8080, read file which saved message log
http.createServer( function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(fs.readFileSync('./sharedVolume/output.txt', 'utf8'));
    res.end();
}).listen(8080);
