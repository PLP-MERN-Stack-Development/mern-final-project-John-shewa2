const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/userRoutes');
require('./setup'); 

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123' // Valid length (>6)
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });

  it('should not register user with existing email', async () => {
    // 1. Create the first user (Use a valid password!)
    await request(app).post('/api/users/register').send({
      name: 'User 1', 
      email: 'dup@test.com', 
      password: 'password123' 
    });

    // 2. Try to create the same user again
    const res = await request(app).post('/api/users/register').send({
      name: 'User 2', 
      email: 'dup@test.com', 
      password: 'password123' 
    });

    if (res.statusCode !== 400) {
      console.log('Duplicate Email Error Response:', res.body); 
    }
    expect(res.statusCode).toEqual(400);
  });
});