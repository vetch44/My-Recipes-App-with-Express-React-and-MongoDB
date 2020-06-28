const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL , { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api', require('./api'));


app.use((err, req, res, next)=>{
    console.log(err);
    res.status(422).send({error: err.message});
});

app.listen(process.env.port || 3000, ()=>{
    console.log('listening for requests');
});