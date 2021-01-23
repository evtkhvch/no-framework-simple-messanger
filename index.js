const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, () => { console.log(`${PORT} is serving...`)});

module.exports = app;
