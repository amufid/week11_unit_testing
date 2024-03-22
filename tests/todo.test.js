const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize;
const BASE_URL = '/api/todo';

// create todo 
beforeAll(async () => {
   try {
      await queryInterface.bulkInsert('Todos', [
         {
            id: 1001,
            title: 'Study',
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            id: 1002,
            title: 'Playing game',
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            id: 1003,
            title: 'Sport',
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            id: 1004,
            title: 'Work',
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            id: 1005,
            title: 'Sleep',
            createdAt: new Date(),
            updatedAt: new Date()
         },
      ])
   } catch (err) {
      console.log(err);
   }
})

// dijalankan setelah test selesai 
afterAll(async () => {
   try {
      await queryInterface.bulkDelete('Todos', null)
   } catch (err) {
      console.log(err)
   }
})

// unit testing
describe('List all todos', () => {

   it('Get all /api/todo', (done) => {
      // supertest
      request(app)
         .get(`${BASE_URL}`)
         .expect('Content-Type', /json/)
         .expect(200)
         .then(response => {
            const { body } = response
            const data = body

            expect(data.length).toEqual(5)
            done();
         })
         .catch(err => {
            done(err)
         })
   })
})

describe('Detail todo', () => {

   it('Get by id /api/todo/:id', (done) => {
      request(app)
         .get(`${BASE_URL}/1003`)
         .expect('Content-Type', /json/)
         .expect(200)
         .then(response => {
            const { body } = response
            const { data } = body
            const { id, title } = data

            expect(id).toEqual(1003)
            expect(title).toBe('Sport')
            done()
         })
         .catch(err => {
            done(err)
         })
   })

   it('Test id not found', (done) => {
      request(app)
         .get(`${BASE_URL}/1234`)
         .expect('Content-Type', /json/)
         .expect(404)
         .then(response => {
            const { body } = response
            const { name, message } = body

            expect(name).toBe('Error not found')
            expect(message).toBe('Todo not found')
            done()
         })
         .catch(err => {
            done(err)
         })
   })
})

describe('Create todo', () => {
   it('Post /api/todo', (done) => {
      request(app)
         .post(`${BASE_URL}`)
         .send({ title: 'Cleaning room' })
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(200)
         .then(response => {
            const { body } = response
            const { data } = body
            const { id, title } = data

            expect(title).toBe('Cleaning room')
            done()
         })
         .catch(err => {
            done(err)
         })
   })
})

describe('Update todo', () => {
   it('Put /api/todo/:id', (done) => {
      request(app)
         .put(`${BASE_URL}/1001`)
         .send({ title: 'Coding' })
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(200)
         .then(response => {
            const { body } = response
            const { data } = body
            const { id, title } = data

            expect(id).toEqual(1001)
            expect(title).toBe('Coding')
            done()
         })
         .catch(err => {
            done(err)
         })
   })
})

describe('Delete todo', () => {
   it('Delete /api/todo/:id', (done) => {
      request(app)
         .delete(`${BASE_URL}/1005`)
         .expect('Content-Type', /json/)
         .expect(200)
         .then(response => {
            const { body } = response
            const { message } = body

            expect(message).toBe('Todo deleted successfully')
            done()
         })
         .catch(err => {
            done(err)
         })
   })
})