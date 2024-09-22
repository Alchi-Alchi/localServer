const http = require ('http');
const fs = require ('fs');
const path = require ('path');
const port = 4000;
const server = http.createServer ((req, res) => {
    res.setHeader ('Content-Type', 'text/html');
    let createPath = (page) => path.resolve(__dirname, 'pages', `${page}.ejs`);
    let basePath = '';
    switch (req.url) {
        case '/':
            basePath = createPath('index');
            break;
            case '/contacts':
            basePath = createPath('contacts');
            break;
        default:
            basePath = createPath('error');
            break;
    }
    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log (err);
            res.end();
        }
        else {
            res.write (data);
            res.end();
        }
    })
});
server.listen (port, 'localhost', (error) => {
    error ? console.log (error): console.log (`listening ${port}`);
});