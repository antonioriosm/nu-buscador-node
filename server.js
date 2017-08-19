'use strict';

const express = require('express'),
    logger = require('morgan');

const app = express(),
    PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(3000, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

