const { Todo } = require('../models')

class TodoService {

   static findAll = async (params) => {
      try {
         const todos = await Todo.findAll(params)

         return todos;
      } catch (err) {
         throw err;
      }
   }

   static findOne = async (id) => {
      try {
         const filterOptions = {
            where: { id }
         }

         const todo = await Todo.findOne(filterOptions)
         
         if (!todo)
         throw { name: 'ErrorNotFound', message: 'Todo not found' }
         
         return todo;
      } catch (err) {
         throw err;
      }
   }

   static create = async (params) => {
      try {
         const todo = await Todo.create(params);

         return todo;
      } catch (err) {
         throw err;
      }
   }

   static update = async (id, body) => {
      try {
         const todo = await Todo.findOne({
            where: { id }
         })

         await todo.update(body);

         return todo;
      } catch (err) {
         throw err;
      }
   }

   static destroy = async (id) => {
      try {
         const filterOptions = {
            where: { id }
         }

         await Todo.destroy(filterOptions)
      } catch (err) {
         throw err;
      }
   }
}

module.exports = TodoService