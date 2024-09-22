const express = require('express');
const path = require ('path');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
app.set('view engine', 'ejs');
const port = 4000;
const db = 'mongodb+srv://Pavel:ThIsAdMiN@atlascluster.kei9u77.mongodb.net/localServer?retryWrites=true&w=majority';
mongoose
.connect(db)
.then((res) => console.log('Connected to DB'))
.catch((error) => console.log(error));
let createPath = (page) => path.resolve(__dirname, 'pages', `${page}.ejs`);
app.listen (port, 'localhost', (error) => {
    error ? console.log (error): console.log (`listening ${port}`);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('styles'));
app.get('/', (req, res) => {
    res.render(createPath('index'));
});
app.use((req, res) => {
    res
    .status(404)
    .render(createPath('error'));
});