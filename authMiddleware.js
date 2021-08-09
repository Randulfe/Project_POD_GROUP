'use strict';
const axios = require('axios');
const api = 'https://hummingbird-staging.podgroup.com';


const payload = {
  'username': 'mateo.randulfe',
  'password': 'efludnar.oetam',
};


module.exports.getToken = (req, res, next)=>{
  axios.post(api+'/auth/token', payload).then((data)=>{
    req.token = data.data.token;
    req._id = data.data._id;
    req.permissions = data.data.permissions;
    next();
  }).catch((e)=>{
    next(e);
  });
};

