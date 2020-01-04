const express = require('express');
const path = require('path')
const gameRoutes = require('./routes/game')

const app = express();

app.listen(3000, () => {
	console.log('serwer is listing at http://localhost:3000/')
});

// ustalam katalog do frontu

app.use(express.static(
	path.join(__dirname, 'public')
))

gameRoutes(app)
