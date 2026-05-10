const express = require('express');
const game = express();

const api = require('./api/index.js');

game.use(express.static(__dirname));

game.use('/api', api);

game.get('/', (req, res) => {
    res.sendFile(__dirname + '/welcome-page.html');
});

game.listen(3000, () => {
    console.log('Game is running on port 3000');
});