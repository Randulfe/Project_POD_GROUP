'use strict';

// using axios to perform the API requests
const axios = require('axios');

// hostname
const api = 'https://hummingbird-staging.podgroup.com';

// Def function to get account id and token
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

// Function to create users, def values
// eslint-disable-next-line max-len
async function createUser(username='mateo', password='aaa', email='a@a.com', status='active') {
  /* eslint-disable prefer-const */
  let myUser = await getAccount();

  let config = {
    headers: {
      'x-access-token': myUser.token,
    },
  };

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

  axios.post(api+'/users', payload, config).then((data)=>{
    return data;
  }).catch((e)=>{
    return e.message;
  });
}

// Function to list all assets
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
    return data.data;
  } catch (e) {
    return e.message;
  }
}

/* Function to activate a single asset with def value set to the first asset
/ of the account */
async function activateAsset(asset='mateo.randulfe1') {
// eslint-disable prefer-const
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
    // eslint-disable-next-line max-len
    let data = await axios.put(api+'/assets/'+asset+'/subscribe', payload, config);
    return data;
  } catch (e) {
    return e.message;
  }
}

// Bulk method to activate all assets of an account
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
    // eslint-disable-next-line max-len
    let data = await axios.post(api+'/bulk/assets/subscribe?accountId='+myUser.id, payload, config);
    return data;
  } catch (e) {
    return e.message;
  }
}

// export all functions to be used on the testing file
module.exports = {
  getAccount,
  createUser,
  listAssets,
  activateAsset,
  activatAlleAsset,
};
