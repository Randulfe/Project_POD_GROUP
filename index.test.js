'use strict';

const app = require('./index');

// TEST FUNCTION TO GET ID AND TOKEN OF THE PARENT ACCOUNT
describe('get account token and id', ()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });

  // eslint-disable-next-line max-len
  it('should make one axios post call and return the right id and token', async ()=>{
    const data = await app.getAccount();

    expect(data).toBeInstanceOf(Object);
    expect(data.id).toBe('73c1e86a-5be4-49f3-a902-45b8ca948385');
    // eslint-disable-next-line max-len
    expect(data.token).toBe('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MTBjMThmYzRhZTE4OTAwMmYzODAyMzQifQ.s0AHbTKQfZ3j8GFMF5iCW6kY6zT62HU0-D108ZTJXw4');
  });
});

// TEST TO CREATE USERS
describe('create user', ()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });

  it('should create a couple of users', async ()=>{
    const username1 = 'igor'; const username2 = 'loli';
    const password = 'pswrd';
    const email1 = 'igor@igor.com'; const email2 = 'loli@loli.com';
    const status1 = 'inactive'; const status2 = 'active';

    app.createUser(username1, password, email1, status1).then((data)=>{
      expect(data).toBeInstanceOf(Object);
      expect(data.username).toBe(username1);
      expect(data.status).toBe(status1);
    });
    app.createUser(username2, password, email2, status2).then((data)=>{
      expect(data).toBeInstanceOf(Object);
      expect(data.username).toBe(username2);
      expect(data.status).toBe(status2);
    });
  });
});

// TEST TO LIST ALL ASSETS FROM AN ACCOUNT
describe('list all assets in an account', ()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });

  it('should return a list of assets', async ()=>{
    const list = await app.listAssets();
    expect(list).toBeInstanceOf(Array);
    expect(list.length).toBe(10);
  });
});

// TEST TO ACTIVATE ASSETS
describe('activate a single asset in an account', ()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });

  it('should return the activated asset', async ()=>{
    const asset = await app.listAssets('mateo.randulfe3');
    expect(asset).toBeInstanceOf(Object);
    expect(asset.status).toBe('active');
  });
});

