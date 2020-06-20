const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.use(function (err, req, res, next) {
    res.status(500).send('Oops, something broke!');
});

app.listen(port, () => console.log(`Meli API listening at http://localhost:${port}`));