const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const postApiRoutes = require('./controllers/api-post-controller');
const app = express();
const morgan = require('morgan');
const { error } = require('console');
app.set('view engine', 'ejs');
const port = 4000;
const db = 'mongodb+srv://vpavel03:ThIsAdMiN@cluster0.eijut.mongodb.net/Node-blog?retryWrites=true&w=majority&appName=Cluster0';
mongoose
.connect(db)
.then((res) => console.log('Connected to DB'))
.catch((error) => console.log(error));
const createPath = require('./helpers/create-path');
app.listen (port, (error) => {
    error ? console.log (error): console.log (`listening ${port}`);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({extended: false}));
app.use(express.static('styles'));
app.use(methodOverride('_method'));
app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
});
app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);
app.use((req, res) => {
    const title = 'Error Page';
    res
    .status(404)
    .render(createPath('error'), {title});
});