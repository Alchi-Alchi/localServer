const http = require ('http');
const port = 3000;
const server = http.createServer ((req, res) => {
    res.write ('Hello User');
    res.end ();
});
server.listen (port, 'localhost', (error) => {
    error ? console.log (error): console.log (`listening ${port}`);
});