const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/web-ui-template'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/web-ui-template/index.html'));
});

app.listen(process.env.PORT || 8080);
