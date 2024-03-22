const TodoService = require('../services/todoService.js')

class TodoController {

   static findAll = async (req, res, next) => {
      try {
         const todos = await TodoService.findAll(req.query)

         res.status(200).json(todos)
      } catch (err) {
         next(err)
      }
   }

   static findOne = async (req, res, next) => {
      try {
         const todo = await TodoService.findOne(req.params.id)

         res.status(200).json({ data: todo })
      } catch (err) {
         next(err)
      }
   }

   static create = async (req, res, next) => {
      try {
         const todo = await TodoService.create(req.body);

         res.status(200).json({
            message: 'Todo added successfully',
            data: todo
         })
      } catch (err) {
         next(err)
      }
   }

   static update = async (req, res, next) => {
      try {
         const { id } = req.params
         const body = req.body

         const todo = await TodoService.update(id, body);

         res.status(200).json({
            message: 'Todo updated successfully',
            data: todo
         })
      } catch (err) {
         next(err)
      }
   }

   static destroy = async (req, res, next) => {
      try {
         await TodoService.destroy(req.params.id)

         res.status(200).json({ message: 'Todo deleted successfully' })
      } catch (err) {
         next(err)
      }
   }
}

module.exports = TodoController
