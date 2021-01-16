const express = require('express');
const routes = require('./routes');
const PORT = 3000;
const HOST = '0.0.0.0';

import db from './config/database'

const app = express();

app.use(express.json());
app.use(routes);

app.get('/tesste', (req,res) => {
    res.send(db.database?.a?.c || 'fdsfdsfdsfdsfdsfsd');
});

app.listen(PORT, HOST);

