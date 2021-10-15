const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv').config();
require('module-alias/register');

const app = express();
const PORT = 4242;

app.options('localhost:3000', cors());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

require('./routes')(app);
require('@middleware/error_handler')(app);

app.listen(PORT, '0.0.0.0');
console.log('Meetings & Events API listening on port:', PORT);
