'use strict';

const axios = require('axios');

const api = 'https://hummingbird-staging.podgroup.com';

async function test() {
  const caca = await Promise.resolve('test');
  return caca;
}

async function getAccount() {
  /* eslint-disable prefer-const */
  let payload = {
    'username': 'mateo.randulfe',
    'password': 'efludnar.oetam',
  };
  try {
    let data = await axios.post(api+'/auth/token', payload);
    let account = {
      token: data.data.token,
      id: data.data.user.permissions[0].accountId,
    };
    return account;
  } catch (e) {
    return e.message;
  }
}

async function createUser(username='mateo', password='aaa', email='a@a.com', status='active') {
  let payload = {
    'accountId': myUser.id,
    'username': username,
    'password': password,
    'email': email,
    'status': status,
    'permissions': [
      {
        'accountId': myUser.id,
        'roles': [
          'user',
        ],
      },
    ],
  };

  let config = {
    headers: {
      'x-access-token': myUser.token,
    },
  };

  /* eslint-disable prefer-const */
  let myUser = await getAccount();

  axios.post(api+'/users', payload, config).then((data)=>{
    return data;
  }).catch((e)=>{
    return e.message;
  });
}

async function listAssets() {
/* eslint-disable prefer-const */
  let myUser = await getAccount();
  let config = {
    headers: {
      'x-access-token': myUser.token,
    },
  };

  try {
    let data = await axios.get(api+'/assets?accountId='+myUser.id, config);
    return data;
  } catch (e) {
    return e.message;
  }
}

async function activateAsset(asset='mateo.randulfe1') {
/* eslint-disable prefer-const */
  let myUser = await getAccount();
  let config = {
    headers: {
      'x-access-token': myUser.token,
    },
  };

  let payload = {
    'accountId': myUser.id,
    'subscription': {
      'subscriberAccountId': myUser.id,
      'productId': '610c18fcae701c0030d5be51',
    },
  };

  try {
    let data = await axios.put(api+'/assets/'+asset+'/subscribe', payload, config);
    return data;
  } catch (e) {
    return e.message;
  }
}

async function activatAlleAsset() {
  /* eslint-disable prefer-const */
  let myUser = await getAccount();
  let config = {
    headers: {
      'x-access-token': myUser.token,
    },
  };

  let payload ={
    'data': {
      'subscription': {
        'subscriberAccount': myUser.id,
        'productId': '610c18fcae701c0030d5be51',
      },
    },
  };

  try {
    let data = await axios.post(api+'/bulk/assets/subscribe?accountId='+myUser.id, payload, config);
    return data;
  } catch (e) {
    return e.message;
  }
}

test();

module.exports = {
  test,
  getAccount,
  createUser,
  listAssets,
  activateAsset,
  activatAlleAsset,
};
