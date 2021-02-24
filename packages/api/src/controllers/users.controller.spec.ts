import supertest from 'supertest';
import { app } from '../app';
import client from '../database/client.redis';

const request = supertest(app);

// Close Redis client to prevent Jest's "Open Handles" leaks warning
afterEach(() => {
  client.quit(error => {
    if (error) console.log(error);
  });
});

describe('POST /users/register', () => {
  it('registers a new users', async () => {
    const response = await request.post('/v1/users/register').send({
      gender: 'M',
      firstName: 'Ed',
      lastName: 'Jambier',
      email: 'ejambier@mail.com',
      password: '2000Francs!',
      address: '45 rue Poliveau',
      city: 'Paris',
      country: 'France',
      zipCode: '75005',
      dateOfBirth: '1956-10-26',
      avatarUrl:
        'https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true&bold=true&format=png&name=SB',
    });

    // console.log(response);
  });
});

// import api from '../index';

// describe('POST /login', () => {
//   it('responds with 401', () a
//       .send({
//         email: 'dlunch@mail.com',
//         password: 'abcd',
//       })
//       .expect(401);
//   });
// });

// const app = express()
// import * as typeorm from 'typeorm'
// import { login } from './auth.controller'

// typeorm.getRepository = jest.fn()

// supertest.

// import request from 'supertest';

// describe('GET /auth/login', () => {
//   it('should return 200', async done => {
//     request(server)
//       .get(`/api/v1/hello`)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.body).toMatchObject({'message': 'Hello, stranger!'})
//         done()
//       })
//   })
