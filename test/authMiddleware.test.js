'use strict';

const request = require('supertest');
const axios = require('axios');
const middleware = require('./../authMiddleware');

describe('TestAuth', ()=>{
  jest.mock('axios');
  it('should make a post request to the right endpoint', async ()=>{
    axios.post.mockResolvedValue(token);

    const token = middleware.getToken();
    expect(token).toEqual(token);
  });
});
