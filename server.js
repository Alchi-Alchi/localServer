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
app.listen (port, (error) => {
    error ? console.log (error): console.log (`listening ${port}`);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({extended: false}));
app.use(express.static('styles'));
app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
});
app.get('/contacts', (req, res) => {
    const title = 'Contacts';
    const contacts = [
        {name: 'GitHub', link: 'https://github.com/Alchi-Alchi'}
    ];
    res.render(createPath('contacts'), {contacts, title});
});
app.get('/posts', (req, res) => {
    const title = 'Posts';
    const posts = [
        {
            id: '1',
            text: 'Lorem',
            title: 'Title',
            date: '25.09.2024',
            author: 'Paul',
        },
    ];
    res.render(createPath('posts'), {title, posts});
});
app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1',
        text: 'Lorem',
        title: 'Title',
        date: '25.09.2024',
        author: 'Paul',
    };
    res.render(createPath('post'), {title, post});
});
app.post('/add-post', (req, res) => {
    const {title, author, text} = req.body;
    const post = {
        id: new Date(),
        date: (new Date()).toLocaleDateString(),
        title,
        author,
        text,
    };
    res.render(createPath('post'), {post, title});
});
app.get('/add-post/', (req, res) => {
    const title = 'Add';
    res.render(createPath('add-post'), {title});
});
app.use((req, res) => {
    const title = 'Error Page';
    res
    .status(404)
    .render(createPath('error'), {title});
});