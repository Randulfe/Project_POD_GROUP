'use strict';

const axios = require('axios');

const api = 'https://hummingbird-staging.podgroup.com';

async function getAccount() {
  /* eslint-disable prefer-const */
  let payload = {
    'username': 'mateo.randulfe',
    'password': 'efludnar.oetam',
  };
  let data = await axios.post(api+'/auth/token', payload);
  let account = {
    token: data.data.token,
    id: data.data.user._id,
    permissions: data.data.user.permissions,
  };

  return account;
}

async function createUser(username, password, email, status) {
/* eslint-disable prefer-const */
  let myUser = await getAccount();
  let payload = {
    'accountId': myUser.id,
    'username': username,
    'password': password,
    'email': email,
    'status': status,
    'permissions': {
      'accountId': myUser.id,
      'roles': [
        'string',
      ],
    },
  };

  let config = {
    headers: {
      'x-access-token': '*************************',
    },
  };

  axios.post(api+'/users', payload, config).then((data)=>{
    console.log(data);
    return data;
  }).catch((e)=>{
    console.log(e.message);
    return e.message;
  });
}

createUser('mateo', 'cassads', 'mateo@mateo.com', 'active');
