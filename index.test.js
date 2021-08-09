'use strict';

const axios = require('axios');
const app = require('./index');

// eslint-disable-next-line max-len

describe('test', ()=>{
  test('should return test', async ()=>{
    const val = await app.test();
    expect(val).toBe('test');
  });
});


describe('getAccountTest', ()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });
  // eslint-disable-next-line max-len
  it('should make one axios post call and return the right id and token', async ()=>{
    const data = await app.getAccount();
    expect(data.id).toBe('73c1e86a-5be4-49f3-a902-45b8ca948385');
    // eslint-disable-next-line max-len
    expect(data.token).toEqual('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MTBjMThmYzRhZTE4OTAwMmYzODAyMzQifQ.s0AHbTKQfZ3j8GFMF5iCW6kY6zT62HU0-D108ZTJXw4');
  });
});

describe('createUser', ()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });
  it('should create a couple of users', async ()=>{
    const username1 = 'igor'; const username2 = 'loli';
    const password = 'pswrd';
    const email1 = 'igor@igor.com'; const email2 = 'loli@loli.com';
    const status1 = 'inactive'; const status2 = 'active';
    app.createUser(username1, password, email1, status1).then((data)=>{
      expect(data.username).toBe(username1);
      expect(data.status).toBe(status1);
    });
    app.createUser(username2, password, email2, status2).then((data)=>{
      expect(data.username).toBe(username2);
      expect(data.status).toBe(status2);
    });
  });
});

