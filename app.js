const express = require('express');
let app = express();
const db = require('./db');

const UserController = require('./users/UserController');
app.use('/users', UserController);

module.exports = app;

const AuthController = require('./auth/AuthController');
app.use('/auth', AuthController);


const PostController = require('./posts/Postcontroll');
app.use('/addPost', PostController);



module.exports = app;

const imageController = require('./image/ImageUpload');
app.use('/Image', imageController);



module.exports = app;