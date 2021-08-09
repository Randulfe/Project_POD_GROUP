'use strict';

const express = require('express');
const helmet = require('helmet');
const token = require('./authMiddleware');
const PORT = 4300;

const app = express();

app.use(helmet()); // helmet protection

app.use(express.json()); // body parser

app.use(token.getToken);


app.get('/', ( req, res)=>{
  return res.status(200).send({message: 'ended'});
});

app.use((error, req, res, next) => {
  return res.status(400).send({error: error.message});
});


app.listen(PORT, ()=>{
  console.log('Server started on '+PORT);
},
);
